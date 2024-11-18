# List + Server Actions NextJS 15

## Exploring best practices using NextJS 15, Server Functions and Server Components

### Main Features

- **Pagination**: Content is paginated to enhance user experience, allowing users to navigate through data efficiently.
- **Tailored "Next and Previous" Buttons**: Users can seamlessly navigate between paginated tables with buttons that are appropriately enabled or disabled based on the current page.
- **Search**: Users can search through the tabulated data while preserving pagination behavior, ensuring a smooth and intuitive search experience.
- **Loading States**: The `useTransition` hook is utilized to provide the best possible user experience by displaying loading states during data fetching and transitions.
- **Server-Side Rendering (SSR)**: The component architecture is designed to leverage SSR, providing an optimized and fast user experience by rendering content on the server.

### Installation:

- We'll use pnpm

  ```sh
  pnpm install
  ```

- Setup your environment variables

  ```bash
  cp .env.example .env.development.local
  ```

- Then, open the `.env.development.local` file and fill in the required environment variables.


- You'll need all the `POSTGRES_*` variables from the Vercel dashboard to access the Vercel Postgres API. The Vercel Postgres API is used to store the current backgrounds and their status.


- You can get all the Vercel variables by using the Vercel CLI by running `vercel link`

- Initialize your DB

  ```
  psql "<YOUR POSTGRES_URL>" -f src/db/schema.psql
  ```

- Run the development server

  ```
  pnpm dev
  ```

