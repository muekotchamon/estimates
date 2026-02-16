# วิธี Publish โปรเจกต์ขึ้น GitHub

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

## สรุปไฟล์ที่ใช้ Publish

| ไฟล์ | หน้าที่ |
|------|--------|
| `vite.config.ts` | ตั้ง `base: '/estimates/'` ให้ path ถูกบน GitHub Pages |
| `.github/workflows/deploy-pages.yml` | Build และ deploy อัตโนมัติเมื่อ push ขึ้น `main` |
| **Settings → Pages → Source: GitHub Actions** | ให้ GitHub ใช้ผลจาก workflow ไม่ใช่ deploy จาก branch โดยตรง |
