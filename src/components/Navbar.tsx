"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-background shadow-md z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between text-foreground">
        {/* Logo | BrandName */}
        <div className="text-xl font-bold">BuySphere</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-400 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            Shop
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <i className="material-icons text-foreground">menu</i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background shadow-lg p-4 text-foreground">
          <a href="#" className="block py-2 hover:text-gray-400">
            Home
          </a>
          <a href="#" className="block py-2 hover:text-gray-400">
            Shop
          </a>
          <a href="#" className="block py-2 hover:text-gray-400">
            Contact
          </a>
        </div>
      )}
    </header>
  );
}