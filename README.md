# 🏢 PropSpot

PropSpot is a premium, modern mobile application for property search and real estate listing management. Built on top of **React Native** and **Expo (v54)**, PropSpot features a seamless user experience, secure authentication, and a robust real-time backend powered by **Clerk** and **Supabase**.

[Download APK](https://drive.google.com/file/d/1QmZ4QllssapjXd4LAgRE5VppCAzEjuKB/view?usp=sharing)

---

## 🌟 Key Features

*   **🔐 Secure Authentication**: Integrated authentication flow (Sign In, Sign Up, and Password Reset) managed by **Clerk**.
*   **🔄 Automatic User Syncing**: Automatic synchronization of user metadata from Clerk to a dedicated Supabase `users` database table.
*   **🔍 Advanced Search & Filtering**: Robust search functionality with a dynamic filter modal (price range, property type, room count, custom amenities, etc.).
*   **📍 Location Services**: Access device location permissions via `expo-location` to set property coordinates.
*   **🖼️ Media Library Integration**: Support for selecting and uploading high-quality images from the device gallery using `expo-image-picker`.
*   **⚡ State Management**: Clean, lightweight global state stores for filters and user sessions powered by **Zustand**.
*   **🗺️ Maps Integration**: Interactive map rendering for viewing properties dynamically in geo-space.
*   **📱 NativeWind Styling**: Sleek, responsive, and customizable UI styled entirely with Tailwind CSS utility classes via **NativeWind v4**.

---

## 🛠️ Tech Stack

*   **Framework**: [React Native](https://reactnative.dev/) & [Expo (SDK 54)](https://expo.dev/)
*   **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing using tabs & stack navigation)
*   **Authentication**: [Clerk Expo](https://clerk.com/docs/references/expo/overview)
*   **Database & Backend**: [Supabase](https://supabase.com/) (PostgreSQL Database, JS client SDK)
*   **Styling**: [Tailwind CSS / NativeWind v4](https://www.nativewind.dev/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Animations & Gestures**: `react-native-reanimated` & `react-native-gesture-handler`

---

## 📂 Project Structure

```text
├── app/                  # Expo Router navigation configuration
│   ├── (auth)/           # Authentication screens (Sign In, Sign Up, Reset Password)
│   ├── (root)/           # App shell (verifies auth and syncs user profiles)
│   │   ├── (tabs)/       # Core tab-bar views (Home, Search, Create, Saved, Profile)
│   │   └── property/     # Dynamic property detail screen & Interactive Map view
│   └── _layout.tsx       # Clerk Provider setup
├── components/           # Reusable UI components (FeaturedCard, FilterModal, PropertyCard)
├── hooks/                # Custom React Hooks (Supabase client, Saved properties, Sync hook)
├── store/                # Zustand global state configurations (filterStore, userStore)
├── types/                # Typescript interfaces (IProperty, User details)
├── utils/                # Supabase clients and helper functions
├── DEPLOYMENT.md         # Compilation, packaging, and distribution instructions
└── README.md             # Project documentation (this file)
```

---

## ⚙️ Getting Started

### 📋 Prerequisites

Ensure you have the following installed on your developer machine:
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   [Expo Go](https://expo.dev/go) app installed on your physical test device (Android or iOS), or configured Emulators/Simulators.

### 🚀 Local Setup

1. **Clone the Repository** and navigate to the project directory:
   ```bash
   cd Property-Management-React-Native
   ```

2. **Install Project Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a local `.env` file in the root directory. You can copy the template from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Open the newly created `.env` file and populate it with your active Clerk and Supabase credentials:
   ```ini
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   EXPO_PUBLIC_SUPABASE_URL=https://...supabase.co
   EXPO_PUBLIC_SUPABASE_KEY=sb_publishable_...
   ```

4. **Start the Development Server**:
   ```bash
   npx expo start
   ```

   *   Press `a` to run on an Android emulator/device.
   *   Press `i` to run on an iOS simulator/device.
   *   Scan the terminal QR code with **Expo Go** on your physical device.

---

## 📦 Building and Deployment

For building a standalone production binary (Android `.apk` or iOS `.ipa`), please refer to the detailed instructions in [DEPLOYMENT.md](./DEPLOYMENT.md).

> [!NOTE]
> Storing publishable environment variables inside `eas.json` is recommended for simple cloud builds, but ensure you keep secrets secure if the project repository is made public.

---

## 📄 License

This project is private and proprietary.
