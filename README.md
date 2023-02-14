## Getting Started

This example demonstrates how to use thirdweb Auth with [Next Auth](https://next-auth.js.org/). In this example, we'll setup a simple app that lets users sign in with their wallet, or with their google account.

To run the project, first clone this repository, and then run one of the following commands to install the dependencies:

```bash
npm install
# or
yarn install
```

Next, you need to create a `.env.local` file and add the following environment variables to it:

```.env.local
NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

The `NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN` is used to prevent phishing attacks on logins by adding the intended website domain onto every login request. You can obtain a `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from the [Google Developer Console](https://console.cloud.google.com/). You can learn more about configuring the Google Provider with Next Auth [here](https://next-auth.js.org/providers/google).

The `NEXTAUTH_URL` is used to setup your Next Auth API endpoints - you can learn more about how to configure it [here](https://next-auth.js.org/configuration/options#nextauth_url). The `NEXTAUTH_SECRET` is used to sign the session cookies - you can learn more about how to configure it [here](https://next-auth.js.org/configuration/options#nextauth_secret).

Finally, you can run the project with one of the following commands:

```bash
npm run dev
# or
yarn dev
```

Now, you can navigate to [http://localhost:3000](http://localhost:3000) to visit the client side page where you can login with your wallet, or with Google.

## Learn More

To learn more about thirdweb and Next Auth, take a look at the following resources:

- [thirdweb Auth Documentation](https://docs.thirdweb.com/auth) - learn about thirdweb Auth.
- [Next Auth Documentation](https://next-auth.js.org/getting-started/introduction) - learn about Next Auth.
- [thirdweb React Documentation](https://docs.thirdweb.com/react) - learn about our React SDK.
- [thirdweb Portal](https://docs.thirdweb.com) - check our guides and development resources.

You can check out [the thirdweb GitHub organization](https://github.com/thirdweb-dev) - your feedback and contributions are welcome!

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
