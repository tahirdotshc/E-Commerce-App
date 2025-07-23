const VerificationEmail = (username, otp) => {
  return `
  <!DOCTYPE html>
  <html lang="en" style="margin:0; padding:0; font-family: Arial, sans-serif;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
    <style>
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
          padding: 20px !important;
        }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4;">
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table width="600" class="container" style="background: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <tr>
              <td align="center" style="padding-bottom: 30px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Email-Icon-Transparent-Image.png/600px-Email-Icon-Transparent-Image.png" width="60" alt="Verify Email" />
                <h2 style="margin: 20px 0 10px; font-size: 24px; color: #333;">Verify Your Email</h2>
              </td>
            </tr>
            <tr>
              <td style="font-size: 16px; color: #333;">
                <p>Hi <strong>${username}</strong>,</p>
                <p>Thank you for signing up! Please use the verification code below to complete your email verification process:</p>
                <div style="margin: 30px 0; text-align: center;">
                  <span style="display: inline-block; padding: 15px 25px; font-size: 24px; color: #ffffff; background-color: #007bff; border-radius: 6px; letter-spacing: 2px;">
                    ${otp}
                  </span>
                </div>
                <p style="margin-bottom: 30px;">This code will expire in 10 minutes. If you did not request this, you can safely ignore this email.</p>
                <p style="color: #999; font-size: 14px;">Need help? <a href="mailto:support@example.com" style="color: #007bff;">Contact Support</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding-top: 40px; border-top: 1px solid #ddd; text-align: center; font-size: 12px; color: #999;">
                <p>© ${new Date().getFullYear()} YourAppName, Inc. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

export default VerificationEmail;