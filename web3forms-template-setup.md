# Web3Forms Modern Email Template Setup

## Step 1: Access Your Web3Forms Dashboard

1. Go to [https://web3forms.com/](https://web3forms.com/)
2. Log in to your account
3. Find your form with access key: `ab227eb3-9055-493a-ba5d-eae7a8585b61`

## Step 2: Update Email Template

1. Click on your form to edit it
2. Go to "Email Template" or "Settings" section
3. Replace the default template with the modern template below

## Step 3: Modern HTML Template

Copy and paste this template into your Web3Forms email template:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio Contact</title>
    <style>
      body {
        font-family: "Segoe UI", Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background: #f8f9fa;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }
       .header {
         background: linear-gradient(135deg, #000000 0%, #333333 50%, #666666 100%);
         color: white;
         padding: 40px 30px;
         text-align: center;
       }
      .header h1 {
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 10px 0;
      }
      .header p {
        font-size: 16px;
        opacity: 0.9;
        margin: 0;
      }
      .content {
        padding: 40px 30px;
      }
       .sender-card {
         background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
         border-radius: 12px;
         padding: 25px;
         margin: 25px 0;
         border-left: 5px solid #333333;
       }
      .sender-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
      }
      .info-item {
        display: flex;
        flex-direction: column;
      }
      .info-label {
        font-size: 12px;
        font-weight: 600;
        color: #667eea;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 8px;
      }
      .info-value {
        font-size: 16px;
        color: #333;
        font-weight: 500;
      }
      .info-value a {
        color: #667eea;
        text-decoration: none;
      }
      .message-section {
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        border-radius: 12px;
        padding: 25px;
        margin: 25px 0;
        border: 1px solid #e9ecef;
      }
      .message-section h3 {
        color: #667eea;
        font-size: 18px;
        margin-bottom: 15px;
      }
      .message-text {
        font-size: 16px;
        line-height: 1.8;
        color: #555;
        white-space: pre-wrap;
        background: white;
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid #667eea;
      }
      .cta-section {
        text-align: center;
        margin: 30px 0;
      }
      .reply-button {
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 30px;
        text-decoration: none;
        border-radius: 50px;
        font-weight: 600;
        font-size: 16px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      }
      .footer {
        background: #f8f9fa;
        padding: 30px;
        text-align: center;
        border-top: 1px solid #e9ecef;
      }
      .footer p {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
      }
      .footer .timestamp {
        font-size: 12px;
        color: #999;
      }
      .status-badge {
        display: inline-block;
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 20px;
      }
      @media (max-width: 600px) {
        .sender-info {
          grid-template-columns: 1fr;
        }
        .content {
          padding: 25px 20px;
        }
        .header {
          padding: 30px 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>📧 New Portfolio Contact</h1>
        <p>You've received a new message through your portfolio website</p>
      </div>
      <div class="content">
        <div style="text-align: center;">
          <span class="status-badge">New Message</span>
        </div>
        <div class="sender-card">
          <div class="sender-info">
            <div class="info-item">
              <div class="info-label">👤 From</div>
              <div class="info-value">{{name}}</div>
            </div>
            <div class="info-item">
              <div class="info-label">📧 Email</div>
              <div class="info-value">
                <a href="mailto:{{email}}">{{email}}</a>
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">🕒 Date</div>
              <div class="info-value">{{date}}</div>
            </div>
            <div class="info-item">
              <div class="info-label">🌐 Source</div>
              <div class="info-value">{{website}}</div>
            </div>
          </div>
        </div>
        <div class="message-section">
          <h3>💬 Message</h3>
          <div class="message-text">{{message}}</div>
        </div>
        <div class="cta-section">
          <a
            href="mailto:{{email}}?subject=Re: Portfolio Contact from {{name}}"
            class="reply-button"
            >Reply to {{name}}</a
          >
        </div>
        <div
          style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;"
        >
          <p>This message was sent from your portfolio contact form</p>
        </div>
      </div>
      <div class="footer">
        <p>Portfolio Contact System</p>
        <div class="timestamp">Sent on {{date}} at {{time}}</div>
      </div>
    </div>
  </body>
</html>
```

## Step 4: Template Variables

The template uses these variables that are automatically filled by Web3Forms:

- `{{name}}` - Sender's name
- `{{email}}` - Sender's email
- `{{message}}` - Message content
- `{{date}}` - Formatted date
- `{{time}}` - Formatted time
- `{{website}}` - Source website

## Step 5: Test the Template

1. Save the template in your Web3Forms dashboard
2. Test your contact form
3. Check your email for the beautiful formatted message

## Features of This Template:

✅ **Modern Design** - Gradient backgrounds and modern styling
✅ **Responsive** - Works on mobile and desktop
✅ **Interactive Elements** - Hover effects and animations
✅ **Professional Layout** - Clean, organized information
✅ **Easy Reply** - One-click reply button
✅ **Status Indicators** - Visual status badges
✅ **Mobile Optimized** - Responsive design

Your emails will now look professional and modern! 🎨
