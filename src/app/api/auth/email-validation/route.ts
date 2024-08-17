import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";

export async function GET(req: NextRequest){
    await dbConnect();
    const email = req.url.split("=")[1]

    if(!email){
        return NextResponse.json(
            {
                success: false,
                message: "Email is required"
            },
            {
                status: 404
            }
        )
    }

    const isValidEmail = await User.findOne({email})
    if(!isValidEmail){
        return NextResponse.json(
            {
                success: true,
                message: "Email not registered"
            },
            {
                status: 201
            }
        )
    }

   return NextResponse.json({
        success: true,
        message: "Email registered"
    },
    {
        status: 200
    }
)

}
