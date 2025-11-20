🎪 Eventora Backend
Event Management & Vendor Booking Platform – Server Side

A scalable, modular backend built with Node.js, TypeScript, Express, MongoDB, Redis, and Clean Architecture.
This service powers Eventora’s authentication, event booking, vendor system, admin dashboards, OTP flow, and real-time updates.

⚙️ Tech Stack
Category	Technologies
Language	TypeScript
Runtime	Node.js
Framework	Express.js
Database	MongoDB (Mongoose)
Cache / Temp Store	Redis
Auth	JWT, bcrypt
Architecture	Clean Architecture + DI (tsyringe)
Real-Time	Socket.io
Deployment	AWS EC2 (Ubuntu)
Containerization	Docker + Docker Compose
Reverse Proxy (optional)	Nginx
🏗️ Project Architecture (Clean Architecture)
src/
│
├── entities/                     # Domain Layer (pure business rules)
│   ├── controllerInterfaces/
│   ├── repositoryInterfaces/
│   ├── serviceInterfaces/
│   ├── useCaseInterfaces/
│   ├── socketHandlerInterfaces/
│   └── models/                   # Mongoose models
│
├── usecases/                     # Application Layer (business logic)
│
├── interfaceAdapters/            # Controllers, DI, presenters, mappers
│   ├── controllers/
│   ├── middlewares/
│   ├── di/
│   └── mappers/
│
├── frameworks/                   # Outer Layer (Express, DB, Redis)
│   ├── server/
│   ├── database/
│   ├── redis/
│   └── routes/
│
└── shared/                       # DTOs, utils, constants


Designed to keep your code scalable, testable, and clean, following SOLID & separation-of-concern principles.

🔐 Core Features
👥 User & Vendor Management

Signup / Login (email + password)

Google OAuth login

JWT authentication

Profile listing & updating

Admin controls for users & vendors

🔑 OTP & Security

OTP generation & resend using Redis

Secure expiry mechanism

Rate limiting

Password hashing with bcrypt

🎫 Event & Booking System

Create, update, list events

Vendor assignment

Slot generation

Live ticket availability

Booking management

🚀 Real-Time Features

Socket.io integration

Live ticket updates

Real-time vendor notifications

🧾 Admin Dashboard Support

Vendor verification

Client management

Event tracking

Analytics-ready API responses

📦 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourname/eventora-backend.git
cd eventora-backend

2️⃣ Install Dependencies
npm install

3️⃣ Add Environment Variables

Create a .env file:

PORT=3000
MONGO_URI=your_mongo_url
REDIS_URL=redis://redis:6379
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173

4️⃣ Start Development Server
npm run dev

5️⃣ Build for Production
npm run build


Start:

node dist/app.js

🐳 Docker Setup

Build and run using Docker Compose:

docker compose up -d --build


Your backend runs at:

http://localhost:3000

☁️ Deployment (AWS EC2)

Eventora Backend is deployed on:

Ubuntu EC2 Instance

Dockerized Application

Optional Nginx reverse proxy

Environment variables stored securely

Backend is live, stable, and ready for production.

🧪 API Testing

Use Postman or Thunder Client.
Collection available soon.

🛠️ Scripts
Command	Description
npm run dev	Run in dev mode with ts-node
npm run build	Compile TypeScript
npm start	Run compiled JS
npm run lint	ESLint checks
npm run format	Prettier formatting
📁 Conventions & Standards

The entire codebase follows:

TypeScript strict typing

ESLint + Prettier formatting

Clean Architecture structure

Proper naming conventions

Removed unnecessary logs, spaces, unused files

Production-ready folder organization

🏁 Status

✔ Backend Hosted on AWS EC2
✔ Dockerized & Production Ready
✔ Redis, MongoDB, Socket.io Working
✔ All bugs & deployment issues fixed
✔ Fully connected with S3 + CloudFront frontend

🤝 Contributions

Pull requests are welcome.
Follow Clean Architecture rules if contributing.

📜 License

MIT License.
