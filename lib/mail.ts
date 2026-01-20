import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

export async function sendOTP(to: string, otp: string) {
  const brandColor = "#FF6B35";
  const logoUrl = "public/logo/logo-icon.png";
  try {
    await transporter.sendMail({
      from: `"Project-1 Security" <${process.env.GMAIL_USER}>`,
      to: to,
      subject: "Your Project-1 Verification Code",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          
          <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            
            <div style="background-color: ${brandColor}; padding: 30px 20px; text-align: center;">
              <img src="${logoUrl}" alt="Project-1 Logo" style="width: 60px; height: auto; vertical-align: middle; margin-bottom: 10px; border-radius: 8px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px; font-weight: 700;">PROJECT-1</h1>
            </div>

            <div style="padding: 40px 30px; text-align: center; color: #333333;">
              <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #333;">Verify your email address</h2>
              <p style="margin-bottom: 30px; font-size: 16px; line-height: 1.5; color: #666;">
                Welcome to Project-1! Please use the verification code below to complete your sign-up.
              </p>

              <div style="background-color: #fff5f0; border: 2px dashed ${brandColor}; border-radius: 8px; padding: 15px; display: inline-block; margin-bottom: 30px;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: ${brandColor}; font-family: monospace;">${otp}</span>
              </div>

              <p style="font-size: 14px; color: #999; margin-top: 0;">
                This code will expire in <strong>10 minutes</strong>.
              </p>
              
              <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
                <p style="font-size: 12px; color: #aaa; margin: 0;">
                  If you did not request this code, please ignore this email.
                </p>
              </div>
            </div>

            <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888;">
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} Project-1. All rights reserved.</p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to send email" };
  }
}