# MeetSlot

## Meeting room booking, without the back-and-forth

MeetSlot is a full-stack meeting room booking platform designed for teams that need a clear, dependable way to find space and keep schedules in sync. Employees can see room availability and reserve time in a few steps, while administrators get the tools to manage rooms, bookings, users, and usage data from one place.

This project was built as a portfolio piece to explore the full product surface of a workplace SaaS application: a responsive booking experience, passwordless authentication, conflict-safe scheduling, and a role-aware administration area.

**Public preview:** [View MeetSlot](https://www.meetslot-ck.vercel.app)

## Product Highlights

### For employees

- Browse rooms and inspect availability on an interactive timeline
- Reserve 30-minute time slots without double-booking a room
- View upcoming and past meetings in a personal meetings area
- Sign in with a one-time email passcode instead of managing another password
- Use layouts adapted for both desktop and mobile workflows

### For administrators

- Monitor booking, room, and user metrics from a dashboard
- Create, edit, and remove meeting rooms with capacity information
- Review and manage bookings across the organization
- Manage employee accounts and access roles
- Follow recent activity and room utilization patterns

## What I Built

### Conflict-safe scheduling

The booking flow combines date-range queries with MongoDB indexes to detect overlapping reservations before they are created. The interface exposes availability in 30-minute increments, making the scheduling decision easy to scan while the API and database enforce the underlying constraint.

### Passwordless authentication

MeetSlot uses email OTP verification and JWT-based sessions. Tokens are stored in secure HTTP-only cookies, with expiration controls for both sessions and one-time codes. Role-aware protected routes keep employee and administrator experiences appropriately separated.

### Responsive interaction design

The interface changes its interaction model based on screen size. Desktop users work with modals and full panels, while mobile users get bottom sheets and a compact navigation pattern that keeps booking actions close at hand.

### Modular full-stack architecture

The React client is organized around reusable components and custom hooks for availability, bookings, and viewport behavior. The Express API separates routes, controllers, middleware, models, and utility logic so the core booking rules remain easy to extend.

## Technology

| Layer            | Tools                                                                   |
| ---------------- | ----------------------------------------------------------------------- |
| Frontend         | React 19, React Router, Vite, Tailwind CSS, Axios, Motion, Lucide React |
| Backend          | Node.js, Express 5, MongoDB, Mongoose                                   |
| Authentication   | Email OTP, JWT, HTTP-only cookies, bcryptjs                             |
| Supporting tools | Nodemailer, ESLint, Prettier, Nodemon                                   |

## Architecture At A Glance

```text
client/
  src/
    components/    Shared booking, navigation, and admin UI
    pages/         Employee, authentication, and admin screens
    hooks/         Availability, booking, and responsive behavior
    context/       Authentication state
    api/           Axios client configuration

server/
  routes/          Authentication, booking, user, and admin endpoints
  controllers/     Request-level business logic
  models/          User, Room, and Booking schemas
  middleware/      Authentication and authorization middleware
  utils/           Conflict detection and email delivery
```

## Author

**Sabeeh**

Full-stack developer focused on building thoughtful, reliable web products with React, Node.js, and modern data-driven interfaces.
