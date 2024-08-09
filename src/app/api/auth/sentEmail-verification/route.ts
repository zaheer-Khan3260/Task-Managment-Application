import { sendVerificationEmail } from "@/helpers/sendVerificationCode";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";


export async function POST(request: Request) {
    await dbConnect()
    try {
        const {email} = await request.json();

        const currentUser = await UserModel.findOne({email})
        if(!currentUser) {
            return Response.json(
                {
                    success: false,
                    message: "Email Adrress Not Found",
                }, {
                    status: 404,
                }
            )
        }

        const emailResponse = await sendVerificationEmail(
            email,
            currentUser.fullName,
            currentUser.varifyCode
        )
            console.log("line 28 in (SentEmail-verification) emailVerification response: ",
                 emailResponse);
        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                }, {
                    status: 500,
                }
            )
        }
        return Response.json(
            {
                success: true,
                message: "Verification Email Sent Successfully",
            }, {
                status: 200,
            }
        )
    } catch (error) {
        console.log("An error occurred while Verify Email", error);
        return Response.json(
            {
                success: true,
                message: "An error occurred while Verify Email",
            }, {
                status: 500,
            }
        )
    }
}