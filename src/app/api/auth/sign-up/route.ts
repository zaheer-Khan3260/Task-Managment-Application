import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs"

export async function POST(request: Request){
    await dbConnect()

    try {
        const {fullName, email, password,
             useFor, sector} = await request.json();

        const existingUser = await UserModel.findOne({ email })
        if(existingUser){
            return Response.json(
                {
                    success: false,
                    message: "Email already exists"
                },
                {
                    status: 400
                }
            )
        }else{
            const hashPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                fullName,
                email,
                password: hashPassword,
                useFor,
                sector,
                varifyCode: Math.floor(100000 + Math.random() * 900000).toString(),
                isVerified: false,
                varifyCodeExpiry: expiryDate
            })

            await newUser.save()

            return Response.json(
                {
                    success: true,
                    message: "User Created Successfully",
                    userData: newUser
                }, 
                {
                    status: 201
                }
            )
        }

    } catch (error: any) {
        console.log("An error Occured While Creating the User: ", error);

        return Response.json(
            {
                success: false,
                message: "An error Occured While Creating the User"
            },
            {
                status: 500
            }
        )
    }
}