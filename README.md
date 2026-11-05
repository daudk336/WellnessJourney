# Wellness Journey

A full-stack web application built with React and TypeScript, with an Express server and a PostgreSQL data layer. The project includes payment integration dependencies and a modern, component-based UI stack.

## Technology

- **Frontend:** React 18, Vite, TypeScript
- **Backend:** Node.js, Express
- **Database:** PostgreSQL, Drizzle ORM, Neon serverless driver
- **Payments:** Stripe
- **UI:** Radix UI, Tailwind CSS, Framer Motion, Lucide
- **Forms & validation:** React Hook Form, Zod
- **Media processing:** Sharp

## Getting started

### Requirements
- Node.js
- PostgreSQL-compatible database
- npm

### Install dependencies
```bash
npm install
```

Configure the environment variables used by the server, database, and any enabled third-party integrations. Keep all secrets in environment configuration.

### Development
```bash
npm run dev
```

### Type-check and build
```bash
npm run check
npm run build
npm start
```

Apply database schema changes only after confirming the target database:

```bash
npm run db:push
```

## Deployment notes

Set production environment variables in the hosting platform. Verify database connectivity, payment provider configuration, upload/storage behavior, and server startup before exposing a production deployment.

## Security

Never commit credentials, payment secrets, private keys, or production environment files.

## License

MIT
