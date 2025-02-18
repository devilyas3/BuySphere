import AuthModal from "@/components/AuthModal";
import Link from "next/link";
import { useState } from "react";

const authLinks = [
    { action: "Login", route: "/login"},
    { action: "Sign Up", route: "/signup"}
];

export default function Authlinks({ className }: { className?: string }) {
    const [isModelOpen, setIsModelOpen] = useState(false);

    return (
        <>
            <div className={className}>
                <button className="hover:text-gray-400">
                    Login / Signup
                </button>
            </div>

            <AuthModal isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} />
        </>
    );
}