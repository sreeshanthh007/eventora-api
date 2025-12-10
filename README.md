# 🚀 Eventora API – Event Booking & Vendor Management Platform

Eventora is a modern **Event Management & Vendor Booking** backend built with **Node.js, TypeScript, Express, MongoDB**, and **Clean Architecture**.
It handles user/vendor authentication, event bookings, wallet/transactions (if added), real‑time updates, OTP flows, and QR‑based ticket check‑ins.

---

## ✨ Features

### 🔹 Client Side

* 🎉 Browse **events** and **vendor services**
* 🎫 Book **event tickets**
* 🕒 Book **services based on availability slots**
* 🔐 JWT Authentication (Signup/Login)
* 🔁 Forgot Password + OTP Verification
* 👤 Manage Profile

### 🔹 Vendor Side

* 🛠️ Manage **events** & **services**
* 📅 Manage **availability** & **slot timings**
* 📄 View all bookings for their events/services
* 📲 **Scan & verify** event tickets (QR based)
* 📊 Vendor Dashboard (overview of bookings & stats)
* 👤 Manage Profile

### 🔹 Admin Side

* 👨‍💼 Manage **users & vendors**
* 📝 Manage **events & services**
* ✔️ Approve or reject vendors **in real-time**
* 🏷️ Manage event/service **categories**
* 💰 Dashboard for **earnings & analytics**
* 🔍 View all booked **services & events**

---

### 🔹 Vendor Side

* 🛠️ **Manage Events & Services** (create/update/delete)
* 📅 **Manage Service Availability** (slot timings, availability windows)
* 📖 **View All Bookings** (event & service bookings)
* 📊 **Vendor Dashboard** with key insights
* 📷 **Scan & Verify Event Tickets** (QR scanning)
* 👤 **Manage Profile**

---

### 🔹 Admin Side

* 👨‍💼 Manage Users & Vendors
* 📋 Manage Events
* 🔍 Approve or Reject Vendor Registrations
* 🚨 Handle Reports/Issues
* 📊 System Overview Dashboard (optional)

---

## 🏗️ Tech Stack

### **Backend**

* Node.js
* Express.js
* TypeScript
* MongoDB + Mongoose
* Redis (locking + caching)
* Socket.io (real‑time updates)
* JWT Authentication
* bcrypt (password hashing)

### **Architecture**

* Clean Architecture (Entities → Usecases → Adapters → Frameworks)
* Modular, scalable folder structure
* Dependency Injection (tsyringe)

### **Deployment**

* Docker
* Nginx (reverse proxy)
* AWS EC2 

---

## 📁 Folder Structure (Simplified)

```
src/
├─ entities/          # models, interfaces
├─ usecases/          # business logic
├─ interfaceAdapters/ # repositories, services
├─ frameworks/        # express, mongodb, redis, sockets
├─ shared/            # utils & constants
└─ app.ts           # entry point
```

