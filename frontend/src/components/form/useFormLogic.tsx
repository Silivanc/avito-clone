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
import { useCreateAdMutation, useUpdateAdMutation } from "../../api/adsApi";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
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

export const useFormLogic = (id?: number) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createAd] = useCreateAdMutation();
  const [updateAd] = useUpdateAdMutation();
  const { general, nedvizhimost, transport, uslugi } = useSelector(
    (state: RootState) => state.form,
  );

  const [api, contextHolder] = notification.useNotification();

  //Параметры для уведомления
  const openNotification = (
    success: "success" | "error",
    message: string,
    description = "",
  ) => {
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
      ...general,
      ...transport,
      ...nedvizhimost,
      ...uslugi,
    },
  });

  const values: Partial<FormType> = watch();
  const type = watch("type");
  const throttlingRef = useRef<NodeJS.Timeout | null>(null);

  const previousValues = useRef<Partial<FormType>>({});

  //Используется store для хранения значений между перезагрузками страницы
  useEffect(() => {
    if (values && !throttlingRef.current) {
      throttlingRef.current = setTimeout(() => {
        let flag = false;
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

  const resetForm = () => {
    dispatch(resetFormAction());
    reset({
      ...initialState.general,
      ...initialState.nedvizhimost,
      ...initialState.transport,
      ...initialState.uslugi,
      type: "",
    });
  };

  //отправка данных на сервер
  const onSubmit = handleSubmit(async () => {
    let body = null;
    if (type === AdTypes.Nedvizhimost) {
      body = { ...general, ...nedvizhimost };
    } else if (type === AdTypes.Transport) {
      body = { ...general, ...transport };
    } else if (type === AdTypes.Uslugi) {
      body = { ...general, ...uslugi };
    }

    // if (body) {
    //   try {
    //     const response = await createAd(body).unwrap();
    //     if (response) {
    //       openNotification("success", "Объявление успешно создано");
    //       resetForm();
    //     }
    //   } catch (error) {
    //     console.error("Ошибка при создании объявления:", error);
    //     openNotification("error", "Произошла ошибка при создании объявления", "Статус ошибки " + error?.status);
    //   }
    // }
    try {
      if (body) {
        if (id && id >= 0) {
          await updateAd({ id, body }).unwrap();
          openNotification("success", "Объявление успешно обновлено");
          resetForm();
          navigate("/form");
        } else {
          await createAd(body).unwrap();
          openNotification("success", "Объявление успешно создано");
          resetForm();
        }
      }
    } catch (error) {
      console.error("Ошибка при создании/обновлении объявления:", error);
      openNotification(
        "error",
        "Произошла ошибка при создании/обновлении объявления",
        "Статус ошибки " + error?.status,
      );
    }
  });

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
