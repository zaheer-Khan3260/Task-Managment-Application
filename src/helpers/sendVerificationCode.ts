import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export interface VerificationEmailSchema{
    fullName: string;
    email: string;
    varifyCode: string;
}

export async function sendVerificationEmail({
    email,
    fullName,
    varifyCode
}: VerificationEmailSchema
): Promise<ApiResponse>{
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification mail',
            react: VerificationEmail({fullName, otp: varifyCode}),
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