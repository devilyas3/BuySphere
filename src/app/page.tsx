import HomePage from "@/components/HomePage";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    // <div className="min-h-screen flex items-center justify-center">
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HomePage />
      {/* <h1 className="text-4xl font-bold">BuySphere is Live! 🚀</h1> */}
    </div>
  );
}
