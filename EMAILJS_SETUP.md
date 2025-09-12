# EmailJS Setup Guide

This guide will help you set up EmailJS to enable direct email sending from your portfolio contact form.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your chosen provider
5. **Important**: Note down your Service ID (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject**: Portfolio Contact from {{from_name}}

**Content**:

```
Hello Ahsan,

You have received a new message through your portfolio website.

Name: {{from_name}}
Email: {{from_email}}
Reply-to: {{reply_to}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. **Important**: Note down your Template ID (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to "Account" → "General"
2. Find your Public Key
3. **Important**: Copy this key (e.g., `abc123def456`)

## Step 5: Update Configuration

1. Open `app/config/emailjs.ts`
2. Replace the placeholder values:

```typescript
export const EMAILJS_CONFIG = {
  serviceId: "service_abc123", // Your actual service ID
  templateId: "template_xyz789", // Your actual template ID
  publicKey: "abc123def456", // Your actual public key
  toEmail: "ahsanauddry.ndc@gmail.com",
};
```

## Step 6: Test the Setup

1. Start your development server: `npm run dev`
2. Go to your portfolio contact form
3. Fill out the form and click "Send Message"
4. Check your email (ahsanauddry.ndc@gmail.com) for the message

## Troubleshooting

- **"Service not found"**: Check your Service ID
- **"Template not found"**: Check your Template ID
- **"Invalid public key"**: Check your Public Key
- **CORS errors**: Make sure your domain is added to EmailJS allowed origins

## Free Tier Limits

- 200 emails per month
- Perfect for portfolio websites
- No credit card required

## Security Notes

- Your public key is safe to use in client-side code
- EmailJS handles the actual email sending securely
- No sensitive credentials are exposed in your code
