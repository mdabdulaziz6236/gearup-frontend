# 📸 GearUp — Peer-to-Peer Gear Rental Platform

**GearUp** is a modern, full-stack **peer-to-peer gear rental marketplace** built with **Next.js**. It connects photographers, filmmakers, content creators, and creative professionals with gear owners, making it easy to **rent professional equipment** or **earn from unused gear**.

---

## 🚀 Live Demo

🔗 **Live Website:** [https://gearup-frontend-one.vercel.app]

---

## 📸 Screenshots

> Add screenshots of your homepage, dashboard, gear details, and payment pages here.

<!-- Example:
![GearUp Homepage](./screenshots/home.png)
-->

---

## ✨ Features

### 👤 Role-Based Access Control (RBAC)

GearUp provides dedicated experiences for three different user roles.

#### 🛒 Customer / Renter

* 🔍 Browse and search cameras, lenses, and production equipment
* 📅 Book gears for specific rental dates
* 📦 Manage active rental orders
* 📜 View rental history
* 💳 Make secure payments
* ⭐ Rate and review rented gears

#### 📦 Provider / Gear Owner

* ➕ Add and list new gears
* 📸 Upload gear images
* 📝 Manage gear descriptions and pricing
* ✅ Accept or reject rental requests
* 📦 Manage gear inventory
* 📊 Track active rentals
* 💰 Track earnings and payment history

#### 🛡️ Admin

* 📊 View overall platform statistics
* 👥 Manage customers and providers
* 📦 Monitor all gear listings
* 💳 Monitor payments
* 📋 Manage rental transactions
* 🔐 Control platform access and permissions

---

## ⚡ Core Functionalities

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure login and registration
* Role-based authorization
* Protected dashboard routes
* Customer, Provider, and Admin permissions

### ⚙️ Server Actions

Uses **Next.js Server Actions** for secure and efficient server-side mutations such as:

* User registration
* Login
* Authentication-related operations
* Form submissions

### 🧭 Dynamic Routing

Built with the **Next.js App Router**, including:

* Dynamic routes
* Protected routes
* Search parameters
* Nested layouts
* Loading states
* Error handling

### ⏳ Suspense & Loading UI

Uses React `<Suspense>` boundaries and skeleton loaders to provide a smooth user experience while pages and data are loading.

### 💳 Payment Integration

Complete payment flow with dedicated success and cancellation pages:

* Payment processing
* Payment success handling
* Payment cancellation handling
* Rental payment tracking

### 📱 Responsive Design

Fully responsive interface designed for:

* 📱 Mobile
* 📟 Tablet
* 💻 Desktop

Built with **Tailwind CSS** and reusable UI components.

### 🔔 Toast Notifications

Uses **Sonner** to provide instant feedback for:

* Successful actions
* Errors
* Authentication events
* Booking operations
* Payment-related actions

---

## 🛠️ Tech Stack

| Technology             | Purpose                               |
| ---------------------- | ------------------------------------- |
| **Next.js 16**         | React framework & full-stack frontend |
| **React 19**           | UI development                        |
| **TypeScript**         | Type-safe development                 |
| **Tailwind CSS**       | Styling & responsive design           |
| **Shadcn UI**          | Reusable UI components                |
| **Lucide React**       | Icons                                 |
| **React Icons**        | Additional icons                      |
| **Sonner**             | Toast notifications                   |
| **React Fast Marquee** | Scrolling/marquee UI                  |
| **pnpm**               | Package management                    |

### 🔗 Technologies

* [Next.js](https://nextjs.org/)
* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Shadcn UI](https://ui.shadcn.com/)
* [Lucide React](https://lucide.dev/)
* [React Icons](https://react-icons.github.io/react-icons/)
* [pnpm](https://pnpm.io/)

---

## 📂 Project Structure

```text
gearup-frontend/
│
├── src/
│   │
│   ├── app/
│   │   ├── (public-group)/
│   │   │   ├── page.tsx
│   │   │   ├── about/
│   │   │   ├── how-it-works/
│   │   │   └── help/
│   │   │
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   ├── customer/
│   │   │   └── provider/
│   │   │
│   │   ├── gear/
│   │   │   └── [id]/
│   │   │
│   │   ├── payment-success/
│   │   ├── payment-cancelled/
│   │   │
│   │   ├── error.tsx
│   │   ├── global-error.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   └── ui/
│   │       └── ...shadcn components
│   │
│   ├── _actions/
│   │   └── authActions.ts
│   │
│   └── lib/
│       └── utils.ts
│
├── public/
│   └── images/
│
├── .env
├── .gitignore
├── components.json
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

# ⚙️ Getting Started

Follow the steps below to run GearUp locally.

## 📋 Prerequisites

Make sure you have the following installed:

* **Node.js 20+**
* **pnpm**
* Git

You can verify your installations:

```bash
node --version
pnpm --version
git --version
```

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/mdabdulaziz6236/gearup-frontend
```

Navigate into the project:

```bash
cd gearup-frontend
```

---

## 2️⃣ Install Dependencies

Using pnpm:

```bash
pnpm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```text
gearup-frontend/
├── src/
├── public/
├── .env
├── package.json
└── ...
```

Add the required environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/
```

> ⚠️ Add any other required environment variables used by your project.

**Never commit your `.env` file to GitHub.**

Make sure `.gitignore` contains:

```gitignore
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

---

## 4️⃣ Run the Development Server

Start the development server:

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

Open the URL in your browser.

---

## 5️⃣ Build for Production

Create an optimized production build:

```bash
pnpm build
```

If the build completes successfully, start the production server:

```bash
pnpm start
```

The production application will run on:

```text
http://localhost:3000
```

---

# 🔑 Environment Variables

| Variable              | Description          | Example                        |
| --------------------- | -------------------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api/` |

> Make sure the backend API is running before testing features that require server communication.

---

# 🔄 Application Flow

```text
                    ┌──────────────────┐
                    │      GearUp      │
                    │ Rental Platform  │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
         👤 Customer     📦 Provider     🛡️ Admin
              │              │              │
              ▼              ▼              ▼
         Browse Gear     Add Gear       Manage Users
              │              │              │
              ▼              ▼              ▼
         Book Gear       Manage Gear    Monitor Platform
              │              │              │
              ▼              ▼              ▼
           Payment       Rental Requests   Payments
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                      ⭐ Reviews & Ratings
```

---

# 🔐 Security

GearUp uses authentication and authorization mechanisms to protect user data and platform resources.

Key security features include:

* JWT-based authentication
* Role-based access control
* Protected dashboard routes
* Server-side authorization
* Secure API communication
* Environment-based secret management

---

# 📱 Responsive Experience

GearUp is designed to work across different screen sizes.

```text
📱 Mobile
   ↓
📟 Tablet
   ↓
💻 Laptop
   ↓
🖥️ Desktop
```

The UI adapts automatically using Tailwind CSS responsive utilities.

---

# 🧪 Development Commands

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm install` | Install dependencies     |
| `pnpm dev`     | Start development server |
| `pnpm build`   | Create production build  |
| `pnpm start`   | Start production server  |
| `pnpm lint`    | Run ESLint               |

---

# 🚀 Deployment

GearUp can be deployed using platforms such as **Vercel**.

Before deployment, make sure to:

1. Push the project to GitHub
2. Import the repository into your hosting platform
3. Configure production environment variables
4. Set the correct backend API URL
5. Run a production build
6. Deploy the application

### Production Environment Example

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api/
```

> Replace the example URL with your actual production backend URL.

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### Steps to contribute

```bash
# Fork the repository

# Clone your fork
git clone https://github.com/mdabdulaziz6236/gearup-frontend

# Create a new branch
git checkout -b feature/your-feature

# Install dependencies
pnpm install

# Start development
pnpm dev
```

After making your changes:

```bash
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

### Dev. AbdulAziz

**Full-Stack Developer | Student | Tech Enthusiast**

Built with ❤️ **Dev. AbdulAziz**.

---

## ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.

Your support motivates me to build more open-source projects! 🚀

---

### 📌 GearUp

> **Rent professional gear. Share your equipment. Create more. 🎥📸**
