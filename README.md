# 🚀 SaaS Admin Dashboard

A full-stack admin dashboard built with Next.js, featuring role-based authentication, data visualization, and server-side pagination.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🔐 **Authentication & Authorization** - Secure login with role-based access control (Admin/User)
- 📊 **Data Visualization** - Interactive charts and KPI dashboards
- 📋 **Data Management** - Server-side paginated tables with filtering and sorting
- 📥 **CSV Export** - Download data in CSV format
- ⚡ **Performance Optimized** - Server-side rendering and efficient data caching
- 🎨 **Modern UI** - Responsive design with Tailwind CSS

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- TanStack Query (React Query)
- Recharts

**Backend:**
- Next.js API Routes
- Prisma ORM
- PostgreSQL (Supabase)

**Authentication:**
- NextAuth.js

**Deployment:**
- Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/saas-admin-dashboard.git
cd saas-admin-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run database migrations
```bash
npx prisma migrate dev
```

5. Seed the database (optional)
```bash
npm run seed
```

6. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure
```
saas-admin-dashboard/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Auth pages
│   └── components/        # React components
├── lib/                   # Utility functions
├── prisma/                # Database schema
└── public/                # Static assets
```

## 🚀 Deployment

This project is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/saas-admin-dashboard)

## 🧪 Testing
```bash
npm run test
```

## 📝 License

MIT License - feel free to use this project for learning or portfolio purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

**Built with ❤️ for learning and portfolio purposes**