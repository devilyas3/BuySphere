import { useState } from "react";
import { useAuth } from "./AuthContext";
import AuthModal from "@/components/AuthModal";

export default function AuthLinks({ className }: { className?: string }) {
    const [ isModalOpen, setIsModalOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();

    function handleAuthClick() {
        setIsModalOpen(true);
    };

    function setOnClose() {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={className}>
                {isAuthenticated ? (
                    <button onClick={logout} className="hover:text-gray-400">Logout</button>
                ) : (
                    <button onClick={handleAuthClick} className="hover:text-gray-400">Login</button>
                )}
            </div>

            {isModalOpen && <AuthModal isOpen={isModalOpen} onClose={setOnClose} />}
        </>
    );
}