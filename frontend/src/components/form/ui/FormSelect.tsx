import clsx from "clsx";
import styles from "../form.module.scss";
import { FormSelectType } from "../form.type";

export function FormSelect({
  register,
  errors,
  required = true,
  optionalRules,
  labelName,
  identificator,
  spanText = "",
  spanError = "",
  selectValues,
  component = "select",
}: FormSelectType) {
  return (
    <>
      <label className={styles.label} htmlFor={identificator}>
        {labelName}
      </label>

      {component === "select" ? (
        <select
          className={clsx(styles.select, errors[identificator] && styles.errorInput)}
          {...register(identificator, {
            required: required,
            ...optionalRules,
          })}
          id={identificator}
        >
          {Object.entries(selectValues).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      ) : (
        <>
          <input
            list={`${identificator}-datalist`}
            className={clsx(errors[identificator] && styles.errorInput, styles.input)}
            {...register(identificator, {
              required: required,
              ...optionalRules,
            })}
            id={identificator}
          />
          <datalist id={`${identificator}-datalist`}>
            {Object.entries(selectValues).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </datalist>
        </>
      )}

      {errors[identificator] ? (
        <span className={styles.error}>{spanError}</span>
      ) : (
        <span>{spanText}</span>
      )}
    </>
  );
}

