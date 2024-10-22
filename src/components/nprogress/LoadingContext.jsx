// src/context/LoadingContext.js
"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, startTransition, useOptimistic } from "react";
import NProgress from "nprogress"; // Make sure this is installed
import "nprogress/nprogress.css";

const LoadingContext = createContext({ loading: false });

export const LoadingProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useOptimistic(false);

  useEffect(() => {
    if (router.push.name === "patched") return;
    const push = router.push;

    router.push = function patched(...args) {
      startTransition(() => {
        setLoading(true);
      });
      push.apply(history, args);
    };
  }, [router]);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

  return (
    <LoadingContext.Provider value={{ loading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};
