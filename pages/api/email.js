import logger from "./logger";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import http from "./httpService";

export async function sendEmail(data) {
  // Cypress Testing Coverage //
  /* istanbul ignore file */
  const template_params = {
    from_name: data.name,
    reply_to: data.email,
    topic: data.topic.value,
    date: data.dayPicker.toDateString(),
    message: data.enquiry,
  };
  return emailjs
    .send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      template_params,
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID
    )
    .then((response) => {
      if (response && response.status === 200) {
        return response;
      }
    })
    .catch((error) => {
      if (error && error.status >= 400 && error.status < 500) {
        toast.error("An unexpected error has occurred", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        logger.log(error);
      }
    });
}
