#  Explore Tamil Nadu

<p align="center">
  <b>A Full-Stack Tourism Booking Platform for Exploring Tamil Nadu</b>
</p>

<p align="center">
  Discover destinations, book attractions, hotels and transportation, and manage your complete trip in one place.
</p>

---

## 🌐 Live Demo

🔗 **Live Website:**  
https://explore-tamil-nadu.vercel.app/

---

## 📖 About the Project

**Explore Tamil Nadu** is a full-stack tourism booking platform designed to help users discover and plan trips across Tamil Nadu.

Users can explore different destinations, view tourist attractions, select multiple places, reserve hotels and transportation, calculate the complete trip cost, make payments, and view their booking history.

The application also provides user authentication, wishlist functionality, email notifications and downloadable booking tickets.

---

## ✨ Features

### 🔐 User Authentication
- User registration
- User login
- JWT-based authentication
- Password hashing using bcrypt
- Protected booking APIs
- User profile

### 🗺️ Explore Destinations
- Browse Tamil Nadu destinations
- Destination details
- Tourist attraction information
- Ratings and descriptions
- Google Maps integration

### 🎟️ Attraction Booking
- Select tourist attractions
- Choose visit date
- Select number of tickets
- Automatic ticket price calculation
- Add multiple attractions to one trip

### 🏨 Hotel Booking
- Browse recommended hotels
- Select check-in and check-out dates
- Select number of guests
- Select number of rooms
- Automatic night calculation
- Automatic hotel cost calculation

### 🚗 Transportation
- Select transportation type
- Choose pickup and return dates
- Select passengers
- Automatic rental cost calculation

### 🧳 Trip Management
- Combine multiple attractions
- Add hotel
- Add transportation
- View complete trip summary
- Automatic subtotal calculation
- GST calculation
- Service charge calculation
- Grand total calculation

### 💳 Payment
- Payment processing
- Payment verification
- Booking confirmation

### 📋 Booking History
- View previous bookings
- Booking ID
- Destination
- All booked attractions
- Hotel
- Transportation
- Amount paid
- Booking date

### ❤️ Wishlist
- Add destinations to wishlist
- Prevent duplicate wishlist entries

### 📧 Email Notifications
- Welcome email
- Login notification
- Booking confirmation
- Booking details through email

### 📄 Ticket Generation
- Download booking ticket
- Booking details included
- Customer details
- Destination
- Attractions
- Hotel
- Transportation
- Amount paid
- Payment information

### 🌙 UI Features
- Responsive design
- Bootstrap 5
- Dark mode
- Interactive booking modals
- Mobile-friendly interface

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- LocalStorage

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer

### APIs & Services

- Google Maps
- Razorpay
- Gmail SMTP

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Frontend        │
                    │ HTML / CSS / JS     │
                    │    Bootstrap        │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Express        │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
          ┌──────────┐   ┌──────────┐   ┌──────────┐
          │ MongoDB  │   │Razorpay  │   │Nodemailer│
          │ Database │   │ Payment  │   │  Email   │
          └──────────┘   └──────────┘   └──────────┘
