import { Button } from "../ui/Button";
import styles from"../components/form/form.module.scss"
import {FormInput, FormTextarea, FormSelect, useFormLogic, AdTypes, generalFields, nedvizhimostFields, transportFields, UslugiFields} from "../components/form/index"
import { FC } from "react";
import clsx from "clsx";

export const FormPage = () => {
  const { register, setValue, errors, type, onSubmit, resetForm, contextHolder } =
    useFormLogic(); 

  return (
    <div className={clsx("container x-auto px-36 py-28", styles.formPage)}>
      <form
        onSubmit={onSubmit}
        className="max-w-2xl flex flex-col"
      >
        {generalFields.map((field) => {
          if (field.component === "textarea") {
            return (
              <FormTextarea
                key={field.identificator}
                register={register}
                errors={errors}
                setValue={setValue}
                {...field}
              />
            );
          }
          if (
            (field.component === "select" ||
              field.component === "select-input") &&
            field.selectValues
          ) {
            return (
              <FormSelect
                key={field.identificator}
                register={register}
                errors={errors}
                setValue={setValue}
                selectValues={field.selectValues}
                selectedValue={type}
                {...field}
              />
            );
          }
          return (
            <FormInput
              key={field.identificator}
              register={register}
              errors={errors}
              setValue={setValue}
              {...field}
            />
          );
        })}

        {type === AdTypes.Nedvizhimost &&
          nedvizhimostFields.map((field) => {
            if (
              (field.component === "select" ||
                field.component === "select-input") &&
              field.selectValues
            ) {
              return (
                <FormSelect
                  key={field.identificator}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  selectValues={field.selectValues}
                  selectedValue={type}
                  {...field}
                />
              );
            }
            return (
              <FormInput
                key={field.identificator}
                register={register}
                errors={errors}
                setValue={setValue}
                {...field}
              />
            );
          })}

        {type === AdTypes.Transport &&
          transportFields.map((field) => {
            if (
              (field.component === "select" ||
                field.component === "select-input") &&
              field.selectValues
            ) {
              return (
                <FormSelect
                  key={field.identificator}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  selectValues={field.selectValues}
                  selectedValue={type}
                  {...field}
                />
              );
            }
            return (
              <FormInput
                key={field.identificator}
                register={register}
                errors={errors}
                setValue={setValue}
                {...field}
              />
            );
          })}

        {type === AdTypes.Uslugi &&
          UslugiFields.map((field) => {
            if (
              (field.component === "select" ||
                field.component === "select-input") &&
              field.selectValues
            ) {
              return (
                <FormSelect
                  key={field.identificator}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  selectValues={field.selectValues}
                  selectedValue={type}
                  {...field}
                />
              );
            }
            return (
              <FormInput
                key={field.identificator}
                register={register}
                errors={errors}
                setValue={setValue}
                {...field}
              />
            );
          })}
        {contextHolder}
        <div>
        <Button text="Опубликовать" fn={()=>{}} type="submit" styles="w-52 h-14 bg-black text-white mr-4"/>
        <Button text="Сбросить" fn={resetForm} styles="w-52 h-14 bg-[#f1f1f1]"/>
        </div>
      </form>
    </div>
  );
};
