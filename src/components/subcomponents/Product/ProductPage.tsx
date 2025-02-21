import { Product } from "@/types/product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
    const {id} = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products?id=${id}`);
                if (!res.ok) throw new Error("Failed to fetch products data");
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            };
        };

        if (id) fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>
    };

    if (!product) {
        return <div className="text-center py-10 text-red-500">Product not found!</div>
    };

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
            <img
                src={product.image} alt={product.title}
                className="w-1 h-96 object-cover rounded-lg shadow md"
            />
            <div className="ml-6">
                <h2 className="text-2xl font-bold">{product.title}</h2>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <p className="text-xl text-blue-500 font-bold mt-2">${product.price}</p>
                <p className="mt-4 text-gray-700">{product.description}</p>

                <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Buy Now
                </button>
            </div>
        </div>
    );
};