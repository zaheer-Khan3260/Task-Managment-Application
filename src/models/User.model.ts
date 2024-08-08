import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document{
    fullName: string;
    email: string;
    password: string;
    useFor: string; 
    sector: string;
    refreshToken: string;
    isVerified: boolean;
    varifyCode: Number;
    varifyCodeExpiry: Date;
}

const userSchema: Schema<User> = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: [true, "Email is required"], 
        unique: true,
        match: [/.+\@.+\..+/, "Enter a valid email address"]
    },
    password: {
        type: String, 
        required: [true, "Password is required"],
    },
    useFor: {
        type: String, 
        required: true
    },
    sector: {
        type: String, 
        required: true
    },
    refreshToken: {
        type: String, 
        default: null
    },
    isVerified: {
        type: Boolean, 
        default: false
    },
    varifyCode: {
        type: Number, 
        default: null
    },
    varifyCodeExpiry: {
        type: Date, 
        default: null
    }
}, {timestamps: true})

 const UserModel = (mongoose.models.User as mongoose.Model<User>)
 || mongoose.model<User>("User", userSchema)

 export default UserModel;