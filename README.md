# ICP Generator

A web application to generate Ideal Customer Profiles (ICPs) using AI and n8n workflows.

## Features

- Generate customized ICPs based on industry, persona, and region
- Clean, modern UI built with Next.js and Tailwind CSS
- Integration with n8n workflows for backend processing

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is configured for easy deployment on Vercel.

## Configuration

To connect to your n8n instance, update the webhook URL in `components/ICPGenerator.tsx`. 