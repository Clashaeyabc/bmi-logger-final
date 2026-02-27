# Software Requirements Specification (SRS)
## BMI Logger Web Application

---

## 1. Introduction

### 1.1 Purpose
เอกสารนี้จัดทำขึ้นเพื่อระบุความต้องการของระบบ (Software Requirements Specification: SRS) สำหรับระบบเว็บแอปพลิเคชัน “BMI Logger” ซึ่งใช้สำหรับคำนวณค่า BMI และบันทึกประวัติข้อมูลผู้ใช้งาน

### 1.2 Scope
ระบบ BMI Logger เป็น Web-based Application ที่ให้ผู้ใช้งานสามารถ:
- คำนวณค่า BMI จากส่วนสูงและน้ำหนัก
- บันทึกข้อมูลลงในระบบ
- ดูประวัติย้อนหลัง
- Export/Import ข้อมูลเป็นไฟล์ JSON
ระบบทำงานบน Web Browser และ Deploy บน Vercel

### 1.3 Definitions
- BMI (Body Mass Index): ค่าดัชนีมวลกาย คำนวณจากน้ำหนัก(kg) / (ส่วนสูง(m))²
- localStorage: ระบบจัดเก็บข้อมูลฝั่งผู้ใช้ใน Web Browser

---

## 2. Overall Description

### 2.1 Product Perspective
ระบบเป็น Web Application พัฒนาโดยใช้:
- Next.js
- TypeScript
- Tailwind CSS
- Deploy บน Vercel
- ใช้ localStorage สำหรับจัดเก็บข้อมูล

### 2.2 User Classes
- ผู้ใช้งานทั่วไป (General User)

### 2.3 Operating Environment
- Web Browser (Chrome, Edge, Firefox)
- Internet connection สำหรับเข้าใช้งานเว็บไซต์

### 2.4 Constraints
- ใช้ Next.js Framework
- ใช้ localStorage แทน Database
- Deploy ผ่าน Vercel

---

## 3. Functional Requirements

### FR-1: Calculate BMI
ระบบต้องสามารถคำนวณค่า BMI จาก:
- ส่วนสูง (เซนติเมตร)
- น้ำหนัก (กิโลกรัม)

### FR-2: Display BMI Result
ระบบต้องแสดง:
- ค่า BMI (ทศนิยม 2 ตำแหน่ง)
- หมวดหมู่ BMI (Underweight / Normal / Overweight / Obese)

### FR-3: Save Log
ระบบต้องสามารถบันทึกข้อมูล:
- วันที่
- ส่วนสูง
- น้ำหนัก
- ค่า BMI
- หมายเหตุ (ถ้ามี)
ลงใน localStorage

### FR-4: View History
ระบบต้องแสดงรายการประวัติการบันทึกทั้งหมด

### FR-5: Export Data
ระบบต้องสามารถ Export ข้อมูลประวัติเป็นไฟล์ JSON

### FR-6: Import Data
ระบบต้องสามารถ Import ข้อมูล JSON เพื่อกู้คืนข้อมูลได้

---

## 4. Non-Functional Requirements

### NFR-1: Usability
- UI ต้องใช้งานง่าย
- รองรับภาษาไทย

### NFR-2: Performance
- หน้าเว็บต้องโหลดภายใน 3 วินาที

### NFR-3: Compatibility
- รองรับ Chrome และ Edge เวอร์ชันปัจจุบัน

### NFR-4: Reliability
- ข้อมูลต้องไม่สูญหายระหว่างการใช้งาน (ภายใน localStorage)

### NFR-5: Security
- ไม่มีการเก็บข้อมูลบน Server
- ข้อมูลอยู่ในเครื่องผู้ใช้เท่านั้น

---

## 5. System Architecture

- Frontend: Next.js (App Router)
- Styling: Tailwind CSS
- Storage: Browser localStorage
- Deployment: Vercel

---

## 6. Assumptions and Dependencies

- ผู้ใช้งานมี Web Browser ที่รองรับ JavaScript
- localStorage ของ Browser ทำงานปกติ
- มีการเชื่อมต่ออินเทอร์เน็ตเพื่อเข้าถึงเว็บไซต์

---

## 7. Future Enhancements

- เพิ่มระบบ Login
- เพิ่มการเก็บข้อมูลบน Cloud Database
- เพิ่มกราฟแสดงแนวโน้ม BMI

---

End of Document
