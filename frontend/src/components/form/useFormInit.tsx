// hooks/useAdFormInitialization.ts
import { useEffect } from "react";
import { useGetAdQuery } from "../../api/adsApi";
import { FieldValues, UseFormSetValue } from "react-hook-form";

export const useFormInit = (
  id: number | null,  
  setValue: UseFormSetValue<FieldValues>
) => {

  const { data: ad } = useGetAdQuery(
    { id: id ? Number(id) : -1 },
    { skip: !id }
  );

  useEffect(() => {
    if (ad) {
      Object.entries(ad).forEach(([key, value]) => {
        setValue(key, value ?? "");
      });
    }
  }, [ad, setValue]);

  return {
    isEdit: !!id, 
  };
};