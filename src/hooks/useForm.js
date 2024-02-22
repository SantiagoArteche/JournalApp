import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export const useForm = (initialValues, yupValues) => {
  const [formData, setFormData] = useState({});
  const { handleChange, handleSubmit, values, resetForm, errors } = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    onSubmit: (data) => {
      setFormData(data);
      resetForm();
    },
    validationSchema: Yup.object(yupValues),
  });

  return {
    ...formData,
    formData,
    handleChange,
    handleSubmit,
    values,
    resetForm,
    errors,
  };
};
