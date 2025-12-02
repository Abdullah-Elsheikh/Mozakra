import nodemailer from 'nodemailer';

export const sendsEmail = async (email, template = 'welcome', data = {}) => {
    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    // Email templates
    const templates = {
        welcome: {
            subject: 'Welcome to Career Guidance Platform',
            html: `<h1>Welcome ${data.name || ''}!</h1><p>Thank you for joining our Career Guidance Platform. We're excited to help you on your career journey.</p>`
        },
        order_confirmation: {
            subject: 'Order Confirmation',
            html: `<h1>Order Confirmed</h1><p>Your order #${data.orderId || ''} has been confirmed. Total: $${data.total || '0'}</p>`
        },
        order_status_update: {
            subject: 'Order Status Update',
            html: `<h1>Order Status Update</h1><p>Your order #${data.orderId || ''} status has been updated to: ${data.status || ''}</p>`
        },
        password_reset: {
            subject: 'Password Reset Request',
            html: `<h1>Password Reset</h1><p>Your OTP code is: ${data.otp}</p><p>It will expire in 10 minutes.</p>`,
          },
        otp_verification: {
            subject: 'Your OTP Code',
            html: `<h1>OTP Verification</h1><p>Your OTP Code is: <strong>${data.otp || '000000'}</strong></p><p>Please use it to verify your identity. This code will expire soon.</p>`
        },
        password_reset_success: {
            subject: 'Password Reset Successful',
            html: `<h1>Password Reset Successfully</h1><p>Your password has been successfully reset.</p>`,
          },
    };
    
    // Get template or use default
    const emailTemplate = templates[template] || templates.welcome;
    
    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: emailTemplate.subject,
        html: emailTemplate.html
    };
    
    // Send email
    try {
        await transporter.sendMail(mailOptions);
        console.log(`${template} email sent successfully to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
