import emailjs from "@emailjs/browser";
const ENV = import.meta.env;

export const Email = (
  formData: Record<string, string>,
  templateId?: string,
  serviceId?: string
) => {
  if (!formData) {
    throw new Error("Email.tsx: Form data required");
  }

  emailjs
    .send(
      serviceId || ENV.VITE_EMAILJS_SERVICE_ID,
      templateId || ENV.VITE_EMAILJS_TEMPLATE_ID,
      formData,
      ENV.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(
      () => {
        console.log("Email has been received!");
      },
      (error) => {
        console.log("Failed sending email...", error);
      }
    );
};
