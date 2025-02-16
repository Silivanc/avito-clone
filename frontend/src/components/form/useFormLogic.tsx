import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, RegisterOptions, FieldValues } from "react-hook-form";
import { RootState } from "../../store/store";
import {
  setGeneralInfo,
  setNedvizhimostInfo,
  setTransportInfo,
  setUslugiInfo,
  resetFormAction,
  initialState,
} from "../../store/slices/form.slice";
import {
  AdTypes,
  INedvizhimost,
  ITransport,
  IUslugi,
} from "../../types/ad.types";
import { useCreateAdMutation } from "../../api/adsApi";
import { notification } from "antd";
type FormType = Partial<
  Omit<INedvizhimost, "type"> &
    Omit<ITransport, "type"> &
    Omit<IUslugi, "type"> & { type: AdTypes }
>;

const numberRules: RegisterOptions = {
  pattern: {
    value: /^[0-9]+$/,
    message: "Введите только положительные целые числа",
  },
};

export const useFormLogic = () => {
  const dispatch = useDispatch();
  const [createAd, {isLoading, isError, isSuccess}] = useCreateAdMutation();
  const { general, nedvizhimost, transport, uslugi } = useSelector(
    (state: RootState) => state.form
  );

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (success: "success" | "error", message: string, description = "") => {
    api[success]({
      message,
      description,
      closeIcon: true,
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      ...general, ...transport, ...nedvizhimost, ...uslugi
      // ...Object.fromEntries(
      //   Object.entries({ ...general, ...transport, ...nedvizhimost, ...uslugi, type: "" }).map(
      //     ([key, value]) => [key, value ?? ""]
      //   )
      // ),
    },
  });

  const values: Partial<FormType> = watch();
  const type = watch("type", "Недвижимость");
  const throttlingRef = useRef<NodeJS.Timeout | null>(null);

  const previousValues = useRef<Partial<FormType>>({});

  useEffect(() => {
    if (values && !throttlingRef.current) {
      throttlingRef.current = setTimeout(() => {
        let flag = false;
        // Object.keys(values).forEach((key) => {
        //   const typedKey = key as keyof FormType;
        //   if (values[typedKey] !== previousValues.current[typedKey]) {
        //     if (key in general) 
        //       dispatch(setGeneralInfo({ [typedKey]: values[typedKey] }));
        //     if (key in nedvizhimost) 
        //       dispatch(setNedvizhimostInfo({ [typedKey]: values[typedKey] }));             
        //     if (key in transport)
        //       dispatch(setTransportInfo({ [typedKey]: values[typedKey] }));
        //     if (key in uslugi)
        //       dispatch(setUslugiInfo({ [typedKey]: values[typedKey] }));
        //     flag = true;
        //   }
        // });
        Object.keys(values).forEach((key) => {
          const typedKey = key as keyof FormType;
          if (values[typedKey] !== previousValues.current[typedKey]) {
            if (Object.keys(initialState.general).includes(key)) {
              dispatch(setGeneralInfo({ [typedKey]: values[typedKey] }));
            } else if (Object.keys(initialState.nedvizhimost).includes(key)) {
              dispatch(setNedvizhimostInfo({ [typedKey]: values[typedKey] }));
            } else if (Object.keys(initialState.transport).includes(key)) {
              dispatch(setTransportInfo({ [typedKey]: values[typedKey] }));
            } else if (Object.keys(initialState.uslugi).includes(key)) {
              dispatch(setUslugiInfo({ [typedKey]: values[typedKey] })); // Исправлено на setUslugiInfo
            }
            flag = true;
          }
        });
        if (flag) previousValues.current = { ...values };
        throttlingRef.current = null;
      }, 500);
    }
  }, [values, general, nedvizhimost, transport, uslugi, dispatch]);

  const onSubmit = handleSubmit(async () => {
    let body = null;
    if (type === AdTypes.Nedvizhimost) {
      body = {...general, ...nedvizhimost};
    } else if (type === AdTypes.Transport) {
      body = {...general, ...transport}
    } else if (type === AdTypes.Uslugi) {
      body = {...general, ...uslugi}
    } 
    console.log(body);
    if (body) {
      try {
        const response = await createAd(body).unwrap();
        if (response) {
          openNotification("success", "Объявление успешно создано");
        }
      } catch (error) {
        console.error("Ошибка при создании объявления:", error);
        openNotification("error", "Произошла ошибка при создании объявления", "Статус ошибки " + error?.status);
      }
    }
  });

  const resetForm = () => {
    dispatch(resetFormAction());
    reset({
      ...initialState.general,
      ...initialState.nedvizhimost,
      ...initialState.transport,
      ...initialState.uslugi,
      type: ""
    });
  }

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    type,
    numberRules,
    onSubmit,
    resetForm,
    contextHolder,
  };
};
