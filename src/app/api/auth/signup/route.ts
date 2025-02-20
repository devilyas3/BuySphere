import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";

export async function POST(req: Request) {
    try {
        console.log("Using Firebase Project ID:", auth.app.options.projectId);
        console.log("SignUp API hit");
        
        const { email, password, fullName } = await req.json();
        console.log("Received Data:", { email, password, fullName });

        if (!email || !password || !fullName) {
            console.log("Validation failed - Missing fields");
            return NextResponse.json({ message: "Please fill out all the required fields" }, { status: 400 });
        };

        const registeredUser = await fetchSignInMethodsForEmail(auth, email);
        if (registeredUser.length > 0) {
            return NextResponse.json({ message: "Email is already registered, please Log In!" }, {status: 400});
        }

        // storing New User Data in firebase
        const newUserData = await createUserWithEmailAndPassword(auth, email, password);

        console.log("Signup successful!");
        return NextResponse.json({ message: "Signup successful", user: newUserData.user }, { status: 200 });
    } catch (error: any) {
        console.error("SignUp Error:", error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

