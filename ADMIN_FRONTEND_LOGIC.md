# Admin Frontend Architecture and Logic

This document provides a comprehensive analysis of the Admin frontend application built with React, React Router, Axios, and Tailwind CSS, powered by Vite. It covers folder structure, entry points, routing, authentication flow, API integration, key components, state management, styling, and recommendations.

---

## 1. Project Structure

```
/Admin
├── public/                # Static assets (index.html, logos, favicon)
├── src/
│   ├── api/               # Axios client and auth API methods
│   │   ├── axiosClient.ts
│   │   └── auth.api.ts
│   ├── components/        # Shared UI components (modals, toasts, error boundary)
│   ├── hooks/             # Custom hooks: useAuth, useLoginForm, etc.
│   ├── pages/             # Top-level page components (LoginPage, Landing, etc.)
│   ├── routes/            # Route definitions and sub-routes
│   │   ├── auth/          # Login, Register, ForgotPassword
│   │   ├── dashboard/     # Dashboard landing page
│   │   ├── home/          # Public home page
│   │   ├── about/         # About page
│   │   ├── agencies/      # Agency CRUD pages
│   │   ├── reports/       # Report CRUD pages
│   │   ├── account/       # User account management pages
│   │   ├── regulations/   # Regulatory settings pages
│   │   ├── ProtectedRoute.tsx
│   │   └── index.tsx      # Main route switcher
│   ├── App.tsx            # Root component assembling routes
│   ├── main.tsx           # App entry point: renders App into DOM
│   ├── index.css          # Tailwind base styles
│   ├── tailwind.config.js
│   └── vite.config.ts
├── package.json           # Dependencies & scripts
└── README.md              # Project overview & startup guide
```

---

## 2. Entry Point & Bootstrapping

- **main.tsx**: Renders `<App />` inside:
  1. React `<StrictMode>`
  2. `ToastProvider` (global toast notifications)
  3. `AuthProvider` (provides auth context via `useAuth`)
  4. `BrowserRouter` (React Router context)

- **App.tsx**: Wraps `<AppRoutes />` in an `ErrorBoundary` to catch runtime errors.

**Decision**: Placing `AuthProvider` and `BrowserRouter` at the top ensures all components, including protected routes and links, have proper context.

---

## 3. Routing Structure

- **index.tsx** under `src/routes` defines global routes:
  - Public Routes: `/`, `/landing`, `/about`, `/login`, `/register`, `/forgot-password`
  - Protected Routes: wrapped in `<Route element={<ProtectedRoute />}>`
    - `/admin` → `DashboardPage`
    - `/reports*` → reports pages CRUD
    - `/account*` → account pages
    - `/regulations*` → regulatory pages
    - `/agencies*` → agency pages
  - Fallback: `*` → `NotFound`

- **ProtectedRoute.tsx** uses `useAuth`:
  1. Shows loading state while `isLoading`.
  2. Redirects to `/login` if no `user`.
  3. Renders `<Outlet />` for nested routes when authenticated.

**Decision**: Using `<Outlet>` grouping simplifies protecting multiple routes under one guard.

---

## 4. Authentication Flow

- **Auth Context (useAuth.tsx)**:
  - Maintains `user`, `isLoading`, and a `session` counter.
  - On mount, calls `getMe()` to fetch current user via `/auth/me`.
  - `login(credentials)` → POST `/auth/login/`, then `getMe()`, increments `session`.
  - `logout()` → POST `/auth/logout/`, clears `user`.

- **Auth API (auth.api.ts)**:
  - `login`, `register`, `getMe`, `logout` methods using Axios client.
  - Zod schemas (frontend validation before submit).

- **LoginPage**:
  - Uses React Hook Form + Zod to validate credentials.
  - Calls `login`, navigates to `/admin` (or `/`) on success.
  - Displays errors on failure.

- **Cookie Handling**:
  - Axios client configured with `withCredentials: true` and HttpOnly cookies.
  - Backend sets SameSite=Lax for dev; secure cookies for prod.

**Decision**: Centralizing auth context and API calls allows any component to react to session changes and implement role-based logic if needed.

---

## 5. API Integration

- **axiosClient.ts**:
  - Base instance with interceptors:
    - Requests inject `baseURL` (e.g., `/api/v1`).
    - Responses handle 401 → redirect to `/login`.
    - Errors normalized and re-thrown.
  - Exported default for all API modules.

- **Modular APIs**:
  - `auth.api.ts`, `agency.api.ts`, `report.api.ts`, etc.
  - Typed methods returning response data.

**Decision**: Splitting APIs per domain keeps code organized and testable. Centralizing interceptors enforces consistent error handling.

---

## 6. Core Pages & Components

- **DashboardPage**: admin landing with summary cards.
- **CRUD Pages**: each domain (`reports`, `agencies`, etc.) contains `index.tsx`, `add.tsx`, `view.tsx`, `edit.tsx` under respective folders.
- **Shared Hooks**: `useLoginForm`, `useTabNavigation`, `useTableFilters` to abstract common UI logic.
- **ToastContext**: global toasts for success/error notifications.
- **ErrorBoundary**: catches runtime errors, displays fallback UI.

**Decision**: Feature-based folders (per module) align with scalable code organization.

---

## 7. Styling & Theming

- **Tailwind CSS** with custom config.
- Utility-first styles in JSX ensure consistent theming.
- Responsive fixes documented in `RESPONSIVE_FIXES.md`.

**Decision**: Tailwind accelerates UI development and enforces design consistency.

---

## 8. Conclusions & Recommendations

1. **Maintain Single Entry for Providers**: keep `AuthProvider`, `BrowserRouter`, and `ToastProvider` at top for global contexts.
2. **Protect Routes Centrally**: leverage `<ProtectedRoute>` for easy expansion.
3. **Domain-driven API Modules**: continue to add new modules under `src/api` and update interceptors as needed.
4. **Enhance Error UX**: consider custom loading screen or skeletons in protected routes.
5. **Testing**: add unit tests for hooks (e.g. `useAuth`) and integration tests for routing guards.

This analysis should guide future feature decisions, ensuring consistency, security, and maintainability of the Admin frontend.

---

*Generated on:* `2025-07-05`

## 9. Detailed Business API Integration Logic

This section drills into how to integrate the core business (nghiệp vụ) APIs—agencies, reports, accounts, regulations—end-to-end in the Admin frontend.

### 9.1. Common API Integration Patterns

- **Centralized axiosClient**: always import `axiosClient` from `src/api/axiosClient.ts`, which has
  - `baseURL` configured (e.g. `/api/v1`) and `withCredentials:true`
  - response interceptor redirecting on 401
  - error normalization for consistent catch blocks
- **Separation by Domain**: each module under `src/api` exports typed functions:
  ```ts
  // agencies.api.ts
  export const fetchAgencies = (params?: Params) =>
    axiosClient.get<Agency[]>(`/agency/`, { params });
  export const getAgency = (id: number) => axiosClient.get<Agency>(`/agency/${id}/`);
  export const createAgency = (payload: AgencyInput) => axiosClient.post<Agency>(`/agency/`, payload);
  // ...update, delete
  ```
- **Type Safety**: use TypeScript interfaces / Zod schemas from API module for request/response.
- **Error Handling**: in UI hooks or components, wrap calls in `try/catch`, display toast on error:
  ```ts
  try {
    const { data } = await createAgency(values);
    toast.success('Agency created');
    navigate('/agencies');
  } catch (err) {
    toast.error(err.message || 'Create failed');
  }
  ```

### 9.2. Fetching & State Management

- **useEffect + local state** for simple lists:
  ```ts
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchAgencies({ page, search })
      .then(res => setAgencies(res.data))
      .finally(() => setLoading(false));
  }, [page, search]);
  ```
- **React Query** (optional enhancement): provides built-in caching, retry, pagination helpers—consider migrating long-lived lists.

### 9.3. CRUD Page Logic

1. **List Page (`index.tsx`)**
   - Fetch on mount and on filter/pagination change
   - Display loading spinner, handle empty and error states
   - Render table rows, link to view/edit pages
2. **View Page (`view.tsx`)**
   - Fetch single entity by ID from route params
   - Show details, optionally preload related data (e.g. agency's districts via `districts` API)
3. **Add/Edit Forms (`add.tsx`, `edit.tsx`)**
   - Use React Hook Form + validation schema
   - On submit, call `createX` or `updateX`, then navigate back to list
   - Handle server errors per-field (map backend validation to form errors)

### 9.4. Pagination, Search & Filters

- **URL Sync**: keep `page`, `limit`, `search`, `sort` in URL query parameters via `useSearchParams` for shareable links.
- **Debounce Search**: wrap input in `useDebounce` to avoid spamming API.
- **Filter Hooks**: `useTableFilters` already encapsulates state and effects—leverage it across modules.

### 9.5. Example: Agency List Integration

```tsx
// src/routes/agencies/index.tsx
const AgencyPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const page = +params.get('page') || 1;
  const search = params.get('q') || '';
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAgencies({ page, search })
      .then(res => setAgencies(res.data))
      .finally(() => setLoading(false));
  }, [page, search]);

  return (
    <Table
      data={agencies}
      loading={loading}
      onSearch={q => setParams({ page: '1', q })}
      onPageChange={p => setParams({ ...Object.fromEntries(params), page: p.toString() })}
    />
  );
};
```

### 9.6. Best Practices & Next Steps

- **Extract Hooks**: for each domain, create `useAgencies`, `useReports`, etc. to centralize fetch/create/update/delete logic.
- **Global Error Boundary**: extend ErrorBoundary to catch API failures at HTTP layer.
- **Realtime Updates**: consider WebSocket or Server-Sent Events for live dashboards.
- **Unit Tests**: mock `axiosClient` and test hooks and API wrappers.

*End of Business API Integration Logic Section* 