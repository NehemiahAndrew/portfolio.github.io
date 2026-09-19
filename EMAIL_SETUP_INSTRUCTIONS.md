# Contact Form Email Setup Instructions

## Overview
Your contact form is now configured to send emails directly to your inbox using EmailJS. Follow these steps to complete the setup.

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Select "Gmail" and connect your `nehemiahandrew1@gmail.com` account
   - **Outlook**: If you prefer Outlook/Hotmail
   - **Other**: You can use any SMTP service

4. Note down your **Service ID** (something like `service_xxxxxx`)

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

### Template Settings:
- **Template Name**: Portfolio Contact Form
- **Template ID**: Note this down (something like `template_xxxxxx`)

### Template Content:
```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply directly to this email to respond to the sender.
```

### Template Variables:
Make sure these variables are set:
- `from_name`
- `from_email` 
- `subject`
- `message`
- `to_email`

## Step 4: Get Your Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (something like `user_xxxxxxxxxxxxxx`)

## Step 5: Update Your Website Code
Open your `script.js` file and replace these placeholder values:

```javascript
// Line ~188: Replace YOUR_PUBLIC_KEY
emailjs.init("YOUR_ACTUAL_PUBLIC_KEY_HERE");

// Line ~233: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
emailjs.send('YOUR_ACTUAL_SERVICE_ID', 'YOUR_ACTUAL_TEMPLATE_ID', templateParams)
```

### Example of what it should look like:
```javascript
// Initialize EmailJS
emailjs.init("user_abc123def456ghi789");

// Send email
emailjs.send('service_gmail123', 'template_contact456', templateParams)
```

## Step 6: Test Your Contact Form
1. Save your changes
2. Refresh your website
3. Fill out the contact form with test information
4. Submit the form
5. Check your email inbox for the message

## Troubleshooting

### Common Issues:
1. **"EmailJS is not defined" error**:
   - Make sure the EmailJS script is loaded in your HTML head section
   - Check your internet connection

2. **Form submission fails**:
   - Verify your Service ID and Template ID are correct
   - Check that your email service is properly connected
   - Ensure all template variables match your form field names

3. **Emails not arriving**:
   - Check your spam/junk folder
   - Verify the template is properly configured
   - Test with a different email address

### EmailJS Free Plan Limits:
- 200 emails per month
- EmailJS branding included
- Perfect for portfolio websites

### Security Notes:
- Your EmailJS public key is safe to expose in client-side code
- EmailJS handles all the security and email delivery
- Your actual email credentials are never exposed

## Alternative: Simple mailto Link
If you prefer a simpler solution, you can replace the form with a mailto link:

```html
<a href="mailto:nehemiahandrew1@gmail.com?subject=Portfolio Inquiry" class="btn btn-gradient">
    Contact Me <i class="fas fa-envelope"></i>
</a>
```

## Need Help?
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

---

Once you complete these steps, your contact form will send emails directly to `nehemiahandrew1@gmail.com` whenever someone submits the form on your website!
