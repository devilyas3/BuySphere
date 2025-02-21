import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface ProductListProps {
    products: Product[];
}

export default function ProductList({products}: ProductListProps) {
    if(products.length === 0) {
        return <div className="text-center py-10">No product found!</div>
    }

    return (
        <div className="container mx-auto px4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}