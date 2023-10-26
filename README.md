# FormLoop

An open source application that lets you create and manage forms effortlessly.

> **_NOTE:_** The setup instrtuction for this project uses `pnpm` , feel free to use `npm` or `yarn` or any other package manager of your choice.

## Environment Setup

1. Clone the repo

```shell
git clone https://github.com/sohan9819/formloop
```

2. Move to folder

```shell
cd formloop
```

3. Install and setup [Docker](https://www.docker.com/get-started)
4. Run the docker compose file in detached mode

```shell
docker-compose up -d
# or
docker compose up -d
```

5. Setup the project by running

```shell
pnpm install
```

## Setup .env file

Create a copy of .env.example file in the project's root directory

```shell
cp .env.example .env
```

Add the env variable `DATABASE_URL="postgresql://[username]:[password]@localhost:5432/[db]"`.
You can refer and change the username , password and db name from the docker-compose.yml file.

## Start the app

1.Push to db from prisma schema

```shell
pnpm db:push
```

1. Start the prisma studio [optional]

```shell
pnpm db:studio
```

3. Start the dev server

```shell
pnpm dev
```

### Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

#### What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

```

```
