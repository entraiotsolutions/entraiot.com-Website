# EmailJS Setup Guide

## ⚠️ IMPORTANT: Current Errors

### Error 412 - Zoho Authentication Failed

If you're seeing: **"Zoho: Invalid login: 535 Authentication Failed"** error (412), this means:
- Your Zoho email service credentials in EmailJS are invalid or expired
- You need to re-authenticate the Zoho service in EmailJS dashboard
- See "Fixing 412 Zoho Authentication Errors" section below

### Error 400 - Service ID Not Found

If you're seeing: **"The service ID not found"** error (400), this means:
- Your EmailJS Service ID is missing or incorrect
- You need to create/update `.env.local` file with correct credentials
- See troubleshooting steps below

## Environment Variables Required

**Create a `.env.local` file** in the root directory (same level as `package.json`) with:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

**Important:**
- File must be named `.env.local` (not `.env`)
- Variables MUST start with `NEXT_PUBLIC_` prefix
- No quotes around values
- Restart dev server after creating/updating the file

## How to Get EmailJS Credentials

1. **Sign up/Login to EmailJS**: https://www.emailjs.com/
2. **Create an Email Service**:
   - Go to "Email Services" in dashboard
   - Add a service (Gmail, Outlook, etc.)
   - Copy the **Service ID**
3. **Create an Email Template**:
   - Go to "Email Templates"
   - Create a new template
   - Use these template variables:
     - `{{fullname}}` - Full name
     - `{{email}}` - Email address
     - `{{phone}}` - Phone number
     - `{{company}}` - Company name
     - `{{industry}}` - Industry
     - `{{message}}` - Message content
   - Copy the **Template ID**
4. **Get Public Key**:
   - Go to "Account" → "General"
   - Copy your **Public Key**

## Troubleshooting 400 Errors

### "The service ID not found" Error

This is the most common error. Fix it by:

1. **Create `.env.local` file** in project root (if it doesn't exist)
2. **Get Service ID from EmailJS Dashboard**:
   - Go to https://dashboard.emailjs.com/admin
   - Click "Email Services" → Select your service
   - Copy the **Service ID** (it looks like `service_xxxxxxx`)
3. **Add to `.env.local`**:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   ```
4. **Restart dev server**:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

### General Troubleshooting

If you see a 400 error, check:

1. **File Location**: `.env.local` must be in the root directory (same folder as `package.json`)
2. **Variable Names**: Must start with `NEXT_PUBLIC_` (case-sensitive)
3. **No Quotes**: Don't use quotes around values in `.env.local`
4. **Restart Server**: Always restart dev server after changing `.env.local`
5. **Verify IDs**: Double-check Service ID, Template ID, and Public Key match your EmailJS dashboard
6. **Template Variables**: Ensure your EmailJS template uses the correct variable names
7. **Service Status**: Verify your email service is active and verified in EmailJS dashboard

## Fixing 412 Zoho Authentication Errors

If you see **"Zoho: Invalid login: 535 Authentication Failed"** (412 error):

1. **Go to EmailJS Dashboard**: https://dashboard.emailjs.com/admin
2. **Navigate to Email Services**: Click "Email Services" in the left menu
3. **Select Your Zoho Service**: Click on the Zoho service that's failing
4. **Re-authenticate**:
   - Click "Edit" or "Re-authenticate" button
   - Enter your Zoho email and password
   - If using App Password, make sure it's correct
   - Save the changes
5. **Verify Service Status**: Ensure the service shows as "Active" or "Connected"
6. **Test Again**: Try sending an email from your contact form

**Note**: Zoho may require App Passwords instead of regular passwords. To create an App Password:
- Log in to Zoho Mail
- Go to Settings → Security → App Passwords
- Generate a new app password
- Use this app password (not your regular password) in EmailJS

## Common Error Messages

- **400 - Service ID Invalid**: Check `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- **400 - Template ID Invalid**: Check `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- **400 - Public Key Invalid**: Check `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- **412 - Authentication Failed**: 
  - **Zoho**: Re-authenticate Zoho service in EmailJS dashboard (see section above)
  - **Other services**: Re-verify your email service credentials in EmailJS dashboard

## Testing

After setup, test the contact form. Check browser console for detailed error messages if issues persist.

