import { axios } from "../axios";
import { useMutation } from "@tanstack/react-query";
import {
  //ExtractFnReturnType,
  MutationConfig,
  queryClient,
} from "../react-query";
import { useNotification } from "@/components/hooks";
import {
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  UserResponse,
} from "./types";

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  console.log("email", data);
  return axios.get(`/token/${data.email}`);
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
  return axios.post("/users", data);
};

type UseRegisterUserOptions = {
  config?: MutationConfig<typeof registerWithEmailAndPassword>;
};

export const useRegisterUser = ({ config }: UseRegisterUserOptions = {}) => {
  const { notify } = useNotification();

  return useMutation({
    onError: () => {
      notify({ msg: "Error while registring ...", type: "error" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      notify({ msg: "Success !", type: "success" });
    },
    ...config,
    mutationFn: registerWithEmailAndPassword,
  });
};

type UseLoginUserOptions = {
  email?: string;
  config?: MutationConfig<typeof loginWithEmailAndPassword>;
};

export const useLoginUser = ({ config }: UseLoginUserOptions = {}) => {
  const { notify } = useNotification();

  return useMutation({
    onError: () => {
      notify({ msg: "Error while logging in ...", type: "error" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      notify({ msg: "Welcome !", type: "success" });
    },
    ...config,
    mutationFn: loginWithEmailAndPassword,
  });
};
