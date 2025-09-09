# jasonkob.github.io

# Portfolio (Minimal)

โครงสร้างเว็บไซต์พอร์ตโฟลิโอมินิมอลสำหรับ GitHub Pages (โดเมน: `icenonthawat.me`).

## แก้ไขข้อมูลส่วนตัว
เปิดไฟล์ `index.html` แล้วค้นหา/แก้:
- `Your Name`
- คำอธิบาย hero / about / experience / education
- รายการ `Skills`
- รายการโปรเจกต์ภายใน `<section id="projects">`
- ส่วน `Contact` (Email, GitHub, LinkedIn)

## เพิ่ม / แก้โปรเจกต์
เพิ่ม `<article class="project-card" data-tags="web">` ภายใน `#projectGrid`
ฟิลด์ที่ใช้:
- `data-tags` ใส่หมวด เช่น `web`, `tool`, เว้นวรรคได้หลายค่า
- `.project-title` ชื่อ
- `.project-desc` คำอธิบายสั้น (แนะนำ ≤ 120 ตัวอักษร)
- `<ul class="meta">` ปรับ Role / Stack / Year
- ลิงก์ Demo / Code (เอาออกได้ถ้าไม่ใช้)

## ตัวกรอง (Filters)
ปุ่มกรองอ้างอิง `data-filter` ต้องตรงกับค่าภายใน `data-tags` ของการ์ด ถ้าจะเพิ่มหมวดใหม่:
1. เพิ่ม `<button class="filter-btn" data-filter="mobile">Mobile</button>` ในส่วน filters
2. ใส่ `data-tags="mobile"` ในการ์ด

## ธีม (Theme Toggle)
ระบบจำโหมดใน `localStorage` คีย์ `site-theme` (ค่า: `light` หรือ `dark`).

## โครงสร้างไฟล์
```
index.html
assets/
  css/style.css
  js/main.js
404.html
robots.txt
sitemap.xml
CNAME
```

## SEO / Social
- ปรับ `<meta name="description">`
- ปรับ Open Graph (title / description / image) ใน `<head>`
- อัปเดตรูป `og-image.png` (แนะนำ 1200x630) วางไว้ root
- JSON-LD ชนิด `Person` ปรับ name / jobTitle / sameAs

## เพิ่ม Font (ถ้าต้องการ)
เพิ่มภายใน `<head>` ก่อน style หลัก เช่นใช้ Google Fonts:
```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```
(ตอนนี้ fallback system-ui ทำงานอยู่แล้ว)

## ฟังก์ชัน JS ปัจจุบัน
- Toggle theme
- Highlight เมนูตามส่วนที่อยู่บนหน้าจอ
- กรองโปรเจกต์ตามหมวด
- ใส่ปีปัจจุบันอัตโนมัติใน footer

## การ Deploy
รีโปนี้เป็น GitHub Pages (user site) ดังนั้น push ไป branch `main` = ออนไลน์อัตโนมัติที่:
```
https://icenonthawat.me
```
ถ้า DNS เพิ่งตั้งค่า อาจใช้เวลาถึง 24 ชม.

## ปรับโดเมน / CNAME
ไฟล์ `CNAME` มีโดเมน กรณีเปลี่ยน แก้แล้ว commit (อย่าลบไฟล์)

## เพิ่ม Analytics (ทางเลือก)
ตัวอย่าง Plausible (เบาและไม่ใช้ cookie):
```
<script defer data-domain="icenonthawat.me" src="https://plausible.io/js/script.js"></script>
```
วางก่อน `</head>`.

## ปรับ Favicon
สร้างไฟล์ `favicon.svg` หรือ `favicon.png` วาง root แล้วปรับ `<link rel="icon">` ใน `index.html` (ตอนนี้ชี้ `favicon.svg` ไว้) 

## เคล็ดลับเพิ่มเติม
- ใช้ alt text หากเพิ่มรูปภาพ
- จำนวนโปรเจกต์แนะนำ 4–8 ชิ้น (คัดคุณภาพ)
- ใช้คำกริยาเชิงผลลัพธ์ใน Experience เช่น: "เพิ่มประสิทธิภาพโหลดหน้าเว็บลดลง 35%"

## งานถัดไปที่อาจเพิ่ม (Optional Enhancements)
- Lazy load ภาพโปรเจกต์ (attribute `loading="lazy"`)
- เพิ่มโหมด High Contrast แยกอีกอัน
- ดึงข้อมูลโปรเจกต์จากไฟล์ JSON เพื่อแก้ไขง่าย
- เพิ่มฟอร์มติดต่อผ่านบริการ (เช่น Formspree)

---
แก้ไขไฟล์แล้ว Refresh หน้าเพื่อดูผลได้ทันที (ไม่มี build ขั้นตอนเพิ่มเติม)