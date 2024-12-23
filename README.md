# Next Blog CMS

## Description
**Next Blog CMS** is a simple content management system built with **Next.js App Router**, leveraging **TypeScript**, **NextAuth**, **bcrypt**, **yup**, and **tailwindcss**. This application serves both regular-user and admin with distinct functionalities:

- **Regular User**: View a list of articles and read article content.
- **Admin**: Create, read, update, and delete articles with enhanced authorization features.

The backend integrates **Railway** PostgreSQL and uses **Prisma** ORM for database management.

## Features
### Current Features
- **Regular User**:
  - View a list of articles.
  - Read article details.

- **Admin**:
  - Authorization-based access.
  - Create new articles.
  - View aritcle list.
  - Preview article details.
  - Update articles.
  - Delete articles.

### Future Enhancements
- Implement support for:
  - Article images.
  - Comments and replies.
  - Like functionality for articles and comments.
- Improved UI for better user experience.

## Tech Stack
- **Frontend & Backend**: Next.js (App Router)
- **Database**: PostgreSQL (via Railway.app)
- **ORM**: Prisma
- **Authentication**: NextAuth
- **Styling**: TailwindCSS
- **Validation**: Yup
- **Password Hashing**: bcrypt
- **Programming Language**: TypeScript

## Deployment
The app is deployed using **Vercel**.

### Demo
- [Home Page](https://next-blog-cms-shagara-nasutions-projects.vercel.app)
- [Dashboard Page](https://next-blog-cms-shagara-nasutions-projects.vercel.app/dashboard)

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- Node.js
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/shagaranasution/next-blog-cms.git
cd next-blog-cms
```

### Environment Variables
Create a `.env` file in the root directory and configure the following environment variables based on `.env.example`:
```env
DATABASE_URL=YOUR_DATABASE_CONNECTION_URL
NEXTAUTH_URL=YOUR_NEXTAUTH_URL
NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET
```

### Install Dependencies
```bash
npm install
```

### Set Up Database
Run the Prisma migrations to set up your database schema:
```bash
npx prisma migrate dev
```

### Run the App
To start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## Scripts
- **Start Development**: `npm run dev`
- **Build for Production**: `npm run build`
- **Start Production Server**: `npm run start`
- **Lint Code**: `npm run lint`
- **Generate Prisma Client**: `npx prisma generate`

## Acknowledgments
This project is inspired by my interest in learning fullstack development and exploring the use of Next.js, Next Auth and Prisma ORM.

## Contact
For any inquiries, feel free to reach me through [shagaranst@gmail.com](mailto:shagaranst@gmail.com).
