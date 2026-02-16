# วิธี Publish โปรเจกต์ขึ้น GitHub

## ลิงก์เว็บ (ไม่ต้องรอให้โผล่ใน Settings)

- **https://muekotchamon.github.io/estimates/**  
  ใช้ลิงก์นี้เปิดเว็บได้เลย หลัง deploy workflow สำเร็จ (ถ้ายังไม่เคยรัน workflow ให้ไปที่แท็บ **Actions** → กด Run workflow ของ "Deploy to GitHub Pages" ก่อน)

## 1. ตั้งค่า Repo (ทำครั้งเดียว)

- ไปที่ **GitHub** → repo **muekotchamon/estimates**
- **Settings** → **Pages**
- ใน **Build and deployment** → **Source** เลือก **GitHub Actions**

## 2. Publish (ทุกครั้งที่ต้องการอัปเดตเว็บ)

ในโฟลเดอร์โปรเจกต์ รันคำสั่ง:

```bash
# 1. เพิ่มไฟล์ที่เปลี่ยน
git add .

# 2. Commit (ใส่ข้อความอธิบาย)
git commit -m "อัปเดต: รายการที่แก้ไข"

# 3. Push ขึ้น GitHub (จะ trigger build + deploy อัตโนมัติ)
git push origin main
```

หลัง push เสร็จ:

- ไปที่ **Actions** ใน repo จะเห็น workflow **Deploy to GitHub Pages** ทำงาน
- รอให้ workflow สีเขียว (สำเร็จ)
- เปิดเว็บได้ที่: **https://muekotchamon.github.io/estimates/**

## 3. ตรวจสอบหลัง Publish

- เปิด **https://muekotchamon.github.io/estimates/** ในเบราว์เซอร์
- ถ้าหน้า blank: กด **Ctrl+Shift+R** (hard refresh) หรือเปิดใน Incognito
- ถ้ายังผิด: ตรวจว่า **Settings → Pages → Source** เป็น **GitHub Actions**

## 4. แก้ Error 404 (GET .../src/index.tsx Not Found)

ถ้าเห็น error ประมาณ `GET https://muekotchamon.github.io/src/index.tsx 404`:

1. **ใช้ URL ให้ถูก**  
   ต้องเปิด **https://muekotchamon.github.io/estimates/** (มี `/estimates/` ต่อท้าย)  
   ห้ามเปิดแค่ `https://muekotchamon.github.io/` เพราะจะไม่เจอแอป

2. **ให้ Pages ใช้ผลจาก Build (GitHub Actions)**  
   - ไปที่ repo → **Settings** → **Pages**  
   - ใน **Build and deployment** → **Source** ต้องเลือก **GitHub Actions**  
   - ถ้าเลือก "Deploy from a branch" อยู่ หน้าเว็บจะไปโหลดไฟล์ต้นทาง `/src/index.tsx` ซึ่ง GitHub Pages ไม่มี → จึง 404  
   - เปลี่ยนเป็น **GitHub Actions** แล้วรอ deploy ใหม่ (หรือไปที่ **Actions** → กด **Run workflow** ของ "Deploy to GitHub Pages")

3. หลังเปลี่ยนแล้ว เปิด **https://muekotchamon.github.io/estimates/** ใหม่ (หรือกด Ctrl+Shift+R)

## สรุปไฟล์ที่ใช้ Publish

| ไฟล์ | หน้าที่ |
|------|--------|
| `vite.config.ts` | ตั้ง `base: '/estimates/'` ให้ path ถูกบน GitHub Pages |
| `.github/workflows/deploy-pages.yml` | Build และ deploy อัตโนมัติเมื่อ push ขึ้น `main` |
| **Settings → Pages → Source: GitHub Actions** | ให้ GitHub ใช้ผลจาก workflow ไม่ใช่ deploy จาก branch โดยตรง |
