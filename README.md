# hono-cloudflare-workers

A template repository to deploy a Hono application on Cloudflare Workers

## Features
- [x] Hono application
- [x] Deploy on push with Github action
- [ ] Database (Drizzle + Neon)
- [ ] Authentication (Clerk)

## Setup

1. Create a new Cloudflare Worker from the Cloudflare dashboard;
2. [Create an Api Token](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/#api-token) and set `CLOUDFLARE_API_TOKEN` in the repository secrets;
3. [Find the account ID](https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/#find-account-id-workers-and-pages) and set `CLOUDFLARE_ACCOUNT_ID` in the repository secrets.