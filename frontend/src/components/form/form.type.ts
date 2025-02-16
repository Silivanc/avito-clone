import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export type formFieldType = {
  required?: boolean;
  optionalRules?: RegisterOptions;
  onNumber?: false | "integer" | "double";
  labelName: string;
  identificator: string;
  spanText?: string;
  spanError?: string;
  component?: "input" | "textarea" | "select" | "select-input";
  selectValues?: Record<string, string>;
};

export type FormInputType = formFieldType & {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
};

export type FormSelectType = FormInputType & {
  selectValues: {
    [key: string]: string;
  };
  selectedValue?: string;
};
