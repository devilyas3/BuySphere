import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products data");

        const products = await res.json();

        if (id) {
            const product = products.find((p: {id: number}) => p.id === Number(id));
            if (!product) {
                return NextResponse.json({message: "Product not found"}, {status: 404});
            }
            return NextResponse.json(product);
        }

        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({message: "Error fetching products"}, {status: 500});
    };
}