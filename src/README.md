# Source structure

The app is organised into **modules** (one per feature/domain) plus a small set of **shared** folders.

```
src/
├── app/                 # Expo Router routes only — thin files that render a module's screen
│   ├── _layout.tsx      # Root Stack
│   ├── (tabs)/          # Tab navigator (Home, Explore)
│   └── (auth)/          # Auth routes (login.tsx -> LoginScreen from @/modules/auth)
│
├── modules/             # Feature modules — each one is self-contained
│   └── auth/
│       ├── components/  # UI used only by this module (LoginForm)
│       ├── hooks/       # Module hooks (useLogin)
│       ├── screens/     # Full screens rendered by routes (LoginScreen)
│       ├── services/    # API calls for this module (auth-service)
│       ├── utils/       # Module-only helpers (validate-login)
│       ├── types.ts     # Module types
│       └── index.ts     # Public API — the only file other code should import from
│
├── components/          # Shared UI (`ui/` holds primitives: Button, TextField)
├── constants/           # Theme, config
├── context/             # Global providers (AppProvider)
├── hooks/               # Shared hooks
├── services/            # Shared infrastructure (api-client)
├── types/               # Shared types
└── utils/               # Shared pure helpers
```

## Rules

- Routes in `src/app/` stay thin: import a screen from a module and export it as default.
- Import a module through its index: `import { LoginScreen } from '@/modules/auth';`
- Inside a module, use relative imports (`../hooks/use-login`); for shared code, use `@/`.
- Modules may use shared folders, but shared folders must never import from a module.
- Code used by two or more modules moves to the matching shared folder.

## Adding a module

1. Create `src/modules/<name>/` with only the subfolders you need, plus `index.ts`.
2. Export the module's public screens, hooks and types from `index.ts`.
3. Add a route in `src/app/` that renders the screen.
