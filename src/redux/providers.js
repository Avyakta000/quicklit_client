'use client';
import { Provider } from "react-redux";
import store from "./store";

import { injectStore } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";


export function Providers({ children }) {

  const router = useRouter()
  injectStore(store, router)

  return <Provider store={store}>{children}</Provider>;
}