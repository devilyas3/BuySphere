import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";

interface ProductListProps {
    products: Product[];
}

const PRODUCTS_PER_PAGE = 8;

export default function ProductList({products}: ProductListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    const paginatedProducts = products.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    // useEffect(() => {
    //     const timeout = setTimeout(() => setLoading(false), 1500);
    //     return () => clearTimeout(timeout);
    // }, []);

    return (
        <div className="container mx-auto px4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                {paginatedProducts.length === 0
                    ? Array.from({length: PRODUCTS_PER_PAGE}).map((_, index) => (
                    <div key={index} className="w-full max-w sm">
                        <SkeletonCard />
                    </div>
                    ))
                    : paginatedProducts.map((product) => (
                        <div key={product.id} className="w-full max-w sm">
                            <ProductCard product={product} />
                        </div>
                    ))
                }
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
                    >Previous</button>
                    <span className="mx-4 text-lg font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
                    >Next</button>
                </div>
            )}
        </div>
    );
}