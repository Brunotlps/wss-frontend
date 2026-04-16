# NousFlow — Frontend

> A modern, theme-aware Vue 3 frontend for the NousFlow online learning platform.

[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Pinia](https://img.shields.io/badge/Pinia-2.x-F7D336?style=flat&logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Stripe](https://img.shields.io/badge/Stripe-JS-635BFF?style=flat&logo=stripe&logoColor=white)](https://stripe.com/)
[![Status](https://img.shields.io/badge/Status-In%20Active%20Development-yellow?style=flat)]()

---

## About the Project

**NousFlow** is a focused online learning platform built for small course creators who want a clean, community-driven alternative to mainstream course marketplaces. This repository is the frontend — a Vue 3 single-page application that consumes the [NousFlow backend API](https://github.com/Brunotlps/wss-backend-v0).

The project started from a real need: a couple of friends — *Dupla de Milheiros* — who teach personal finance and travel hacking with airline miles, wanted a platform to host their first paid course. What began as a single-tenant solution evolved into an independent platform with a long-term vision centered on **community and learning enhancement** — not just a video catalog.

The frontend covers the full student journey: browsing the course catalog, purchasing or enrolling for free, watching video lessons with progress tracking, and downloading PDF certificates upon completion.

---

## Project Status

🚧 **In active development** — Sprints 0–6 complete, Sprint 7 (backend-dependent features) pending.

### What's done

- JWT authentication with automatic silent token refresh and concurrent refresh lock
- Public course catalog with client-side search and difficulty filters
- Course detail page with difficulty badge, lesson list, and adaptive CTA (paid vs. free)
- Stripe Elements checkout with payment intent flow and enrollment polling
- Direct free-course enrollment via `POST /api/enrollments/` (no payment flow)
- Student dashboard with enrollment progress cards and inactive enrollment filtering
- Full-screen video player with HTML5 `<video>`, sidebar lesson list, and mobile collapsible list
- Video progress tracking with debounced PATCH calls and resume-from-position on re-open
- Certificates page with PDF download and revoked badge
- Dark/light theme toggle with chalkboard aesthetic (default dark) persisted to `localStorage`
- Responsive layout with sticky footer, mobile-first breakpoints
- Backend health check on boot with offline warning banner
- "About" page, global footer, `NotFoundView` with routing

### What's next

- 🟡 **PDF lesson viewer** — pending `pdf_file` field on the backend lessons endpoint
- 🟡 **Lesson supplementary materials** — pending `attachments[]` field on backend
- 🟡 **Instructor dashboard** — out of MVP scope, planned for a future version
- 🟡 **Community tab** — discussions and Q&A per course, long-term roadmap

---

## Tech Stack

**Framework & Build**
- Vue 3 (Composition API, `<script setup>`)
- Vite 8 (bundler)
- JavaScript — no TypeScript (explicit project decision)

**Routing & State**
- Vue Router 4 (with `requiresAuth` and `guestOnly` navigation guards)
- Pinia (stores: `auth`, `courses`)

**Styling**
- Tailwind CSS v4 — configured via `@theme` and `@custom-variant` in CSS (no `tailwind.config.js`)
- Custom `chalk-*` (dark chalkboard) and `pastel-*` (light) color tokens
- Dark mode via `.dark` class strategy on `<html>`

**HTTP & Auth**
- Axios with request interceptor (Bearer token injection) and response interceptor (401 → refresh → retry, with concurrent refresh lock)
- Tokens stored in `localStorage` as `wss_access_token` / `wss_refresh_token`

**Forms & Validation**
- VeeValidate 4 + Yup (declarative schema validation)

**Payments**
- `@stripe/stripe-js` — Stripe Elements card form, `confirmCardPayment` flow

**Notifications**
- `vue-sonner` — lightweight toast feedback

---

## Architecture Overview

The project follows a layered structure where views orchestrate stores and services, and components stay presentation-only.

```
wss-frontend/
├── public/
│   └── favicon.ico
└── src/
    ├── assets/
    │   └── main.css              # Tailwind v4 @import, @custom-variant dark, @theme tokens
    ├── components/
    │   ├── ui/                   # AppButton, AppInput (theme-aware, reusable primitives)
    │   ├── layout/               # AppHeader, AppFooter, PageWrapper
    │   ├── course/               # CourseCard, CourseCardSkeleton, CourseProgress, LessonItem
    │   └── certificate/          # CertificateCard
    ├── composables/
    │   ├── useTheme.js           # Singleton dark/light toggle, persisted to localStorage
    │   └── useVideoProgress.js   # Video progress tracking (GET/POST/PATCH /api/progress/)
    ├── services/                 # Pure HTTP — no UI logic
    │   ├── api.js                # Axios instance + JWT interceptors + refresh lock
    │   ├── authService.js
    │   ├── courseService.js
    │   ├── enrollmentService.js
    │   ├── lessonService.js
    │   ├── paymentService.js
    │   ├── progressService.js
    │   └── certificateService.js
    ├── stores/
    │   ├── auth.js               # User state, login/logout/initializeAuth
    │   └── courses.js            # Course list and current course cache
    ├── utils/
    │   ├── formatters.js         # formatCurrency, formatCents, formatDuration
    │   └── errors.js             # parseDRFError, extractFieldErrors
    ├── views/
    │   ├── about/AboutView.vue
    │   ├── auth/                 # LoginView, RegisterView
    │   ├── certificates/         # CertificatesView
    │   ├── checkout/             # CheckoutView (Stripe flow + polling)
    │   ├── courses/              # CourseListView (with filters), CourseDetailView
    │   ├── learn/                # DashboardView, PlayerView
    │   └── NotFoundView.vue
    ├── router/index.js           # Routes, requiresAuth/guestOnly/hideFooter guards
    ├── App.vue                   # Root: health check, theme init, footer guard
    └── main.js
```

**Design principles applied:**

- **Services** are pure HTTP wrappers — no UI state, no error formatting, just raw responses.
- **Stores** hold derived domain state and expose actions; views react to store state.
- **Composables** encapsulate stateful logic shared across views (theme singleton, video progress lifecycle).
- **Components** receive data via props and emit events — no store access except layout components.
- **Error handling** is centralized in `parseDRFError` / `extractFieldErrors` utilities consumed by views and stores.
- **Dark mode** uses a single `.dark` class on `<html>` toggled by `useTheme`, with every component carrying both `text-gray-*` (light) and `dark:text-chalk-*` variants.

---

## Technical Highlights

### Singleton theme composable
`useTheme.js` uses a module-level `ref` — not component-level — so all components share the same reactive `isDark` state without a store. A `watch({ immediate: true })` applies the `.dark` class on `<html>` synchronously before first render, preventing a flash of wrong theme.

### Concurrent JWT refresh lock
The Axios response interceptor implements a `isRefreshing` flag and a `pendingQueue` of promises. When a 401 triggers a refresh, subsequent requests queue up instead of each firing their own refresh call. Once the refresh resolves, the queue is flushed with the new token.

### Stripe Elements with polling fallback
The checkout flow uses `stripe.confirmCardPayment()` client-side and then polls `GET /api/enrollments/` every 2 seconds (up to 25 attempts / 50s) waiting for the backend webhook to create the enrollment. If polling times out, a friendly message is shown with a link to the dashboard — the user isn't left in an ambiguous state.

### Free course enrollment
Courses with `price == "0.00"` bypass the Stripe flow entirely. The CTA changes to "Matricular-se gratuitamente" and calls `POST /api/enrollments/ { course_id }` directly. The backend handles the price check and the enrollment is synchronous — no polling needed, redirect to the player happens immediately.

### Video progress composable
`useVideoProgress.js` manages the full lifecycle per lesson: GET existing progress on load, POST to create if none exists (respecting the `unique_together` constraint), debounced PATCH on `timeupdate`, and a final PATCH with `completed: true` on the `ended` event. On re-opening a lesson, `currentTime` is restored from `watched_duration`.

### Client-side course filtering
The catalog filters (text search + difficulty pills) operate on the already-fetched `store.courses` array via a `computed()`. For MVP catalog sizes this is instant and requires no backend query parameter support. The architecture is compatible with a future server-side upgrade — the filter logic would simply move into the service call.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Running locally

```bash
# Clone the repository
git clone https://github.com/Brunotlps/wss-frontend-v0.git
cd wss-frontend-v0/wss-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your local values:
#   VITE_API_BASE_URL=http://localhost:8000
#   VITE_STRIPE_PUBLIC_KEY=pk_test_...

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/`.

> The backend must be running separately. See [wss-backend-v0](https://github.com/Brunotlps/wss-backend-v0) for setup instructions.

### Building for production

```bash
npm run build
# Output in dist/
```

### Environment variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the Django backend API (e.g. `https://api.nousflow.com`) |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe publishable key (`pk_test_...` for development) |

> Never commit `.env.local`. The `VITE_` prefix is required by Vite to expose variables to the browser bundle.

---

## Roadmap

### Short term
- PDF lesson viewer (pending backend `pdf_file` field)
- Lesson supplementary materials / attachments
- First production deploy alongside the backend

### Medium term
- Private beta with *Dupla de Milheiros* as the first real instructors
- Public launch with companion ebook

### Long term
- **Course community tab** — discussions and Q&A tied to each lesson
- **Live classes** — real-time sessions with students
- **Instructor dashboard** — analytics, student progress, content management
- Multi-instructor platform with a strong focus on **community and learning outcomes**, rather than catalog volume

---

## About the Author

Built and maintained by **Bruno Teixeira Lopes** — a developer from Brazil focused on building real, maintainable systems. NousFlow is the project where full-stack engineering meets a real product vision: from Django signals and Celery tasks on the backend, to Vue composables and Stripe flows on the frontend.

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/Brunotlps)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/brunotlps)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:brunoteixlps@gmail.com)

---

⭐ *This is an active learning and engineering project. Feedback, ideas, and questions are welcome — open an issue or reach out directly.*

---

## License

This project is licensed under the [MIT License](LICENSE).
