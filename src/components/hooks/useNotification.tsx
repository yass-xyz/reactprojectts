import { useSnackbar } from "notistack";

type NotificationProps = {
  msg: string;
  type?: "error" | "default" | "success" | "warning" | "info" | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
};

export function useNotification() {
  const { enqueueSnackbar } = useSnackbar();
  function notify({ msg, type = "error", ...props }: NotificationProps) {
    enqueueSnackbar(msg, { variant: type, ...props });
  }

  return { notify };
}
