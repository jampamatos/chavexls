import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VAR_KEY = "chavexls_variant";

export default function RootRedirect(): React.ReactElement | null {
    const navigate = useNavigate()
    useEffect(() => {
        // tenta ler variante já atribuida
        let variant: string | null = null;
        try { variant = localStorage.getItem(VAR_KEY) } catch {}
        if (!variant) {
            variant = Math.random() < 0.5 ? "A" : "B";
            try { localStorage.setItem(VAR_KEY, variant) } catch {} 
        }
        navigate(variant === "A" ? "/a" : "/b", { replace: true })
    }, [navigate]);

    return null;
}