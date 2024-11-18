# List + Server Actions NextJS 15

## Exploring best practices using NextJS 15, Server Functions and Server Components

&lt;div align="left"&gt; &lt;a href="[&lt;a href="https://lists-server-actions.vercel.app/"&gt;https://lists-server-actions.vercel.app/&lt;/a&gt;](https://lists-server-actions.vercel.app/)"&gt; Live Site &lt;/a&gt; &lt;/div&gt;

### Main Features

- **Pagination**: Content is paginated accordingly to enhance UX.
- **Tailored  "Next and Previous" buttons:** User can navigate seamslessly between paginated tables. Buttons are accordingly disabled.
- **Search**: User can search the tabulated data preserving pagination behaviour.
- **Loading States:** 'useTransition' hook is used to leverage the best UX possible using loading states.
- **SSR**: Component architecture is smartly used to leverage the best possible user experience.

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

- You'll also need an `OPENAI_API_KEY` to access the OpenAI API.

- You'll need all the `POSTGRES_*` variables from the Vercel dashboard to access the Vercel Postgres API. The Vercel Postgres API is used to store the current backgrounds and their status.

- You'll need a `BLOB_READ_WRITE_TOKEN` from the Vercel dashboard to access the Vercel Blob API. The Vercel Blob API is used to store the uploaded images.

- You can get all the Vercel variables by using the Vercel CLI by running `vercel link`

- Initialize your DB

  ```
  psql "<YOUR POSTGRES_URL>" -f src/db/schema.psql
  ```

- Run the development server

  ```
  pnpm dev
  ```