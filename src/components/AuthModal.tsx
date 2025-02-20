import React, { useEffect, useState } from "react";
import { useAuth } from "./subcomponents/Auth/AuthContext";

interface AuthModelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModelProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: ""
    });
    const { login } = useAuth();

    useEffect(() => {
        if (!isOpen) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }

        document.addEventListener("keydown", handleKeyDown);
        
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function formValidation() {
        if (!formData.email || !formData.password) {
            alert("Please fill all the required fields");
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert("Please Enter valid Email ID!");
            return false;
        }
        return true;
    }

    async function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        if (!formValidation() || loading) return;

        setLoading(true);

        const endpoint = isLogin
            ? `${window.location.origin}/api/auth/login`
            : `${window.location.origin}/api/auth/signup`;

        try {
            const filteredData = isLogin
                ? { email: formData.email, password: formData.password }
                : { email: formData.email, password: formData.password, fullName: formData.fullName || "" };

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filteredData)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Something went wrong, Please try again later!");

            console.log("Success:", data);
            login(formData.email, formData.password);
            onClose();
        } catch(error) {
            console.error("Error:", error instanceof Error ? error.message : error);
            alert(error instanceof Error ? error.message : "Something went wrong, Please try again later!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="auth-model-title"
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-red-600 rounded-full hover:text-black"
                >
                    <i className="material-icons">close</i>
                </button>

                <h2 id="auth-model-title" className="text-xl font-semibold text-center mb-4">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {!isLogin &&(
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="border p-2 rounded text-black"
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 rounded text-black"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border p-2 rounded text-black"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <p className="text-center mt-2">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        type="submit"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 underline"
                    >
                        {loading ? "Processing..." : isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}