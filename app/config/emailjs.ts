// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create a free account
// 3. Create an email service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Get your Service ID, Template ID, and Public Key
// 6. Replace the values below

export const EMAILJS_CONFIG = {
  // Your EmailJS service ID
  serviceId: "service_dezde9w",

  // Your EmailJS template ID
  templateId: "template_ona50lp",

  // Your EmailJS public key
  publicKey: "OpYMsQmkcsXII--kC",

  // Your email address where messages will be sent
  toEmail: "ahsanauddry.ndc@gmail.com",
};

// Formspree Configuration (Backup method)
// To set up Formspree:
// 1. Go to https://formspree.io/
// 2. Create a free account
// 3. Create a new form
// 4. Set email to: ahsanauddry.ndc@gmail.com
// 5. Copy the form endpoint and replace below

export const FORMSPREE_CONFIG = {
  // Replace with your Formspree form endpoint
  formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",

  // Your email address where messages will be sent
  toEmail: "ahsanauddry.ndc@gmail.com",
};

// Email template variables that will be available in your EmailJS template:
// - {{from_name}} - Sender's name
// - {{from_email}} - Sender's email
// - {{message}} - Message content
// - {{to_email}} - Your email address
// - {{reply_to}} - Reply-to email (same as sender's email)
