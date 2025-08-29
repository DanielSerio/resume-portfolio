## Project Context

The purpose of this application is to give recruiters more insight into my skills as a
senior frontend software engineer. A static resume only has one "state". With an application,
We can make use of things like filtering, sorting, and data-relation.

## Coding Standards & Style

- **Formatting:** Always format code using Prettier.
- **Naming Conventions:** Adhere to the project's established conventions, especially within component directories.

## Architecture Notes

We will be using the supabase sdk on the client, so we do not need to build a backend. We will be using Supabase Auth for the admin authentication.

## Structure

For the routing, we will follow this setup for file-based routing using @tanstack/react-router:

https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing

below is the URL structure we will use:

```
|__/                       # Resume Page
|
|__/showcase               # Showcase Directory
|  |__/                    # Showcase List Page - Lists a series of "advanced frontend problems"
|  |__/[id]                # Showcase Entity Page - A mini internal application that demonstrates the UX/UI problems solution
|
|__/admin                  # Admin Directory
|  |__/                    # Login Page (guarded when user is logged in)
|  |__/categories          # Edit Categories Page (guarded when user is not logged in)
|  |__/subcategories       # Edit Subcategories Page (guarded when user is not logged in)
|  |__/skills              # Skill Page (guarded when user is not logged in)
```

## Modules

- Resume - Module for publicly displaying resume data
- Showcase - Module for publicly displaying solutions to tough UX/UI problems
- Admin - Module for editing resume data. Will only be accessible by one user (superuser)

## Application Dependencies

Our application will be built with `vite/react`.

The core libraries we will use are:

- `@supabase/supabase-js` - Backend System
- `@tanstack/react-router` - Application Routing
- `@tanstack/react-query` - Caching
- `@tanstack/react-table` - Rendering Tables
- `zod` - Data Validation
- `react-hook-form` - Form Validation
- `@hookform/resolvers` - For integrating `react-hook-form` with `zod`
- `shadcn` - UI Components

## Module Patterns

Below are some patterns we would like to follow to keep things simple and consitent

### Admin Patterns

#### Form Validation

All forms should use the same mechansim for validation. For this mechanism, A global custom react hook that combines the functionality of `zod`,`@hookform/resolvers`,`react-hook-form`, and `@tanstack/react-query`for validating user input to be posted to the server is needed. There will be a sparate validation schema for each entity.

The mechanism should be defined as:

1. An instance of the above hook for the particular form (entity) to render

2. An instance of the form component that will take in the hook described in step 1

### Routing Patterns

All routes should have a corresponding page component. This keeps any page logic out of the route file. For an example, see files:

- src/routes/(resume)/index.tsx
- src/pages/ResumePage.tsx
