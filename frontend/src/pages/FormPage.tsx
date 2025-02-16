import { Button } from "../ui/Button";
import styles from "../components/form/form.module.scss";
import {
  useFormLogic,
  AdTypes,
  generalFields,
  nedvizhimostFields,
  transportFields,
  UslugiFields,
  useFormInit,
} from "../components/form/index";
import { FC } from "react";
import clsx from "clsx";
import { FormFieldsMapper } from "../components/form/FormMapper";
import { useLocation, useNavigate } from "react-router-dom";

export const FormPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state; 

  const {
    register,
    setValue,
    errors,
    type,
    onSubmit,
    resetForm,
    contextHolder,
  } = useFormLogic(id);

  const { isEdit } = useFormInit(id, setValue);

  return (
    <div className={clsx("container x-auto px-36 py-5", styles.formPage)}>
      <h1 className="text-4xl font-bold mb-7">{isEdit ? "Редактирование" : "Создание"} объявления</h1>
      <form onSubmit={onSubmit} className="max-w-2xl flex flex-col">
        <FormFieldsMapper
          fields={generalFields}
          register={register}
          errors={errors}
          setValue={setValue}
          selectedType={type}
        />

        {type === AdTypes.Nedvizhimost && (
          <FormFieldsMapper
            fields={nedvizhimostFields}
            register={register}
            errors={errors}
            setValue={setValue}
            selectedType={type}
          />
        )}

        {type === AdTypes.Transport && (
          <FormFieldsMapper
            fields={transportFields}
            register={register}
            errors={errors}
            setValue={setValue}
            selectedType={type}
          />
        )}

        {type === AdTypes.Uslugi && (
          <FormFieldsMapper
            fields={UslugiFields}
            register={register}
            errors={errors}
            setValue={setValue}
            selectedType={type}
          />
        )}

        {contextHolder}
        <div>
          <Button
            text={isEdit ? "Сохранить изменения" : "Опубликовать"}
            fn={() => {}}
            type="submit"
            styles="w-52 h-14 bg-black text-white mr-4"
          />
          <Button
            text={isEdit ? "Отмена" : "Сбросить"}
            fn={isEdit ? () => {resetForm(); navigate(-1)} : resetForm}
            styles="w-52 h-14 bg-[#f1f1f1]"
          />
        </div>
      </form>
    </div>
  );
};