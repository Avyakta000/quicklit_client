"use client";

import { clearPreferences } from "@/redux/features/preferenceSlice";
import { clearRecommendations } from "@/redux/features/recommendationsSlice";
import { clearAuth, logoutUser } from "@/redux/features/userAuth";

export const handleLogout = (dispatch, router) => {
        dispatch(logoutUser())
        dispatch(clearAuth());
        dispatch(clearPreferences());
        dispatch(clearRecommendations());
        localStorage.removeItem("q_exp");
        router.push("/")
};
    