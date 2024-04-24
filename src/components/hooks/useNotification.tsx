import { useSnackbar } from "notistack";

type NotificationProps = {
  msg: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
};

export function useNotification() {
  const { enqueueSnackbar } = useSnackbar();
  function notify({ msg, ...props }: NotificationProps) {
    const { variant = "error", ...restProps } = props;
    enqueueSnackbar(msg, { variant, ...restProps });
  }

  return { notify };
}
