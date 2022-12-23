import { toast, ToastOptions } from "react-toastify";

export const useToast = (
  defaultOptions: ToastOptions<{}> = { theme: "dark" }
) => {
  const success = (data: string) => {
    toast(data, { ...defaultOptions, type: "success" });
  };
  const warning = (data: string) => {
    toast(data, { ...defaultOptions, type: "warning" });
  };
  const info = (data: string) => {
    toast(data, { ...defaultOptions, type: "info" });
  };
  const error = (data: string) => {
    toast(data, { ...defaultOptions, type: "error" });
  };
  return { success, info, warning, error };
};
