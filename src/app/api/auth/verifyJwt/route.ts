import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Extend the NextRequest type to include a `user` property
declare module 'next/server' {
    interface NextRequest {
        user?: any;
    }
}

export async function GET(req: NextRequest) {
    const token = req.headers.get('Authorization')?.replace("Bearer ", "")
    if (!token) {
        return NextResponse.json(
            {
                success: false,
                message: "Unauthorized access"
            },
            { status: 401 }
        );
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!);
        
        return NextResponse.json(
            {
                success: true,
                message: "Access granted",
                user: decodedToken
            },
            { status: 200 }
        )

    } catch (err) {
        return NextResponse.json(
            {
                success: false,
                message: "Invalid token"
            },
            { status: 401 }
        );
    }
}
