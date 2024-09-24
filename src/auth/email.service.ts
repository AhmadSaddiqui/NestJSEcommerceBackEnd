import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: +process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendVerificationEmail(email: string, otp: string): Promise<void> {
    console.log("sjdgfjs")
    const mailOptions = {
        
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`,
      
    };

    await this.transporter.sendMail(mailOptions);
  }
}
