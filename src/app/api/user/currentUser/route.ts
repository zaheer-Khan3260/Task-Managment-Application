import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";



export async function GET(req: NextRequest){
    await dbConnect(); 
    const  userCookie  = req?.cookies.get('user')?.value
    const user = userCookie ? JSON.parse(userCookie!) : null;
    if(!user){
       return NextResponse.json(
        {
            success: false,
            message: "Unauthorised request"
        },
        {
            status: 401
        }
       )
    }
    
    const userData = await User.findById(user.id)
    .select("-password -refreshToken -varifyCode")
    if(!userData){
        return NextResponse.json(
            {
                success: false,
                message: "User not found"
            },
            {
                status: 404
            }
        )
    }

    return NextResponse.json({
        success: true,
        message: "User data fetched successfully",
        data: userData
    },
    {
        status: 201
    }
);
}

