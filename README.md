# Dashboard Task

A modern Next.js dashboard application with feature-based architecture inspired by professional project structures.

## 🏗️ Architecture

This project follows a **feature-based architecture** with clear separation of concerns:

```
dashboard-task/
├── app/                    # Next.js App Router
│   ├── login/             # Login page
│   ├── dashboard/         # Dashboard routes
│   │   ├── layout.tsx    # Dashboard layout with sidebar & header
│   │   ├── page.tsx      # Dashboard home
│   │   ├── users/        # Users management
│   │   └── products/     # Products management
│   ├── layout.tsx        # Root layout with ChakraProvider
│   └── page.tsx          # Home (redirects to login)
├── features/              # Feature modules
│   ├── login/            # Login feature
│   ├── dashboard/        # Dashboard feature
│   │   ├── index.tsx    # Main component
│   │   └── components/  # Feature components
│   ├── users/           # Users feature
│   └── products/        # Products feature
├── shared/               # Shared resources
│   ├── components/      # Reusable components
│   │   └── AuthGuard.tsx
│   ├── services/        # API services
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   └── productService.ts
│   ├── types/           # TypeScript types
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   └── product.ts
│   ├── hooks/           # Custom hooks
│   │   └── useAuth.ts
│   ├── lib/             # Utilities
│   │   ├── apiClient.ts
│   │   └── apiConfig.ts
│   ├── layout/          # Layout components
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   └── providers/       # Context providers
│       └── ChakraProvider.tsx
```

## ✨ Features

- ✅ Feature-based architecture
- ✅ TypeScript strict mode
- ✅ Chakra UI v3 for all components
- ✅ Authentication with DummyJSON API
- ✅ Protected routes with AuthGuard
- ✅ API client with Next.js caching
- ✅ Server Components with Suspense
- ✅ Barrel exports for clean imports
- ✅ Path aliases (@/shared, @/features)
- ✅ Users management
- ✅ Products management
- ✅ Responsive design

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Copy environment variables:
```bash
cp .env.local.example .env.local
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## 🔐 Test Credentials

Use these credentials to login:
- **Username:** `emilys`
- **Password:** `emilyspass`

## 📁 Key Concepts

### Feature-Based Structure

Each feature is self-contained with:
- `index.tsx` - Main feature component (Server Component)
- `components/` - Feature-specific components
- `components/index.tsx` - Barrel export with Skeleton

### Shared Resources

- **services/** - API integration layer
- **types/** - TypeScript definitions
- **lib/** - Utilities (apiClient, config)
- **layout/** - Reusable layout components
- **hooks/** - Custom React hooks
- **components/** - Shared components (AuthGuard)
- **providers/** - Context providers (ChakraProvider)

### Authentication Flow

1. User visits `/` → redirects to `/login`
2. User enters credentials → calls `authService.login()`
3. On success → stores user & token in localStorage
4. Redirects to `/dashboard`
5. `AuthGuard` checks authentication on protected routes
6. `Header` shows user info with logout button

### API Client

Uses native `fetch` with Next.js caching:
```typescript
await apiClient.get<UsersResponse>('users', {
  limit: '30'
});

await apiClient.post<LoginResponse>('auth/login', {
  username: 'emilys',
  password: 'emilyspass'
});
```

### Path Aliases

```typescript
import { userService } from '@/shared/services';
import { useAuth } from '@/shared/hooks';
import Users from '@/features/users';
```

## 🎯 API Endpoints

- `POST /auth/login` - User authentication
- `GET /users` - Get all users
- `GET /products` - Get all products

## 🛠️ Tech Stack

- Next.js 15
- React 19
- TypeScript 5
- Chakra UI v3
- Tailwind CSS 3
- DummyJSON API

## 📝 Notes

- No Redux (uses Server Components + localStorage for auth)
- No Axios (uses native fetch)
- Follows front-rozatolhossein architecture patterns
- Clean, maintainable, and scalable structure
- All UI components built with Chakra UI v3
