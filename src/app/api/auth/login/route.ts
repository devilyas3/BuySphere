import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
// import { fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";


export async function POST(req: Request) {
    try {
        console.log("Login API hit");
        const { email, password } = await req.json();
        console.log("Received Data:", { email, password });

        if (!email || !password) {
            console.error("❌ Missing email or password");
            return NextResponse.json({ message: "Please enter email and password" }, { status: 400 });
        }

        // Logging In
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("✅ Login successful:", userCredential.user.email);

            return NextResponse.json({
                message: "✅ Login successful",
                user: {
                    email: userCredential.user.email,
                    uid: userCredential.user.uid
                }
            }, { status: 200});
        } catch (error: any) {
            console.error("Login Error:", error.message);

            if (error.code === "auth/user-not-found") {
                return NextResponse.json({ message: "Email is not registered, please Sign Up to Login!"}, { status: 400 });
            } else if (error.code === "auth/wrong-password") {
                return NextResponse.json({ message: "Incorrect password, please try again!"}, { status: 401 });
            }

            return NextResponse.json({ message: "Authentication failed"}, { status: 500 });
        }

    } catch (error: any) {
        console.error("Server Error:", error.message);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}