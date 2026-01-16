# 🌙 Aventura Website

A modern, fully static website for **Aventura** — an AI-powered interactive fiction platform focused on immersive storytelling, memory systems, and player-driven narratives.

Built with **vanilla HTML, CSS, and JavaScript** for simplicity, speed, and zero build complexity.

---

## ✨ Purpose

This repository contains the **official website** for Aventura.

The site:
- Introduces the platform
- Highlights core features
- Guides new users through setup
- Links to downloads, documentation, and community resources

It is intentionally designed to be:
- **Static**
- **Lightweight**
- **Easy to host**
- **Easy to maintain**

---

## 🚀 Key Features

- **Modern, Cozy Design**  
  Clean layout with a warm aesthetic suited for narrative-driven experiences.

- **Fully Static**  
  No backend, no database, no build tools — just HTML, CSS, and JavaScript.

- **Fast & Lightweight**  
  Minimal JavaScript and optimized assets for excellent performance.

- **Responsive & Mobile-First**  
  Works seamlessly on desktop, tablet, and mobile devices.

- **Dynamic Release Info**  
  Fetches the latest Aventura release version from GitHub using the public API.

- **Accessibility-Friendly**  
  Semantic HTML and ARIA labels for assistive technologies.

---

## 📁 Project Structure

```
aventura-website/
├── images/                  # Images & visual assets
│   ├── aventura_mascot.png
│   ├── logo.png
│   ├── wizard.png
│   └── start-*.png          # Setup guide screenshots
│
├── pages/                   # Subpages
│   ├── docs.html            # Documentation & FAQ
│   ├── features.html        # Feature overview
│   └── setup.html           # Step-by-step setup guide
│
├── index.html               # Landing page
├── style.css                # Global styles (Tailwind-based)
├── includes.js              # Header/footer injection
├── release-dynamic.js       # GitHub release version fetching
├── .htaccess                # Optional Apache configuration
└── readme.md                # This file
```

---

## 🧭 Pages Overview

- **Home (`index.html`)**  
  Overview of Aventura, feature highlights, privacy stance, and download links.

- **Features (`pages/features.html`)**  
  Detailed breakdown of AI storytelling, memory systems, world state tracking, and advanced features.

- **Setup (`pages/setup.html`)**  
  Beginner-friendly guide for installation, AI provider selection, and first-time use.

- **Docs (`pages/docs.html`)**  
  Documentation hub with FAQs and external resource links.

---

## 🌐 Deployment

No build step required.  
Upload the files to **any static hosting provider**.

### Recommended Hosting

Works out of the box with:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any standard web server

---

### Apache Notes

The included `.htaccess` provides basic configuration.  
Ensure `mod_rewrite` is enabled if required.

---

### Nginx Example

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

---

## 🔗 GitHub Integration

The site uses client-side JavaScript (`release-dynamic.js`) to fetch the **latest release version** from GitHub.

All download buttons link directly to the GitHub Releases page.

---

## 📜 License

This website is part of the **Aventura ecosystem**.

See the main Aventura repository for license details.

---

## 🔗 Useful Links

- **Main Repository**  
  https://github.com/unkarelian/Aventura

- **Releases**  
  https://github.com/unkarelian/Aventura/releases

- **Discord Community**  
  https://discord.gg/SyGGcXjbR6

  ---
  <sub>Built with ✨sparkles✨ - by Puppy 🐾 · https://puppy.im</sub>
