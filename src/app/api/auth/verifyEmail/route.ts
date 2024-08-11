import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User, { UserSchema } from "@/models/User.model";


export async function POST(req: NextRequest){
    await dbConnect();
    const { email, code } = await req.json();
    const currentTime = new Date();
    const userData = await User.findOne({email})
    console.log("userData in verifyemail", userData)
    if(!userData){
        return NextResponse.json(
            {   
                success: false,
                message: "Email not found"
            }, {
                status: 404
            }
        )
    }

   if(userData.varifyCodeExpiry > currentTime){
        return NextResponse.json(
            {   
                success: false,
                message: "Verification code expired"
            }, {
                status: 401
            }
        )
    }else if(userData.varifyCode === code){
        const updatedUser = await User.findByIdAndUpdate(userData._id, {
            varifyCode: null,
            isVerified: true,
            varifyCodeExpiry: null
        },
    {new: true}  ).select("-password -refreshToken")
        console.log("Updated user", updatedUser)
        return NextResponse.json(
            {   
                success: true,
                message: "Email verifid",
                user: updatedUser
            }, {
                status: 201
            }
        )
    }else{
        return NextResponse.json(
            {   
                success: false,
                message: "Invalid verification code"
            }, {
                status: 400
            }
        )
    }

}