import { FormInput } from "../components/form/ui/FormInput";
import { FormTextarea } from "../components/form/ui/FormTextarea";
import { FormSelect } from "../components/form/ui/FormSelect";
import { useFormLogic } from "../components/form/useFormLogic";
import { AdTypes } from "../types/ad.types";
import {
  generalFields,
  nedvizhimostFields,
  transportFields,
  UslugiFields,
} from "../components/form/formFields";
import { Button } from "../ui/Button";

export const FormPage = () => {
  const { register, setValue, errors, type, onSubmit, resetForm, notification } =
    useFormLogic(); 

  return (
    <div className="container x-auto px-36 py-14">
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

        <Button text="Нажми на меня" fn={()=>{}} type="submit" styles="bg-black text-white"/>
        <Button text="Сбросить" fn={resetForm} styles="bg-[#f1f1f1]"/>
        {notification}
      </form>
    </div>
  );
};
