# 🚀 StacX - Study Smarter with India's #1 Student Platform

![Banner](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop)

> **Connecting 100,000+ Students | 100+ Resources | 100% Verified Content**

## 📚 What is StacX?

StacX is a **revolutionary educational ecosystem** designed specifically for Indian college and university students. It's not just another resource-sharing platform—it's a complete community-driven solution where knowledge meets collaboration, and learning becomes **fun and accessible**.

Whether you're a first-year student struggling with concepts or a final-year student sharing your expertise, StacX is your **one-stop destination** for academic excellence.

---

## ✨ Key Features

### 🎓 **Comprehensive Notes & Resources**
- Access semester-wise notes from top performers
- Filter by course, semester, and subject
- All resources verified by top students and faculty
- Previous Year Questions (PYQs) for better exam prep
- Assignments and study materials in one place

### 💬 **Real-time Community Chat**
- **Live socket.io powered chat** with instant messaging
- Connect with peers across India
- Ask doubts and get instant help
- Share images and PDFs directly in chat
- See who's online in real-time with connection status

### 🔍 **Smart Discovery**
- Intelligent search and filtering system
- Browse by course → semester → subject
- Find exactly what you need in seconds
- Track downloads and resource popularity

### 📤 **One-Click Resource Sharing**
- Upload notes, assignments, and PYQs
- Cloudinary integration for secure file storage
- Simple modal-based upload experience
- Verification system to ensure quality content

### 📊 **Personal Dashboard**
- Track your requests and contributions
- Manage uploaded resources
- Notification system for new responses
- User profile with reputation system

### 🔐 **Secure & Verified**
- JWT authentication with secure tokens
- Role-based access control (Student, Faculty, Admin)
- Rate limiting to prevent spam
- Password encryption with bcrypt
- Admin dashboard for content moderation

---

## 🏗️ Tech Stack

### **Frontend** ⚡
- **React 19** - Modern UI with latest features
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4.3** - Beautiful, responsive styling
- **React Router DOM 7** - Client-side routing
- **Socket.io Client** - Real-time chat communication
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

### **Backend** 🔥
- **Node.js & Express 5** - Robust server framework
- **Socket.io 4.8** - Real-time bidirectional communication
- **MongoDB & Mongoose 9** - Flexible data storage
- **JWT Authentication** - Secure user sessions
- **Bcrypt** - Password hashing
- **Cloudinary** - Cloud storage for files
- **Multer** - File upload handling
- **Morgan** - HTTP request logging
- **Helmet** - Security headers
- **Express Rate Limit** - API rate limiting
- **Zod** - Data validation
- **Day.js** - Date formatting

---

## 📱 Features in Detail

### 🏠 **Home Page**
Beautiful landing page with:
- Hero section highlighting key benefits
- Animated statistics counters
- Feature cards showcasing 6 core functionalities
- Testimonials from real users
- About section with community highlights
- CTAs for "Request Resources" and "Explore Resources"

### 📚 **Resources Hub**
- **Multi-level navigation**: Courses → Semesters → Subjects → Resources
- **Resource types**: Notes, PYQs, Assignments
- **Download tracking**: See how many times a resource was downloaded
- **Verification badges**: Know which resources are faculty-verified
- **Quick upload button**: Add resources floating on the screen

### 💬 **Live Community Chat**
- **Real-time messaging** with Socket.io
- **File sharing**: Upload images and PDFs
- **Message history**: Load previous messages on scroll
- **Sender information**: Know who's chatting with you
- **Connection status**: See if you're connected to the server
- **Responsive design**: Works perfectly on mobile and desktop

### 🔔 **Notifications**
- Get notified when someone responds to your request
- Real-time updates for new messages
- Request status changes

### 👤 **User Profile**
- Edit profile information
- View your uploaded resources
- Track your contributions
- Manage settings

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18+)
- **npm** or **yarn**
- **MongoDB** connection
- **Cloudinary** account for file uploads

### Installation

```bash
# Clone the repository
git clone https://github.com/SaranshPrasad/StacX.git
cd StacX

# Backend Setup
cd backend
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev

# Frontend Setup (in a new terminal)
cd frontend
npm install
cp .env.example .env
# Update .env with your API URL
npm run dev
