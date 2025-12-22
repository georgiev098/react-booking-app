# React Booking App

A modern, booking application built with **React**, **Vite**, and **Supabase**.  
Users can browse cabins, create and manage bookings, update profile information.

---

## Features

- **User Authentication**
  - Secure login & sign-up  
  - Protected routes and persisted sessions  

- **Cabin Explorer**
  - Browse all available cabins  
  - View photos, capacity, price, regular price vs. discounts  
  - Filter and sort options  

- **Booking System**
  - Price calculation  
  - View upcoming and past stays  

- **User Dashboard**
  - Update profile information and avatar  
  - Manage all reservations  
---

## Tech Stack

### Frontend
- [React](https://reactjs.org/)  
- [React Router](https://reactrouter.com/)  
- [React Query](https://react-query.tanstack.com/)  
- [Vite](https://vitejs.dev/)  

### Backend
- [Supabase](https://supabase.io/) (PostgreSQL, Storage, Auth)
---

##  Installation

Clone the repository:

```bash
git clone https://github.com/your-username/react-booking-app.git
cd react-booking-app
```
Install dependencies:

```bash
npm install
```

Create a .env file:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
Start the development server:

```bash
npm run dev
```
## Database Overview
The application uses Supabase as its backend, which provides a PostgreSQL database. The main tables include:
- **cabins** with details about each cabin. (id, name, maxCapacity, regularPrice, discount, description, image)
- **bookings** to store user reservations. (id, userId, cabinId, startDate, endDate, totalPrice)
- **users** to manage user profiles. (id, email, name, avatarUrl)

## Live Demo
A live demo of the application is available at: [Here](https://react-booking-app-seven.vercel.app/dashboard)
You can use the following test credentials to log in:
- Email: yarow99009@gamintor.com
- Password: 12345678