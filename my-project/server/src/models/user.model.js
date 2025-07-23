import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please provide a valid email address'
    ],
        },
        pending_email: {
            type: String,
            lowercase: true,
            trim: true,
            default: null,
        },
        pending_emailExpires: { type: Date, default: null },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
            select: false, // Do not return password by default
        },
        avatar:
        {
            type: String,
            default: ""
        },
        mobile: {
            type: String,
            trim: true,
            default: '',
        },
        verify_email:
        {
            type: Boolean,
            default: false
        },
        last_login_date:
        {
            type: Date,
            default: ""
        },
        status: {
            type: String,
            enum: ["Active", "Inactive", "Suspended"],
            default: "Active"
        },
        address_details: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'address'
            }
        ],
        shopping_cart: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'cartProduct'
            }
        ],
        orderHistory: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'order'
            }
        ],
        otp: {
            type: String,
            default: null,
        },
        otpExpires: {
            type: Date,
            default: null,
        },
        lastOtpSent: { type: Date, default: null },
        role:
        {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        }
    },
    {
        timestamps: true

    })

const UserModel = mongoose.model("User", userSchema);
export default UserModel;