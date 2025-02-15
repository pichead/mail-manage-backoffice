
# เลือก base image ที่มี Node.js
FROM node:20-alpine

# ตั้ง working directory
WORKDIR /usr/src/app

# คัดลอกไฟล์โปรเจคทั้งหมดไปยัง container
COPY . .

# ติดตั้ง dependencies
RUN npm install

# RUN npm ci \
#     && npm uninstall bcrypt \
#     && npm install bcryptjs \
#     && npx prisma generate

# สร้าง Prisma Client
# RUN npx prisma generate

# สร้างไฟล์ build
RUN npm run build

# เปิดพอร์ตที่แอปพลิเคชันจะใช้งาน (เช่น 3000)
EXPOSE 3002

# คำสั่งที่ใช้ในการรันแอปพลิเคชัน
CMD ["npm", "start"]


