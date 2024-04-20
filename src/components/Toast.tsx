import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Toast({ mensaje }: any) {
  function ErrorMensaje() {
    useEffect(() => {
      const notify = () =>
        toast.error(mensaje.msg, {
          duration: 4000,
          position: "top-center",
          id: "clipboard",
        });
      notify();
    }, [mensaje.estado]);
  }

  function ExitoMensaje() {
    useEffect(() => {
      const notify = () =>
        toast.success(mensaje.msg, {
          duration: 4000,
          position: "top-center",
          id: "clipboard",
        });
      notify();
    }, [mensaje.estado]);
  }
  return (
    <div
      className={`${
        mensaje.error ? ErrorMensaje() : ExitoMensaje()
      } font-bold text-[17px]`}
    >
      <Toaster />
    </div>
  );
}
