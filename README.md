# 🌌 Priyanga V S — Personal Data Analyst Portfolio

A high-performance, modern, and interactive portfolio website built for **Priyanga V S**, Data Analyst. Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, **EmailJS**, and **Google Sheets API**.

---

## ✨ Key Features

- **🗺️ Interactive Milestone Path (Home Journey)**:
  - Serpentine glowing path with interactive milestone nodes: **About Me**, **Education**, **Internships**, **Skills**, **Certificates**, **Projects**, and **Contact**.
  - Interactive hover effects, ambient glowing animations, and seamless page navigation.

- **📩 Contact Us System (EmailJS & Google Sheets)**:
  - Direct message delivery via **EmailJS REST API**.
  - Real-time response logging to **Google Sheets** via Google Apps Script Webhooks.
  - Automatic `mailto:` fallback if environment variables are not yet configured.

- **📊 Dynamic Google Sheets Sync**:
  - Live data syncing for Projects, Work Experience, and Certificates directly from Google Sheets.

- **🎨 Premium UI & Theme Switching**:
  - Modern dark/light theme options with rich glassmorphism, vibrant cyan glows, and smooth page transitions using **Framer Motion**.

- **📱 Fully Responsive & Accessible**:
  - Fluid layout optimized across desktop, tablet, and mobile displays with WCAG focus state accessibility.

- **🔍 SEO & Schema Ready**:
  - Integrated JSON-LD schema objects (`Person`, `WebSite`, `BreadcrumbList`) and dynamic title/meta tag updates.

---

## 🛠️ Environment Configuration (`.env`)

Create a `.env` file in the root directory (refer to `.env.example`):

```env
# EmailJS Configuration (Contact Us Form)
VITE_EMAILJS_SERVICE_ID=service_ihg86zl
VITE_EMAILJS_TEMPLATE_ID=template_irw7xde
VITE_EMAILJS_PUBLIC_KEY=dkItiDtysRCGpkEH9

# Google Sheets Integration
VITE_GOOGLE_SHEET_ID=1-vYObH2VKo9MLaLqE5CktEUtlxZhYs10GnUENQRRViI
VITE_GOOGLE_SHEETS_VIEW_LINK=https://docs.google.com/spreadsheets/d/1-vYObH2VKo9MLaLqE5CktEUtlxZhYs10GnUENQRRViI/edit?usp=sharing
```

---

## 📧 EmailJS Template Setup

When creating your EmailJS Email Template in the EmailJS dashboard:

1. Go to **Email Templates** > **Create New Template** (or edit `template_irw7xde`).
2. Subject: `New Contact Form Message from {{user_name}}`
3. Click the **Source Code (`<>`)** button and paste the HTML template:

```html
<div style="margin:0; padding:0; background-color:#f5f7fa; font-family:Arial, Helvetica, sans-serif; color:#2c3e50; font-size:14px; line-height:1.6;">
  <div style="max-width:650px; margin:30px auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:10px; overflow:hidden;">
    <!-- Header -->
    <div style="padding:24px 30px; background:#1f2937; color:#ffffff;">
      <div style="font-size:20px; font-weight:600;">
        New Contact Form Message
      </div>
      <div style="margin-top:5px; font-size:13px; color:#d1d5db;">
        A new message has been received through your website.
      </div>
    </div>

    <!-- Content -->
    <div style="padding:30px;">
      <p style="margin:0 0 20px 0; font-size:14px; color:#4b5563;">
        Hello,
      </p>
      <p style="margin:0 0 25px 0; font-size:14px; color:#4b5563;">
        You have received a new message from your website contact form.
        Please review the details below and respond at your earliest convenience.
      </p>

      <!-- Contact Details -->
      <div style="margin-bottom:25px; padding:20px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
        <div style="margin-bottom:12px;">
          <span style="display:inline-block; width:90px; font-weight:600; color:#374151;">Name</span>
          <span style="color:#111827;">{{user_name}}</span>
        </div>
        <div style="margin-bottom:12px;">
          <span style="display:inline-block; width:90px; font-weight:600; color:#374151;">Email</span>
          <span style="color:#111827;">{{user_email}}</span>
        </div>
        <div>
          <span style="display:inline-block; width:90px; font-weight:600; color:#374151;">Received</span>
          <span style="color:#111827;">{{time}}</span>
        </div>
      </div>

      <!-- Message -->
      <div style="margin-bottom:10px; font-weight:600; font-size:15px; color:#111827;">Message</div>
      <div style="padding:18px 20px; margin-bottom:28px; background:#f9fafb; border-left:4px solid #374151; border-radius:4px; color:#374151; white-space:pre-wrap;">{{message}}</div>

      <!-- Reply Button -->
      <div style="text-align:center; margin:30px 0 10px 0;">
        <a href="mailto:{{user_email}}" style="display:inline-block; padding:12px 26px; background:#2563eb; color:#ffffff; text-decoration:none; font-size:14px; font-weight:600; border-radius:6px;">
          Reply to {{user_name}}
        </a>
      </div>
      <div style="text-align:center; font-size:12px; color:#9ca3af; margin-top:12px;">
        Reply directly to {{user_email}}
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:18px 30px; background:#f9fafb; border-top:1px solid #e5e7eb; text-align:center;">
      <div style="font-size:12px; color:#6b7280;">
        This is an automated notification from your website contact form.
      </div>
    </div>
  </div>
</div>
```

**Parameters automatically supplied by the website:**
- `{{user_name}}`: Sender's name
- `{{user_email}}`: Sender's email address
- `{{time}}`: Date and timestamp of message submission
- `{{message}}`: The full message body


---

## 📋 Google Apps Script Setup Guide (Google Sheets Integration)

To connect the contact form directly to a Google Sheet:
1. Open a new Google Sheet.
2. Go to **Extensions > Apps Script**.
3. Paste the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([new Date(), data.name, data.email, data.message]);
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy > New deployment**.
5. Select **Web app**, set **Execute as: Me** and **Who has access: Anyone**.
6. Copy the Web App URL and set it as `VITE_GOOGLE_SHEETS_WEBHOOK_URL` in `.env`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn

### Installation & Development

1. Clone or download the repository:
   ```bash
   cd Protfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
├── .env.example            # Environment variables template
├── .env                    # Local environment variables
├── skills.md               # Complete technical skills reference
├── README.md               # Project documentation
├── package.json            # Dependencies and npm scripts
├── src/
│   ├── components/         # Reusable UI components (Button, PageHeader, Navigation, etc.)
│   ├── contexts/           # Theme and Portfolio state contexts
│   ├── data/               # Static profile data fallback (`profile.ts`)
│   ├── hooks/              # Custom React hooks (`useSeo`, `useTheme`, etc.)
│   ├── pages/              # Route pages (Home, About, Projects, Experience, Certificates, Contact)
│   ├── sections/           # Home sections (MilestonePath, Hero, Skills, Workflow, etc.)
│   ├── services/           # External API handlers (`contactService.ts`)
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper utilities and SEO schema generators
```

---

## 📖 Technical Skills Reference

For full details on technical stack, analytical tools, machine learning capabilities, and workflow, see [`skills.md`](file:///c:/Users/Priyangaa/Downloads/Protfolio/skills.md).

---

© 2026 Priyanga V S. Built with passion for data and business intelligence.
