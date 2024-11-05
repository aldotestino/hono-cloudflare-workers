# hono-cloudflare-workers

A template repository to deploy a Hono application on Cloudflare Workers

## Features
- [x] Hono application
- [x] Deploy on push with Github action
- [ ] Body and parameters validation with Zod
- [x] Database (Drizzle + Neon)
- [ ] Authentication (Clerk)

## Setup

1. Create a new Cloudflare Worker from the Cloudflare dashboard;
2. [Create an Api Token](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/#api-token) and set `CLOUDFLARE_API_TOKEN` in the repository secrets;
3. [Find the account ID](https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/#find-account-id-workers-and-pages) and set `CLOUDFLARE_ACCOUNT_ID` in the repository secrets.
4. Create a new project on Neon, creating a dev branch.
5. Set the `DATABASE_URL` of the main branch of the Neon project in the repository secrets.
6. Set local environment variables
    ```bash
    cp .dev.vars.example .dev.vars
    ```
7. Set the `DATABASE_URL` environment variable in *dev.vars* to the dev branch of the Neon project.
8. Add Neon integration to the Cloudflare Worker setting up the main branch of the Neon project.
