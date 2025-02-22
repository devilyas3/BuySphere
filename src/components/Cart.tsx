import { CartStore } from "@/store/cartStore";

export default function Cart() {
    const {cart, removeFromCart} = CartStore();

    return (
        <div className="p-4 border-rounded-lg bg-gray-100">
            <h2 className="text-xl font-bold mb-4"> Cart</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500">Cart is Empty!</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.id} className="flex justify-between items-center border-b py-2">
                            <span>{item.title}</span>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}