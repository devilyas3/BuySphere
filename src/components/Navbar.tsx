"use client";

import { useState } from "react";
import MobileMenu from "./subcomponents/Navbar/MobileMenu";
import NavLinks from "./subcomponents/Navbar/NavLinks";
import { useAuth } from "./subcomponents/Auth/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-background shadow-md z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between text-foreground">
        {/* Logo | BrandName */}
        <div className="text-xl font-bold">BuySphere</div>

        {/* Desktop Navigation */}
        <NavLinks className="hidden md:flex space-x-6" />
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </header>
  );
}