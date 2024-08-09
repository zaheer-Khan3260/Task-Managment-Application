import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import  bcrypt  from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";


export async function POST(request: Request){
    await dbConnect()
    
    const { email, password } = await request.json()

    const currentUser = await User.findOne({email})
    if(!currentUser){
        return Response.json(
            {
                success: false,
                message: "User does not exist"
            },
            {
                status: 404
            }
        )
    }

    const passwordValidation = await bcrypt.compare(password, currentUser.password)
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(currentUser._id)
    if(refreshToken){
        currentUser.refreshToken = refreshToken
    }
    await currentUser.save({ validateBeforeSave: false })

    const loggedInUser = await User.findById(currentUser._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: true,
        path: '/',
    }

    const response = NextResponse.json({
        success: true,
        message: "User logged in successfully",
        user: loggedInUser,
    })
    response.cookies.set('aT', accessToken, options)
    response.cookies.set('rT', refreshToken, options)

    return Response.json({
        success: true,
        message: "User logged in successfully",
        user: response
    }, {
        status: 201
    })

}

const generateAccessAndRefereshTokens = async(userId: any) =>{
    try {
        const user = await User.findById(userId)
        const generateAccessToken = function () {
            return jwt.sign(
                {
                    id: user?._id,
                    fullName: user?.fullName,
                    email: user?.email,
                }, 
                process.env.JWT_ACCESS_TOKEN_SECRET!,
                {
                    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
                }
            )
        }
        const generateRefreshToken = function () {
            return jwt.sign(
                {
                    id: user?._id,
                }, 
                process.env.JWT_REFRESH_TOKEN_SECRET!,
                {
                    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
                }
            )
        }
        const refreshToken = generateRefreshToken()
        const accessToken = generateAccessToken()
        return {accessToken, refreshToken}
    } catch (error) {
        console.log("An Error OCcure while generating Access and refresh token",error)
        throw new Error('Error generating tokens')
    }
}