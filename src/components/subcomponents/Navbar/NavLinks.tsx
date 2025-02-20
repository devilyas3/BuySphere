import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Authlinks from "../Auth/AuthLinks";

const links = [
  { name: "Home", href: "/" },
  {
    name: "Categories",
    href: "/categories",
    categories: [
        { name: "Electronics", href: "/shop/electronics" },
        { name: "Clothing", href: "/shop/clothing" },
        { name: "Accessories", href: "/shop/accessories" }
    ]
  },
  { name: "Contact", href: "/contact" },
];

export default function NavLinks({ className }: { className?: string }) {

    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const pathName = usePathname();
    const categoriesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutSide(e: MouseEvent) {
            if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
                setIsCategoriesOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutSide);
        return () => document.removeEventListener("mousedown", handleClickOutSide);
    }, []);

    function handleCategories() {
        setIsCategoriesOpen(!isCategoriesOpen)
    }

    return (
        <div className={className}>
            {links.map((link) => (
                <div key={link.href} className="relative group" ref={categoriesRef}>
                    {/* Main Navigation Link */}
                    <Link
                        href={link.href}
                        className={`hover:text-gray-400 transition-colors flex items-center gap-1 ${
                            pathName === link.href ? "text-blue-400 font-semibold" : ""
                        }`}
                        onClick={(e) => {
                            if (link.categories) {
                                e.preventDefault();
                                handleCategories();
                            }
                        }}
                    >
                        {link.name}
                        {link.categories && (
                            <i className={`material-icons text-sm transition-transform duration-200 ease-in-out ${isCategoriesOpen ? "rotate-360" : ""}`}>
                                {isCategoriesOpen ? "expand_less" : "expand_more"}
                            </i>
                        )}
                    </Link>

                    {/* Dropdown Menu (If Available) */}
                    {link.categories && isCategoriesOpen && (
                        <div className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-md">
                            {link.categories.map((category) => (
                                <Link
                                    key={category.href}
                                    href={category.href}
                                    className="block px-4 py-2 text-black hover:bg-gray-100"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            <Authlinks className="hidden md:flex items-center space-x-4" />
        </div>
    );
}