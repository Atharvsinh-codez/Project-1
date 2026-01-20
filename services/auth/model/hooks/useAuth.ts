import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // or 'next/router' if using Pages dir
import { loginFn, registerFn, logoutFn } from "../api/mutations";
import { LoginInput, RegisterInput } from "../types";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // --- LOGIN MUTATION ---
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginInput) => loginFn(credentials),
    onSuccess: (data) => {
      // 1. Update the User Query Cache immediately (Optimistic UI)
      queryClient.setQueryData(["current-user"], data);

      // 2. Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Login Error:", error.message);
      // Optional: Add toast notification logic here
    },
  });

  // --- REGISTER MUTATION ---
  const registerMutation = useMutation({
    mutationFn: (data: RegisterInput) => registerFn(data),
    onSuccess: () => {
      // Depending on flow: Auto-login OR Redirect to Login
      router.push("/login");
    },
  });

  // --- LOGOUT MUTATION ---
  const logoutMutation = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      // 1. Clear the User Cache
      queryClient.setQueryData(["current-user"], null);

      // 2. Invalidate to ensure fresh fetch if they log back in
      queryClient.invalidateQueries({ queryKey: ["current-user"] });

      // 3. Redirect to home/login
      router.push("/login");
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};
