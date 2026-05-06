# Environment Setup Guide

This guide will help you configure all the necessary environment variables for your Al Mumeetu Portfolio project.

## 📋 Overview

Your Next.js portfolio requires the following services:
- MongoDB (Database)
- NextAuth.js (Authentication)
- Cloudinary (Image Uploads)
- SMTP Email Service (Contact Form)

## 🚀 Quick Start

1. Copy the environment file:
```bash
cp .env.example .env
```

2. Fill in your actual credentials in the `.env` file
3. Run the development server:
```bash
pnpm dev
```

---

## 🗄️ MongoDB Database Setup

### Option 1: Local MongoDB (Development)
```bash
MONGODB_URI=mongodb://localhost:27017/almumeetu-portfolio
```

**Steps:**
1. Install MongoDB locally:
   ```bash
   # macOS
   brew install mongodb-community
   brew services start mongodb-community
   
   # Ubuntu/Debian
   sudo apt-get install mongodb
   sudo systemctl start mongodb
   ```

2. Create database named `almumeetu-portfolio`

### Option 2: MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (Free M0 Sandbox)
4. Create a database user
5. Whitelist your IP address
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

**Format:**
```bash
MONGODB_URI=mongodb+srv://saikat:almumeetusaikat@cluster.mongodb.net/almumeetu-portfolio
```

---

## 🔐 NextAuth.js Configuration

### Generate NEXTAUTH_SECRET
```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -base64 32
```

### Configuration
```bash
# Development
NEXTAUTH_URL=http://localhost:3000

# Production
NEXTAUTH_URL=https://yourdomain.com
```

---

## 📸 Cloudinary Setup (Image Uploads)

### Steps:
1. **Create Account**: Go to [Cloudinary](https://cloudinary.com)
2. **Sign Up**: Free tier includes 25 credits/month
3. **Get Credentials**:
   - Dashboard → Account Details
   - Copy: Cloud Name, API Key, API Secret

### Environment Variables:
```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Usage:
- Blog post featured images
- Profile pictures
- Project thumbnails
- All images are automatically optimized

---

## 📧 Email Service Setup (SMTP)

### Option 1: Gmail (Recommended for Development)

**Steps:**
1. Enable 2-Factor Authentication on your Gmail account
2. Generate App Password:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App Passwords
   - Select "Mail" and device (e.g., "Portfolio App")
   - Copy the 16-character password

**Configuration:**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
EMAIL_FROM=noreply@yourdomain.com
```

### Option 2: Other Email Services

#### SendGrid
1. Create account at [SendGrid](https://sendgrid.com)
2. Verify your domain
3. Create API Key

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=YOUR_SENDGRID_API_KEY
```

#### Mailgun
1. Create account at [Mailgun](https://mailgun.com)
2. Add and verify your domain
3. Use SMTP credentials from dashboard

---

## 👤 Admin Credentials

These are used to create the first admin user automatically:

```bash
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password
```

**Important:**
- Change these to your preferred credentials
- Use a strong password
- The admin user is created on first login

---

## 🔧 Complete .env Example

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/almumeetu-portfolio

# NextAuth.js
NEXTAUTH_SECRET=your-32-character-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-admin-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
EMAIL_FROM=noreply@yourdomain.com

# Environment
NODE_ENV=development
```

---

## 🚨 Security Best Practices

### ✅ Do:
- Keep your `.env` file private (it's in .gitignore)
- Use different credentials for development and production
- Use strong, unique passwords
- Rotate secrets periodically
- Use environment-specific values

### ❌ Don't:
- Commit `.env` file to Git
- Share your credentials publicly
- Use default/example passwords in production
- Hardcode secrets in your code

---

## 🛠️ Troubleshooting

### MongoDB Connection Issues
- Check if MongoDB is running (`brew services list` on macOS)
- Verify your IP is whitelisted in MongoDB Atlas
- Ensure username/password are correct

### Email Not Sending
- Verify Gmail App Password is correct
- Check if 2FA is enabled on Gmail account
- Try different SMTP port (465 with SSL)

### Cloudinary Upload Failures
- Verify API credentials
- Check folder permissions
- Ensure image size limits are respected

### NextAuth Issues
- Clear browser cookies
- Verify NEXTAUTH_URL matches your current domain
- Check NEXTAUTH_SECRET is set

---

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833)

---

## 🤝 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Check the browser console for error messages
4. Review the server logs for detailed error information

Happy coding! 🎉
