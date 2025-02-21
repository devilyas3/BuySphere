"use client"

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import ProductList from "./subcomponents/Product/ProductList";

export default function HomePage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/products');
                if (!res.ok) throw new Error("Failed to fetch products");
                const data: Product[] = await res.json();
                setProducts(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {

                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {/* <p>Hero Section Component</p> */}
            <div className="flex gap-4">
                {/* <p>Filter Component</p> */}
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <ProductList products={products}/>
                )}
            </div>
        </div>
    );
}
