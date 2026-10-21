# car-sharing

An Expo (React Native) app skeleton for a two-sided car-sharing product, with Clerk sign-up and sign-in and separate rider and driver areas.

**Status:** Prototype. Authentication and role-based routing are wired up, but the rider and driver screens are placeholder text and there is no booking, location or payment code.

## The problem

The code is set up for a car-sharing app where riders and drivers are separate users. It covers sign-up, sign-in and onboarding for each role. The ride-sharing features themselves are not written yet.

## What it does

- **Sign-up and sign-in:** email and password sign-in through Clerk, with a verification-code step in sign-up (`app/(auth)/sign-in.tsx`, `app/(auth)/sign-up.tsx`).
- **Persistent sessions:** Clerk's token cache is stored in the device's secure storage through `expo-secure-store` (`app/_layout.tsx`).
- **Role onboarding:** separate onboarding flows for drivers and riders (`app/(onboarding)/driver-onboarding.tsx`, `app/(onboarding)/rider-onboarding.tsx`).
- **Role areas:** a `rider` and a `driver` route group, each with an index screen (`app/(protected)/rider/`, `app/(protected)/driver/`).

## How it's built

- Expo SDK 51 (`expo ~51.0.39`) with `expo-router` 3.5 for file-based routing and typed routes enabled in `app.json`.
- React 18.3 and React Native 0.83, with TypeScript in strict mode and an `@/*` path alias.
- Clerk for auth (`@clerk/clerk-expo`), with a custom token cache backed by `expo-secure-store`.
- Architecture choice: route groups separate `(auth)`, `(onboarding)` and `(protected)` screens, so each part has its own layout.
- Jest is set up with the `jest-expo` preset.

## Running it locally

Create a `.env` file that sets `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`. The root layout throws an error if this variable is missing.

```bash
npm install
npm start        # expo start; then open in Expo Go, an emulator, or the web
npm run android  # or: npm run ios / npm run web
npm run lint
```

## What's left

- The rider and driver home screens are placeholder text ("rider" and "driver").
- The onboarding index screen is placeholder text ("Intro").
- No ride, booking, map or payment features exist yet.
- No route guard is visible in the layouts. The protected group is a plain Stack, so signed-out users are not redirected from it in the code I read.
- Jest is configured with `--watchAll`, but there are no test files.
- The dependency versions look mismatched: Expo SDK 51 is pinned next to React Native 0.83.0, which SDK 51 does not target. I did not install or build the app to confirm.
- The privacy policy and terms screens are minimal placeholders in `app/(protected)/(public)/`.
