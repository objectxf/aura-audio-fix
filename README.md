# 🎧 AURA Audio — E-Commerce Mobile RWD & Layout Fix Case Study

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

> **Live Demos:** 
> - 🟢 **Fixed Production Page (After):** [View Live Fix](https://YOUR-GITHUB-USERNAME.github.io/aura-audio-ecommerce-fix/index.html)
> - 🔴 **Replicated Bug Page (Before):** [View Broken Layout](https://YOUR-GITHUB-USERNAME.github.io/aura-audio-ecommerce-fix/broken.html)

---

## 📌 Project Overview
This repository contains a technical case study demonstrating a real-world e-commerce mobile layout diagnosis and fix for a minimalist luxury audio brand ("AURA AUDIO"). 

### The Problem
On viewports smaller than `640px` (mobile devices), the primary Sticky Conversion Bar (`.sticky-mobile-bar`) broke out of the viewport bounds due to an unrestrained `min-width` declaration. 

* **Impact:** Created a severe horizontal scroll (`overflow-x`), pushed the primary CTA ("ADD TO BAG") out of the visible screen area, and dropped mobile conversion potential.

---

## 🛠️ Diagnostics & Technical Fix

| Problem Area | Root Cause | Solution Applied |
| :--- | :--- | :--- |
| **Horizontal Overflow** | Unbound `min-width: 520px` on mobile drawer container | Applied `width: 100%`, `max-width: 100vw`, and `box-sizing: border-box` |
| **Sticky Bar Cutoff** | Incorrect `z-index` stacking context with product accordions | Re-calculated z-index hierarchy (`z-50`) & fixed viewport positioning |
| **Mobile UX** | Tiny touch targets on color selector swatches | Expanded touch target sizes to a minimum of `44px x 44px` (WCAG AAA standard) |

---

## 📸 Visual Comparison

| Before (Broken Layout) | After (Pixel-Perfect Fix) |
| :---: | :---: |
| ![Before Bug](./assets/demo-before.png) | ![After Fix](./assets/demo-after.png) |
| *Horizontal overflow & cut-off CTA* | *Fluid responsive mobile layout* |

---

## 🧰 Tech Stack & Tools Used
* **Frontend:** HTML5, CSS3 / Tailwind CSS, ES6 JavaScript
* **Debugging:** Chrome DevTools (Local Overrides, Device Mode, Lighthouse)
* **Auditing:** Mobile-Friendly Test, Core Web Vitals Audit

---

## 📬 Contact & Hire
Available for freelance e-commerce fixes (WooCommerce / Shopify frontend issues, RWD repairs, PageSpeed tuning).

* **Useme Profile:** [My Useme Portfolio](https://useme.com)
* **Location:** Wrocław, Poland