# EmailJS Troubleshooting Guide

## Current Issue: "Direct email sending failed"

The contact form is falling back to mailto because EmailJS is failing. Here's how to fix it:

## Step 1: Check EmailJS Template

1. Go to your EmailJS dashboard: https://dashboard.emailjs.com/
2. Navigate to "Email Templates"
3. Find template `template_ona50lp`
4. Make sure it has these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`
   - `{{to_email}}`
   - `{{reply_to}}`

## Step 2: Update Template Content

Replace your template content with this simple version first:

**Subject**: `New Portfolio Contact from {{from_name}}`

**Content**:

```
Hello Ahsan,

You have received a new message through your portfolio website.

Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}

Reply to: {{reply_to}}
```

## Step 3: Check Console Logs

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Try sending a message from the contact form
4. Look for error messages that will help identify the issue

## Step 4: Common Issues & Solutions

### Issue 1: "Service not found"

- **Solution**: Check that `service_dezde9w` exists in your EmailJS dashboard
- **Fix**: Go to "Email Services" and verify the service ID

### Issue 2: "Template not found"

- **Solution**: Check that `template_ona50lp` exists and is published
- **Fix**: Go to "Email Templates" and make sure the template is saved and published

### Issue 3: "Invalid public key"

- **Solution**: Verify the public key `OpYMsQmkcsXII--kC` is correct
- **Fix**: Go to "Account" → "General" and copy the public key again

### Issue 4: "Template variables not found"

- **Solution**: Make sure your template uses the exact variable names
- **Fix**: Use only `{{from_name}}`, `{{from_email}}`, `{{message}}`, etc.

## Step 5: Test with Simple Template

If the complex template doesn't work, try this minimal version:

**Subject**: `Contact from {{from_name}}`

**Content**:

```
Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}
```

## Step 6: Check EmailJS Service Status

1. Go to your EmailJS dashboard
2. Check if your email service is active
3. Make sure it's connected to your Gmail account
4. Test sending a message from the EmailJS dashboard

## Alternative: Use Formspree

If EmailJS continues to fail, I can set up Formspree as an alternative:

1. Go to https://formspree.io/
2. Create a free account
3. Create a new form
4. Get the form endpoint
5. Update the contact form to use Formspree instead

Would you like me to set up Formspree as a backup solution?
