import VerificationEmail from "../utils/verifyEmailTemplate.js";
import sendEmail from "./emailService.js";

const OTP_TTL = 10 * 60 * 1000;
const PENDING_EMAIL_TTL = 24 * 60 * 60 * 1000;
const RESEND_COOLDOWN = 2 * 60 * 1000;

const sendEmailFun=async(user, subject, text, newEmail = null)=>{

    const now = Date.now();
  

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
  user.otpExpires = new Date(now + 2 * 60 * 1000);
  user.lastOtpSent = now;

  const to = newEmail || user.email;
  user.otp = otp;
  
  if (newEmail) 
    {
        user.pending_email = newEmail;
        user.pending_emailExpires = new Date(now + 24 * 60 * 60 * 1000);
    }
  await user.save();
console.log(user);
    const result = sendEmail({
    to: to,
    subject: 'Verify your email – Ecommerce App',
    html: VerificationEmail(user.name, otp),
  });
    if(result.success){
        return true;
    } else {
        return false;
    }
}

export default sendEmailFun;