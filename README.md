# Elon Physio Clinic

![Home Screenshot](./public/images/home-screenshot.png)

**Elon Physio Clinic** is a professional website for a physiotherapy clinic, providing information about services, the team, blog posts, and appointment booking.

## Demo

Check the live site: [https://physiotherapy-clinic-lemon.vercel.app/es](https://physiotherapy-clinic-lemon.vercel.app/es)

## Features

- Responsive landing page for a physiotherapy clinic  
- Services section with detailed descriptions  
- Team section showcasing professionals  
- Blog for health and therapy articles  
- Appointment booking link  
- Multi-language support  

### User Roles & Functionality

- **Admin:** Full access to create posts, manage users, and assign roles  
- **User (non-admin):** Can create posts but cannot manage users 

### Example Credentials

- **Admin User:**  
  - Email: `admin@elonphysio.com`  
  - Password: `123456789`  

- **Non-Admin User:**  
  - Email: `worker@elonphysio.com`  
  - Password: `123456789` 

### Databases

The application uses **PostgreSQL** with the following tables:  

- `users` — Stores user information and roles  
- `posts` — Stores blog posts and content  
- `contact_messages` — Stores messages submitted through the contact form 

## Technologies

- **Framework:** Next.js  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS  
- **Database:** PostgreSQL  
- **Deployment:** Vercel    
