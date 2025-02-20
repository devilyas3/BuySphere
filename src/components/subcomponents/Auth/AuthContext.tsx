"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthContextType {
    isAuthenticated: boolean;
    user: string | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Load user from the Local Storage on app Load
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setToken(parsedUser.token);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post("/api/auth/login", { email, password });
            if (response.data.token) {
                const userData = {email, token: response.data.token};
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(email);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Login failed:", error)
        }
    };

    const logout = async () => {
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside the AuthProvider");
    }
    return context;
};