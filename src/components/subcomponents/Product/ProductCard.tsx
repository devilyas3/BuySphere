import Image from "next/image";
import Link from "next/link";

const ProductCard = ({product}: {product: any}) => {

    return (
        <div className="bg-white shadow-md rounded-lg p-4 transition-transform hover:scale-105 hover:shadow-lg">
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative w-full h-48 overflow-hidden flex justify-center items-start">
                        <Image src={product.image} alt={product.title} width={300}
                        height={200}  className="rounded-t-lg object-contain" priority={true}
                        />
                </div>
                <div className="mt-4">
                    <h2 className="text-black text-lg font-semibold truncate">{product.title}</h2>
                    <div className="flex justify-between items-center text-sm mt-1">
                        <p className="text-gray-500 text-sm truncate">{product.category}</p>
                        <p className="text-blue-600 font-bold mt-2">${product.price}</p>
                    </div>
                </div>
            </Link>
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;