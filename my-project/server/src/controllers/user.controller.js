import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendEmailFun from '../config/sendEmail.js';
import VerificationEmail from '../utils/verifyEmailTemplate.js';
import { config } from '../config/index.js';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';
import { error, log } from 'console';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
import { data } from 'react-router-dom';

dotenv.config();



cloudinary.config({
    cloud_name: "dfsumz4wl",
    api_key: "731292745923114",
    api_secret: "_jbNc_Zv_cAdBfXi9mHO8l98MRU",
    secure: true
});

export async function registerUserController(request, response) {
    try {
        let user;
        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({
                message: "provide email, name, password",
                error: true,
                success: false
            })
        }

        user = await UserModel.findOne({ email: email });
        if (user) {
            return response.json({
                message: "User already Registered with this email",
                error: true,
                success: false
            })
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);




        user = new UserModel({
            name, email, password: hashPassword, verify_email: false
        });



        const verifyEmail = await sendEmailFun(user, "Verify email from Ecommerce App", "")

        const token = jwt.sign(
            { email: user.email, id: user._id },
            config.json_web_token_secret_key
        );

        return response.status(200).json({
            success: true,
            error: false,
            message: "User registered successfully! Please verify your email.",
            token: token,
        });

    }
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const verifyEmailController = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required.' });
        }

        // Find user by either current email or pending email
        const user = await UserModel.findOne({
            $or: [{ email }, { pending_email: email }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // OTP match
        if (!user.otp || user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        // Check OTP expiry
        if (user.otpExpires && user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        // ✅ If OTP for email update
        if (user.pending_email === email) {
            user.email = user.pending_email;
            user.pending_email = null;
            user.pending_emailExpires = null;
        }

        // ✅ Set email as verified
        user.verify_email = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        return res.status(200).json({ message: 'Email verified successfully.', email: user.email });

    } catch (err) {
        console.error('OTP verify error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function loginUserController(request, response) {
    try {
        const { email, password } = request.body;

        const user = await UserModel.findOne({ email }).select('+password');;
        if (!user) {
            return response.json({
                message: "User not found with this email",
                error: true,
                success: false
            })
        }

        if (user.status !== "Active") {
            response.status(400).json({
                message: "Contact to admin",
                error: true,
                success: false
            })
        }

        if (user.verify_email !== true) {
            response.status(400).json({
                message: "Your Email is not verify yet please verify your email first",
                error: true,
                success: false
            })
        }
        const checkPassword = await bcryptjs.compare(password, user.password);

        if (!checkPassword) {
            return response.status(400).json({
                message: "Check Your Password",
                error: true,
                success: false
            })
        }


        const accesstoken = await generateAccessToken(user._id);


        const refreshToken = await generateRefreshToken(user._id);
        console.log(refreshToken);

        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            last_login_date: new Date()
        })

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }


        response.cookie('accessToken', accesstoken, cookiesOption)
        response.cookie('refreshToken', refreshToken, cookiesOption)

        return response.json({
            message: "Login successfully",
            error: false,
            success: true,
            data: {
                accesstoken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

export const logoutUserController = async (request, response) => {
    try {
        const userid = request.userId; //auth middleware

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.clearCookie("accessToken", cookiesOption);
        response.clearCookie("refreshToken", cookiesOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
            refresh_token: ""
        })
        return response.json({
            message: "Logout successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

var imagesArr = [];
//image upload
export const userAvatarController = async (request, response) => {


    try {
        imagesArr = [];


        const userId = request.userId;
        const image = request.files;



        //remove image from cloudinary



        const user = await UserModel.findOne({ _id: userId });

        if (!user) {
            return response.status(500).json({
                message: "User not found",
                error: true,
                success: false
            })
        }

        //first remove image from cloudinary
        const imgUrl = user.avatar;
        const urlArr = imgUrl.split("/");
        const avatar_image = urlArr[urlArr.length - 1]; //last value of array

        const imageName = avatar_image.split(".")[0];

        if (imageName) {
            const res = await cloudinary.uploader.destroy(
                imageName,
                (error, result) => {

                }
            );

        }


        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false
        };
        for (let i = 0; i < image?.length; i++) {

            const result = await cloudinary.uploader.upload(image[i].path, options);
            imagesArr.push(result.secure_url);
            try {
                fs.unlinkSync(`uploads/${request.files[i].filename}`);
            } catch (err) {
                console.error("File deletion error:", err.message);
            }



        }

        user.avatar = imagesArr[0];
        await user.save();

        return response.status(200).json({
            _id: userId,  //frpm middleware auth
            avtar: imagesArr[0]
        });

    } catch (error) {


        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })



    }
}

export async function removeImageFromCloudinary(request, response) {
    const imgUrl = request.query.img;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1]; //last value of array

    const imageName = image.split(".")[0];

    if (imageName) {
        const res = await cloudinary.uploader.destroy(
            imageName,
            (error, result) => {

            }
        );
        if (res) {
            response.status(200).send(res);
        }
    }

}

export async function updateUserDetails(req, res) {
    try {
        const userId = req.userId; // Set via auth middleware
        const { name, newEmail, mobile, password } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        if (user.email === newEmail) {
    return res.status(400).json({ message: 'Same as current email' });
  }
        // ✅ Basic updates
        if (name) user.name = name;
        if (mobile) user.mobile = mobile;
        if (password) user.password = await bcryptjs.hash(password, 10);
        if(newEmail) user.pending_email = newEmail;

        // ✅ Email change logic
        if (email && email !== user.email) {
            // If same as pending email, do nothing
            if (email === user.pending_email) {
                return res.status(200).json({ message: 'Verification already sent. Check your email.' });
            }

            
            // ✅ Set new pending email, generate OTP
            const verifyEmail = await sendEmailFun(user, "Verify email from Ecommerce App", "", newEmail)


            return res.status(200).json({
                message: 'Email change requested. Please verify your new email address.',
                emailChangePending: true,
                oldEmailStillActive: true,
            });
        } else {
            // ✅ No email change — just save other updates
            await user.save();
        }

        return res.status(200).json({
            message: 'Profile updated successfully.',
            user,
        });

    } catch (error) {
        console.error('Update error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function resendOtpController(req, res) {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ pending_email: email });
         if (!user) return res.status(404).json({ message: 'no pending emails to resend' });
        

        const verifyEmail = await sendEmailFun(user, "Verify email from Ecommerce App", "")
        return res.json({ message: 'OTP resent.' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error.' });
    }
}

export async function forgotPasswordController(request, response) {
    try {
        const { email } = request.body;

        const user = await UserModel.findOne({ email});
        
        
        if (!user) {
            return response.status(400).json({
                message: "User Not found",
                error: true,
                success: false
            })
        }

        
        await sendEmailFun(user, "Reset Password Request", "")
         
        
            return response.json({ message: 'OTP sent to email. Please Check email' });
        
    
    }
     catch (error) {
        console.error(error); // log actual error
  response.status(500).json({ message: 'any error' });
    }
}

export async function verifyForgotPasswordOtp(request, response){
    try {
        const {email, otp } = request.body;

    const user = await UserModel.findOne({email});

    if(!user){
        return response.status(400).json({
            message: "Email not available",
            error: true,
            success: false
        })
    }


    if(!email || !otp){
        return response.status(400).json({
            message: "Provide required field email, otp.",
            error : true,
            success : false
        })
    }
    if(otp !== user.otp)
        {
         return response.status(400).json({
            message: "Invalid OTP",
            error: true,
            success: false
        })
    }

    const currentTime = new Date().toISOString()
    if(user.otpExpires < currentTime){
        return response.status(400).json({
            message: "Otp is expired",
            error: true,
            success: false
        })
    }

    user.otp="";
    user.otpExpires ="";
    await user.save();
    
    return response.status(400).json({
            message: "OTP Verified",
            error: true,
            success: false
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error : true,
            success : false
        })
    }

}

export async function resetPassword(request, response){
    try {
        const {email, newPassword, confirmPassword} = request.body;

        if(!email || !newPassword || !confirmPassword){
            return response.status(400).json({
                message: "provide required fields email, newPassword, confirmationPassword"
            })
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return response.status(400).json({
                message:"Email is not available",
                error: true,
            success: false
            })
        }

        if(newPassword !== confirmPassword){
            return response.status(400).json({
                message:"newpassword and confirm password must be same",
                error: true,
            success: false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt);

        user.password = hashPassword;
        await user.save();

         return response.json({
            message: "Password Updated successfully",
            error: false,
            success: true
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function refreshToken(request, response){
   
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1] //Bearer Token

        if(!refreshToken){
            return response.status(401).json({
        message : "Invalid token",
        error: true,
        success : false
    })
        }

        const verifyToken = await jwt.verify(refreshToken, config.secret_key_refresh_token)
    if(!verifyToken){
        return response.status(401).json({
        message : "token is expired",
        error: true,
        success : false
    })
    }

    const userId = verifyToken?._id;
    const newAccessToken = await generateAccessToken(userId);

    const cookiesOption = {
        httpOnly : true,
        secure : true,
        sameSite : "None"
    }
    
    response.cookie("accessToken", newAccessToken, cookiesOption);

    return response.json({
        message : "New Access token generated",
        error: false,
        success : true,
        data : {
            accesstoken : newAccessToken
        }
    })

    } catch (error) {
        return response.status(500).json({
        message : error.message || error,
        error: true,
        success : false
    })
    }
   
   
    
    

}

export async function userDetails(request, response){
    try {
        const userId = request.userId

        console.log(userId)

        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return response.json({
            message : 'user details',
            data : user,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : 'Something is wrong',
            error : true,
            success : false
        })
    }
}