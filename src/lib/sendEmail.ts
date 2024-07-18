import emailjs from "emailjs-com";
import { toast } from "sonner";

export const sendEmail = async (templateParams: any) => {
  try {
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_ID!,
      process.env.NEXT_PUBLIC_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_KEY
    );
    toast.success("Message sent successfully!");
    console.log("SUCCESS!", response.status, response.text);
    return response;
  } catch (error) {
    console.error("FAILED...", error);
    toast.error("Something went wrong, try again later!");
    throw error;
  }
};
