import { useEffect, useState } from "react";

interface AuthModelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModelProps) {
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }
        
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
            aria-hidden="true"
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-96"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-labelledby="auth-model-title"
            >
                <h2 id="auth-model-title" className="text-xl font-semibold text-center mb-4">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>

                <form className="flex flex-col gap-4">
                    {!isLogin &&(
                        <input type="text" placeholder="Full Name" className="border p-2 rounded" />
                    )}
                    <input type="email" placeholder="Email" className="border p-2 rounded" />
                    <input type="password" placeholder="Password" className="border p-2 rounded" />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <p className="text-center mt-2">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{""}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-bl500 underline"
                    >
                        {isLogin ? "Sign Up" : "LOgin"}
                    </button>
                </p>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500"
                >
                    <i className="material-icons">close</i>
                </button>
            </div>
        </div>
    );
}