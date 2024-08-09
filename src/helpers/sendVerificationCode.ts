import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(
    email: string,
    fullName: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification mail',
            react: VerificationEmail({fullName, otp: verifyCode}),
          });

        return {
            success: true,
            message: "Suceessfully send Verification email."
        }
    } catch (emailError) {
        console.log("Error Facing While sending Verifivation Code", emailError)
        return {
            success: false,
            message: "Failed to send Verification email."
        }
    }


}