<<<<<<< HEAD
# CampusFlow - Campus Event Management System

A production-grade, multi-tenant campus event management and budgeting platform built with NestJS and React Native.

## 🚀 Features

- **Multi-tenant Architecture**: Support for multiple universities/colleges
- **Role-Based Access Control**: SUPER_ADMIN, ADMIN, FACULTY, ORGANIZER, STUDENT, ALUMNI
- **Event Management**: Complete event lifecycle from draft to completion
- **Budget Management**: Real-time budget locking, allocation, and tracking
- **QR Code Ticketing**: Cryptographic QR codes for event check-in
- **Academic Hierarchy**: College → Department → Course → Specialization → Batch → Division
- **Event Targeting**: Constraint-based event eligibility for students
- **Audit Logging**: Complete audit trail for all actions
- **Notifications**: Real-time user notifications

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS (Node.js + TypeScript)
- **Database**: PostgreSQL 16
- **ORM**: Prisma
- **Cache**: Redis 7
- **Authentication**: JWT with Passport
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React Native with Expo
- **Navigation**: Expo Router (File-based routing)
- **State**: React Context API
- **HTTP Client**: Axios
- **QR Codes**: react-native-qrcode-svg

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Package Manager**: Bun

## 📋 Prerequisites

- Docker & Docker Compose
- Bun (JavaScript runtime)
- Node.js 18+

## 🏗️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd campusflow
```

### 2. Start the development environment

```bash
chmod +x start-dev.sh
./start-dev.sh
```

This script will:
- Start PostgreSQL and Redis containers
- Install all dependencies
- Generate Prisma client
- Run database migrations
- Start the backend API (port 3000)
- Start the frontend web app (port 8081)

### 3. Manual Setup (Alternative)

```bash
# Start database services
docker-compose up -d

# Install backend dependencies
cd backend
bun install
bunx prisma generate
bunx prisma migrate dev

# Install frontend dependencies
cd ../frontend
bun install

# Start backend
cd ../backend
bun run start:dev

# Start frontend (in new terminal)
cd ../frontend
bun run web
```

## 📚 API Documentation

Once the backend is running, access the Swagger documentation at:
```
http://localhost:3000/api/docs
```

## 🗄️ Database

### Access Prisma Studio

```bash
cd backend
bunx prisma studio
```

Opens at: http://localhost:5555

### Database Schema

The system includes the following main entities:
- **Tenant**: Multi-tenant organization (university/college)
- **User**: All user types with role-based access
- **Unit**: Organizational units (clubs, departments, committees)
- **Event**: Campus events with budget and constraints
- **Participation**: Event registrations with QR tokens
- **College/Category/Course/Specialization/Batch/Division**: Academic hierarchy

## 🔐 Default Credentials

After seeding the database, use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@campus.com | password |
| Admin | admin@campus.com | password |
| Faculty | faculty@campus.com | password |
| Organizer | organizer@campus.com | password |
| Student | student@campus.com | password |

## 📱 Mobile App

### Running on iOS Simulator

```bash
cd frontend
bun run ios
```

### Running on Android Emulator

```bash
cd frontend
bun run android
```

### Running on Physical Device

1. Install Expo Go app on your device
2. Scan the QR code from the terminal

## 🏛️ Architecture

### Backend Structure

```
backend/src/
├── modules/          # Feature modules
│   ├── auth/        # Authentication & authorization
│   ├── users/       # User management
│   ├── tenants/     # Multi-tenant management
│   ├── units/       # Organizational units
│   ├── events/      # Event management
│   ├── participations/  # Event registrations
│   ├── notifications/   # User notifications
│   └── audit/       # Audit logging
├── guards/          # Auth & role guards
├── interceptors/    # Request/response transformers
├── filters/         # Exception filters
├── decorators/      # Custom decorators
├── prisma/          # Prisma service
└── redis/           # Redis service
```

### Frontend Structure

```
frontend/app/
├── (tabs)/          # Student tab navigation
│   ├── events/     # Event browser
│   ├── clubs/      # Clubs directory
│   ├── bookings/   # User registrations
│   └── profile/    # User profile
├── organizer/       # Organizer role screens
├── admin/          # Admin role screens
├── superadmin/     # Super admin screens
├── login/          # Authentication
└── context/        # React context providers
```

## 🔑 Key Features

### Budget Management

Real-time budget locking and deduction using Prisma transactions:

1. **Event Creation**: Locks requested budget amount
2. **Event Approval**: Converts locked budget to spent budget
3. **Event Rejection**: Releases locked budget back

### Event Constraints

Constraint-based targeting system for event eligibility:

- College-level constraints
- Program category constraints
- Course-level constraints
- Specialization constraints
- Batch constraints
- Division constraints

### QR Code Check-in

Cryptographic QR code generation and validation:

1. **Registration**: Generates unique QR token
2. **Ticket Display**: Shows QR code in user's bookings
3. **Check-in**: Organizer scans and validates attendance

## 📝 Development

### Running Tests

```bash
cd backend
bun run test
```

### Type Checking

```bash
bun run typecheck
```

### Linting

```bash
cd backend
bun run lint

cd ../frontend
bun run lint
```

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 8081
lsof -ti:8081 | xargs kill -9
```

### Database Connection Issues

```bash
# Restart Docker containers
docker-compose down
docker-compose up -d

# Reset database
cd backend
bunx prisma migrate reset
```

## 📄 License

MIT

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
=======
# campusflow
-
>>>>>>> 40c092d18802a8b030940b77e36fa3a0815f9d34
