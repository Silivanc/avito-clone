import { FC } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue, FieldValues } from "react-hook-form";
import { FormInput, FormTextarea, FormSelect } from "./index";
import { formFieldType } from "./form.type";

interface FormFieldsMapperProps {
  fields: formFieldType[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  selectedType?: string;
}

export const FormFieldsMapper: FC<FormFieldsMapperProps> = ({
  fields,
  register,
  errors,
  setValue,
  selectedType,
}) => {
  return (
    <>
      {fields.map((field) => {
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
          (field.component === "select" || field.component === "select-input") &&
          field.selectValues
        ) {
          return (
            <FormSelect
              key={field.identificator}
              register={register}
              errors={errors}
              setValue={setValue}
              selectValues={field.selectValues}
              selectedValue={selectedType}
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
    </>
  );
};
