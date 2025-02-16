import clsx from "clsx";
import styles from "../form.module.scss";
import { FormInputType } from "../form.type";

export function FormInput({
  register,
  errors,
  required = true,
  optionalRules = {},
  labelName,
  identificator,
  spanText = "",
  spanError = "",
  onNumber = false,
  setValue,
}: FormInputType) {
  return (
    <>
      <label className={styles.label} htmlFor={identificator}>
        {labelName}
      </label>
      <input
        className={clsx(
          styles.input,
          errors[identificator] && styles.errorInput,
        )}
        {...register(identificator, { required, ...optionalRules })}
        id={identificator}
        onChange={(e) => {
          let value = e.target.value;

          if (onNumber) {
            if (onNumber === "integer") {
              value = value.replace(/[^0-9]/g, "");
            } else {
              value = value.replace(".", ",");
              value = value.replace(/[^0-9,]/g, "");
              if (value.startsWith(",")) {
                value = "";
              }

              const parts = value.split(",");
              if (parts.length > 2) {
                value =
                  parts[0] + "," + parts.slice(1).join("").replace(/,/g, "");
              }

              if (parts.length > 1 && parts[1].length > 2) {
                value = parts[0] + "," + parts[1].slice(0, 2);
              }
            }
          }
          if (setValue)
            setValue(identificator, value, { shouldValidate: true });
        }}
        onBlur={(e) => {
          if (onNumber && setValue) {
            let value = e.target.value.trim();

            if (/^0+$/.test(value)) {
              value = "0";
            } else {
              value = value.replace(/^0+(?=[1-9])/, "");

              if (/^0,[0]*$/.test(value)) {
                value = "0";
              } else if (/^0+,/.test(value)) {
                value = value.replace(/^0+/, "0");
              }
            }

            setValue(identificator, value, { shouldValidate: true });
          }
        }}
      />
      {errors[identificator] ? (
        <span className={styles.error}>
          {errors[identificator].message?.toString() || spanError}
        </span>
      ) : (
        <span>{spanText}</span>
      )}
    </>
  );
}
