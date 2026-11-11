# ◈ ResumeGen — Live Resume Builder

A modern, minimalist, real-time resume builder web application built with vanilla HTML5, CSS3, and modern JavaScript. Design, preview, and export a clean, executive, watermark-free resume directly to PDF or print in seconds.

---

## ✨ Features

- **⚡ Instant Real-Time Preview**: Two-way reactive data binding updates the live resume preview side-by-side as you type.
- **📄 Watermark-Free Print & PDF Export**:
  - Specially engineered `@page` print stylesheets suppress default browser headers (page title, date) and footers (file URL, page numbers).
  - Automatically names the exported PDF file after your candidate name (e.g. `John Doe - Resume.pdf`) instead of a generic website title.
  - Formatted with standard executive margins (`12mm` × `16mm`) ensuring clean, single-page presentation without accidental trailing pages.
  - Avoids awkward element slicing using CSS `break-inside: avoid` and `page-break-inside: avoid`.
- **🧩 Smart Conditional Sections**:
  - **Personal & Contact Info**: Formats email, GitHub, and LinkedIn with separator dots dynamically—no stray dots or empty placeholders.
  - **Education**: Flexible entries for Degree/University, Class 12th, and Class 10th. Unfilled entries and empty sections hide automatically.
  - **Dynamic Projects**: Add or remove project entries on the fly. Completely blank project entries are filtered out automatically.
  - **Technical Skills & Hobbies**: Type comma-separated items to render clean, high-contrast pills in real-time.
- **🎨 Minimalist Monochrome Aesthetics**:
  - Elegant typography pairing **Inter** and **JetBrains Mono**.
  - Crisp black-and-white print styling using exact color-adjust fidelity (`print-color-adjust: exact`).
  - Fluid split-pane desktop layout and single-column mobile view.
- **🚀 Zero Dependencies**: 100% native Web technologies—no Node.js, Webpack, React, or third-party libraries required.

---

## 📁 Project Structure

```
RESUME WRITER/
├── index.html        # Semantic HTML structure & two-column responsive layout
├── style.css         # Monochrome design system, utility variables & print styles
├── script.js         # Reactive data binding, dynamic list management & print hooks
├── README.md         # Comprehensive project documentation
└── .gitignore        # Git ignore rules
```

---

## 🚀 Getting Started

No installation or build steps are needed.

### Option 1: Open Directly in Browser
Simply double-click `index.html` or drag and drop it into any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari).

### Option 2: Run with a Local Server
If you prefer running via a local development server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

**Using Node.js (npx):**
```bash
npx serve .
```

**Using VS Code:**
Install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

---

## 🖨️ How to Export to PDF or Print

1. Fill out your details in the left form pane.
2. Review your formatted resume in the **Live Preview** pane on the right.
3. Click the **"Print / Export PDF"** button (or press `Ctrl + P` / `Cmd + P`).
4. In the browser print dialog:
   - **Destination**: Choose **"Save as PDF"** or select your physical printer.
   - **Paper Size**: **A4** or **Letter**.
   - **Headers and footers**: Leave default (our stylesheet automatically removes web watermarks and URLs).
5. Click **Save** or **Print**.

---

## 🛠️ Built With

- **HTML5** — Semantic elements (`<main>`, `<section>`, `<fieldset>`, `<legend>`)
- **CSS3** — Custom properties (CSS variables), Grid, Flexbox, media queries, and `@page` print rules
- **JavaScript (ES6+)** — Modular DOM manipulation, live event listeners, and print lifecycle hooks (`beforeprint`, `afterprint`)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
