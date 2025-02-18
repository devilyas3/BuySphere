"use client";

import { useEffect } from "react";
import NavLinks from "./NavLinks";

interface MobileMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

export default function MobileMenu({ isOpen, toggleMenu } : MobileMenuProps) {
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") toggleMenu();
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    return (
        <div className="md:hidden flex items-center">
            {/* Menu Toggle Button */}
            <button onClick={toggleMenu} aria-label="Toggle Menu">
                <i className="material-icons textforeground">{isOpen ? "close" : "menu"}</i>
            </button>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-background shadow-lg p-4 text-foreground flex flex-col items-center text-center space-y-3">
                    <NavLinks className="flex flex-col items-center space-y-4" />
                </div>
            )}
        </div>
    );
}