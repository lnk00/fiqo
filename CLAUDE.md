# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FIQO is a full-stack TypeScript monorepo starter with shared types, using Bun, Hono, Vite, and React. It's structured as a workspace-based monorepo with three main packages:

- **client**: React frontend with Vite
- **server**: Hono backend API 
- **shared**: Common types shared between client and server

## Key Commands

### Installation

```bash
# Install all dependencies
bun install
```

### Development

```bash
# Run all parts in development mode (shared, server, client)
bun run dev

# Run individual parts
bun run dev:shared  # Watch and compile shared types
bun run dev:server  # Run the Hono backend with hot reload
bun run dev:client  # Run the Vite dev server for React
```

## Architecture

The project uses a type-safe full-stack architecture with shared types between client and server:

1. **Shared Types**: Defined in the `shared` package, these provide type consistency across the application
   - Location: `shared/src/types/index.ts`

2. **Server**: Hono-based API that uses the shared types 
   - Main file: `server/src/index.ts`
   - Exports a type-safe client via Hono Client (hc)

3. **Client**: React frontend that communicates with the server
   - Uses the type-safe client from the server package
   - RPC setup in `client/src/lib/rpc.ts`

4. **Type Safety**: End-to-end type safety achieved through:
   - Shared type definitions
   - Hono's built-in client generator
   - TypeScript workspace references

## Environment Variables

The client can be configured to connect to a custom server endpoint by setting:

```
VITE_SERVER_URL=https://your-server-url
```

The default server URL is `http://localhost:3000` if not specified.
