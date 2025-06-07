# EventEase - Event Management Made Simple

A comprehensive event planning and management tool built with Next.js, TypeScript, and modern web technologies.

## Live Demo

[View Live Demo](https://dhanu-event-easy.vercel.app/dashboard)

## 👥 Sample Credentials

For testing purposes, use the following sample credentials:

### Admin User
- **Email**: `admin@eventeasy.com`
- **Password**: `Admin@123`
- **Role**: ADMIN
- **Permissions**: Full system access, user management, all events, system configuration

### Staff User
- **Email**: `staff@eventeasy.com`
- **Password**: `Staff@123`
- **Role**: STAFF
- **Permissions**: Event and attendee management, moderate events

### Event Owner
- **Email**: `owner@eventeasy.com`
- **Password**: `Owner@123`
- **Role**: EVENT_OWNER
- **Permissions**: Create and manage personal events

> **Note**: These are sample credentials for testing. In production, ensure all users create their own secure passwords.

## ✨ Features

### Core Functionality
- **Authentication & Authorization**: Secure login with role-based access (Admin, Staff, Event Owner)
- **Event Management**: Create, edit, delete, and manage events with full CRUD operations
- **Public Event Discovery**: Browse all events on a dedicated public page with search and filtering
- **RSVP System**: Allow attendees to RSVP with name and email validation
- **CSV Export**: Export attendee lists for events in CSV format
- **User Management**: Admin panel for complete user lifecycle management
- **Profile Management**: Self-service profile and password management

### User Roles & Permissions
- **Admin**: Full system access including user management, all events, and system configuration
- **Staff**: Event and attendee management capabilities
- **Event Owner**: Create and manage personal events
- **Public Users**: View events and submit RSVPs without authentication

### Advanced Features
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Real-time Updates**: Dynamic dashboard with live event statistics
- **Search & Filter**: Advanced filtering by date, location, and event details
- **Animations**: Smooth UI transitions using Framer Motion
- **Security**: Comprehensive role-based access control and data protection

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: PostgreSQL (NeonTech)
- **ORM**: Prisma
- **Authentication**: NextAuth.js with Credentials Provider
- **Animations**: Framer Motion
- **Deployment**: Vercel
- **Runtime**: Node.js

## Project Structure

\`\`\`
eventeasy/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── register/         # User registration
│   │   │   └── [...nextauth]/    # NextAuth configuration
│   │   ├── events/               # Event management endpoints
│   │   │   ├── public/           # Public events API
│   │   │   └── [id]/             # Individual event operations
│   │   ├── users/                # User management endpoints (Admin only)
│   │   └── profile/              # User profile endpoints
│   ├── auth/                     # Authentication pages
│   │   ├── signin/               # Login page
│   │   └── signup/               # Registration page
│   ├── dashboard/                # Protected dashboard area
│   │   ├── events/               # Event management pages
│   │   │   ├── new/              # Create event page
│   │   │   └── [id]/edit/        # Edit event page
│   │   └── users/                # User management pages (Admin only)
│   ├── events/                   # Public events browsing
│   ├── event/[id]/               # Individual public event pages
│   ├── profile/                  # User profile management
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Global styles
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui components
│   ├── dashboard-content.tsx     # Dashboard main content
│   ├── event-form.tsx            # Event creation/editing form
│   ├── user-management.tsx       # Admin user management interface
│   ├── public-events-view.tsx    # Public events browsing component
│   ├── event-public-view.tsx     # Individual event public view
│   ├── profile-form.tsx          # User profile management form
│   └── footer.tsx                # Application footer
├── lib/                          # Utility functions and configurations
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client setup
│   └── utils.ts                  # Utility functions
├── prisma/                       # Database schema and migrations
│   └── schema.prisma             # Database schema definition
├── types/                        # TypeScript type definitions
│   └── next-auth.d.ts            # NextAuth type extensions
├── middleware.ts                 # Next.js middleware for route protection
├── tailwind.config.ts            # Tailwind CSS configuration
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
\`\`\`

##  Getting Started

### Prerequisites

- **Node.js**: Version 18+ or Bun
- **PostgreSQL Database**: NeonTech recommended (or any PostgreSQL instance)
- **Git**: For version control

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/eventeasy.git
   cd eventeasy
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   bun install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Fill in your environment variables:
   \`\`\`env
   # Database
   DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   \`\`\`

4. **Set up the database**
   \`\`\`bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   
   # (Optional) View database in Prisma Studio
   npx prisma studio
   \`\`\`

5. **Install shadcn/ui components**
   \`\`\`bash
   # Initialize shadcn/ui
   npx shadcn@latest init
   
   # Add required components
   npx shadcn@latest add button input label card form select textarea table badge alert dialog dropdown-menu toast tabs
   \`\`\`

6. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   bun dev
   \`\`\`

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)


## 🔌 API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "EVENT_OWNER"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "User created successfully",
  "userId": "user_id"
}
\`\`\`

#### POST `/api/auth/[...nextauth]`
NextAuth.js authentication endpoints for login/logout.

### Event Management Endpoints

#### GET `/api/events`
Fetch all events (authenticated users only).

#### POST `/api/events`
Create a new event (authenticated users only).

#### GET `/api/events/public`
Fetch all events for public viewing with optional filtering.

**Query Parameters:**
- `search` (optional): Search term for title, description, location, or organizer
- `filter` (optional): Time filter - 'upcoming', 'past', or 'all'
- `sort` (optional): Sort order - 'date', 'title', or 'rsvps'
- `limit` (optional): Maximum number of events to return

#### GET `/api/events/[id]`
Fetch a specific event by ID.

#### PUT `/api/events/[id]`
Update an event (owner, staff, or admin only).

#### DELETE `/api/events/[id]`
Delete an event (owner, staff, or admin only).

#### POST `/api/events/[id]/rsvp`
Submit an RSVP for an event.

#### GET `/api/events/[id]/export`
Export event RSVPs as CSV (authenticated event owners only).

### User Management Endpoints (Admin Only)

#### GET `/api/users`
Fetch all users (admin only).

#### POST `/api/users`
Create a new user (admin only).

#### PUT `/api/users/[id]`
Update user details (admin only).

#### DELETE `/api/users/[id]`
Delete a user (admin only).

#### PUT `/api/users/[id]/role`
Update user role (admin only).

#### PUT `/api/users/[id]/password`
Reset user password (admin only).

### Profile Management Endpoints

#### PUT `/api/profile`
Update own profile information.

#### PUT `/api/profile/password`
Change own password.

## 🔒 Security Features

- **Role-based Access Control**: Comprehensive permission system
- **Password Hashing**: Secure bcrypt password storage
- **Session Management**: Secure JWT-based sessions with NextAuth.js
- **Input Validation**: Server-side validation for all inputs
- **CSRF Protection**: Built-in protection via NextAuth.js
- **SQL Injection Prevention**: Prisma ORM provides automatic protection


### Sample Test Flow

1. **Public Event Discovery**
   - Visit `/events` to browse all events
   - Test search functionality with various terms
   - Try different filters (upcoming, past, this week)
   - Click on events to view detailed pages

1. **Public Event-specific Discovery**
   - Visit `/event/:eventid` to view detailed information about a specific event
   - Check event details: title, date, time, location, description, and organizer info
   - Fill out the attendance form to register for the event
   - After submission, verify that the attendee count increases
   - Reload the page to ensure the updated count persists

2. **User Registration & Authentication**
   - Register a new account at `/auth/signup`
   - Test login functionality at `/auth/signin`
   - Verify role-based dashboard access

3. **Event Management**
   - Create a new event in the dashboard
   - Edit event details and verify changes
   - Test public event page functionality
   - Submit RSVPs and verify data

4. **Admin Functionality** (if admin role)
   - Access user management at `/dashboard/users`
   - Create, edit, and manage user accounts
   - Test role changes and permissions

## 🔧 Development

### Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio
npm run db:generate  # Generate Prisma client
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or need help:

1. Check the [Issues](https://www.linkedin.com/in/dhanunjay-burada-908494241) page
2. Create a new issue with detailed information

## 👨‍💻 Developer

**Dhanunjay Burada**
- LinkedIn: [Dhanunjay Burada](https://www.linkedin.com/in/dhanunjay-burada-908494241)
- GitHub: [@dhanunjayburada](https://github.com/DHANUNJAY965)
- Email:dhanunjayburada6@gmail.com

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.

**EventEase** - Making event management simple, efficient, and accessible for everyone.
