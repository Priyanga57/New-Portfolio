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
VITE_EMAILJS_SERVICE_ID=service_priyanga_portfolio
VITE_EMAILJS_TEMPLATE_ID=template_contact_form
VITE_EMAILJS_PUBLIC_KEY=user_your_public_key_here

# Google Sheets Webhook URL (for logging contact entries)
VITE_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec

# Public Google Sheet View Link (Optional)
VITE_GOOGLE_SHEETS_VIEW_LINK=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit?usp=sharing
```

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
