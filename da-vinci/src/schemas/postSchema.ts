import * as Yup from "yup";

export const postValidationSchme = Yup.object({
  title: Yup.string()
    .required("Başlık girilmesi zorunludur")
    .min(3, "Başlık alanı minimum 3 karakter olmalıdır."),
});
