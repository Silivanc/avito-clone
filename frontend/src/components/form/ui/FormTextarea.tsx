import styles from "../form.module.scss";
import { FormInputType } from "../form.type";

export function FormTextarea({
  register,
  errors,
  required = true,
  labelName,
  identificator,
  spanText = "",
  spanError = "",
}: FormInputType) {
  return (
    <>
      <label className={styles.label} htmlFor={identificator}>
        {labelName}
      </label>
      <textarea
        className={errors[identificator] && styles.errorInput}
        {...register(identificator, { required })}
        id={identificator}
      />
      {errors[identificator] ? (
        <span className={styles.error}>{spanError}</span>
      ) : (
        <span>{spanText}</span>
      )}
    </>
  );
}