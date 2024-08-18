import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";

export async function POST(req: NextRequest) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the request body
        const { email, code } = await req.json();
        const currentTime = Date.now();

        // Find the user by email
        const userData = await User.findOne({ email });

        // If user is not found
        if (!userData) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email not found",
                },
                { status: 404 }
            );
        }

        // Check if the verification code has expired
        if (userData.varifyCodeExpiry.getTime() < currentTime) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Verification code expired",
                },
                { status: 401 }
            );
        }

        // Check if the verification code matches
        if (userData.varifyCode === code) {
            // Update the user as verified and clear the verification code and expiry
            const updatedUser = await User.findByIdAndUpdate(
                userData._id,
                {
                    varifyCode: null,
                    isVerified: true,
                    varifyCodeExpiry: null,
                },
                { new: true }
            );

            // Return success response
            return NextResponse.json(
                {
                    success: true,
                    message: "Email verified",
                    user: updatedUser,
                },
                { status: 200 }
            );
        } else {
            // Return response for invalid code
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid verification code",
                },
                { status: 400 }
            );
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("Error in email verification:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}
