/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticatedProfileImport } from './routes/_authenticated/profile'
import { Route as AuthenticatedExpensesImport } from './routes/_authenticated/expenses'
import { Route as AuthenticatedCreateExpenseImport } from './routes/_authenticated/create-expense'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedProfileRoute = AuthenticatedProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedExpensesRoute = AuthenticatedExpensesImport.update({
  path: '/expenses',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedCreateExpenseRoute = AuthenticatedCreateExpenseImport.update(
  {
    path: '/create-expense',
    getParentRoute: () => AuthenticatedRoute,
  } as any,
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/create-expense': {
      preLoaderRoute: typeof AuthenticatedCreateExpenseImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/expenses': {
      preLoaderRoute: typeof AuthenticatedExpensesImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/profile': {
      preLoaderRoute: typeof AuthenticatedProfileImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/': {
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthenticatedRoute.addChildren([
    AuthenticatedCreateExpenseRoute,
    AuthenticatedExpensesRoute,
    AuthenticatedProfileRoute,
    AuthenticatedIndexRoute,
  ]),
])

/* prettier-ignore-end */
