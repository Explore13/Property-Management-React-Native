# 🚀 Build & Share Guide: Android & iOS

This guide provides step-by-step instructions on how to build, package, and share your **PropSpot** app without deploying it to the Apple App Store or Google Play Store.

---

## 📋 Table of Contents
1. [⚙️ EAS Build Profiles & Commands](#-eas-build-profiles--commands)
2. [⚠️ Critical Step: Environment Variables (`.env`)](#-critical-step-environment-variables-env)
3. [📦 Method 1: EAS Cloud Build (Recommended - QR Code & Direct Link)](#-method-1-eas-cloud-build-recommended---qr-code--direct-link)
4. [💻 Method 2: Local CLI Release Build (Free & Offline APK)](#-method-2-local-cli-release-build-free--offline-apk)
5. [📲 Method 3: Live Dev Sharing via Expo Go (Fastest for Testing)](#-method-3-live-dev-sharing-via-expo-go-fastest-for-testing)

---

## ⚙️ EAS Build Profiles & Commands

EAS Build supports three primary build profiles defined in your `eas.json` configuration. Each serves a distinct phase of development:

### 1. 🛠️ Development (`development`)
*   **Purpose:** Active local coding and debugging.
*   **How it works:** Builds a custom **Development Client** shell containing all native packages (like Clerk, SecureStore, etc.) but no Javascript code. When opened, it connects to your local machine running `npx expo start`.
*   **Commands:**
    ```bash
    # Android (Emulator/Device)
    eas build --platform android --profile development

    # iOS (Simulator/Device)
    eas build --platform ios --profile development

    # Both Platforms
    eas build --platform all --profile development
    ```

### 2. 🧪 Preview (`preview`)
*   **Purpose:** Sharing the app for internal QA, beta testing, and client demos.
*   **How it works:** Compiles your active Javascript code directly into a production-like standalone app. It does not connect to a local development server. For Android, it generates a direct **`.apk`** file for simple distribution.
*   **Commands:**
    ```bash
    # Android (Generates direct download APK link and QR code)
    eas build --platform android --profile preview

    # iOS (Ad Hoc distribution - requires Apple Developer ID)
    eas build --platform ios --profile preview

    # Both Platforms
    eas build --platform all --profile preview
    ```

### 🚀 3. Production (`production`)
*   **Purpose:** Final store submissions.
*   **How it works:** Creates optimized, minified bundles signed with your production keys. For Android, this generates an **`.aab`** (Android App Bundle) which is required by Google Play Store (cannot be sideloaded directly on phones).
*   **Commands:**
    ```bash
    # Android (Store bundle .aab)
    eas build --platform android --profile production

    # iOS (App Store App .ipa)
    eas build --platform ios --profile production

    # Both Platforms
    eas build --platform all --profile production
    ```

---

## ⚠️ Critical Step: Environment Variables (`.env`)

Before triggering any build, you **must** configure your environment variables. The project uses Clerk and Supabase, which rely on keys prefix-coded with `EXPO_PUBLIC_`. 

Because `.env` files are ignored by version control and Expo Cloud builds by default, the keys will **not** be included in your build unless you handle them explicitly:

### Option A: Store keys directly in `eas.json` (Simplest)
Open [eas.json](file:///Users/explorer/Workspace/Personal/Coding/Learning/React-Native/Property-Management-React-Native/eas.json) and populate the `env` block under the `preview` profile with your keys:
```json
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "env": {
        "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY": "pk_test_Y2xlYW4tbGlvbmZpc2gtODkuY2xlcmsuYWNjb3VudHMuZGV2JA",
        "EXPO_PUBLIC_SUPABASE_URL": "https://artoeuqucsrcummkulsz.supabase.co",
        "EXPO_PUBLIC_SUPABASE_KEY": "sb_publishable_B4VTY2cbK54Hj1nn7StWdQ_Bt4yEyB3",
        "EXPO_PUBLIC_SUPABASE_PASSWORD": "Propspot@123"
      }
    }
```

> [!WARNING]
> Storing secret keys in `eas.json` is convenient but commits them to your Git repository (if it is public). If your repo is public, use **Option B** instead.

### Option B: Add Secrets to the Expo Dashboard (Secure)
1. Run `eas secret:create --scope project --name EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY --value <value>` in your terminal for each variable.
2. Alternatively, go to the [Expo Dashboard](https://expo.dev), navigate to your Project → **Settings** → **Credentials** → **Secrets**, and add them there.

---

## 📦 Method 1: EAS Cloud Build (Recommended - QR Code & Direct Link)

Expo Application Services (EAS) Build compiles your app on secure cloud servers. It manages all signing credentials automatically and generates a shareable download page containing a **direct download link** and a **scanable QR code**.

### 🤖 Build APK for Android
Android is highly flexible. EAS can build a standalone `.apk` file that anyone can install by opening the download link on their phone.

#### Step 1: Install EAS CLI
Install the EAS Command Line Interface globally on your machine:
```bash
npm install -g eas-cli
```

#### Step 2: Log In to your Expo Account
Log in (or register) to your Expo account:
```bash
eas login
```

#### Step 3: Run the Preview Build Command
Trigger the Android build using the `preview` profile:
```bash
eas build --platform android --profile preview
```
*   **What this does:** EAS uploads your project metadata to the cloud, configs the keystore credentials, and generates a standalone `.apk`.
*   **Time taken:** 5 to 12 minutes depending on queue times.

#### Step 4: Share the Link / Install the APK
Once finished, the CLI will output a URL like:
`https://expo.dev/artifacts/eas/...apk`
*   **To Share:** Send this Expo URL directly to your testers/clients. They can open it on their Android device, scan the QR code, and download/install the APK directly.
*   **To Install:** Enable "Install from Unknown Sources" in Android Settings if prompted.

---

### 🍏 Build for iOS (Internal Distribution)
Apple enforces strict security policies that prevent installing external apps directly unless you use specific pathways.

To share an iOS app outside the App Store, you **must** use **Ad Hoc provisioning** (Ad Hoc distribution), which requires a paid **Apple Developer Account** ($99/yr).

#### Step 1: Register Tester Devices
You must register the UDID of each iPhone/iPad you want the app to run on.
1. Have the tester open `https://deviceid.info` on their iPhone to obtain their UDID.
2. Run the command to register their devices:
   ```bash
   eas device:create
   ```
   Follow the prompts to sign into Apple Developer and add the device UDID.

#### Step 2: Trigger iOS Preview Build
Build the iOS app:
```bash
eas build --platform ios --profile preview
```
*   **What this does:** EAS automatically generates the Ad Hoc provisioning profile, embeds the registered UDIDs, and compiles an `.ipa` file.

#### Step 3: Share the Link
EAS will output a shareable Expo URL. Only the iPhones whose UDIDs were registered can install and open the app via this link.

---

## 💻 Method 2: Local CLI Release Build (Free & Offline APK)

If you do not want to use Expo's cloud servers, you can build a standalone Android APK directly on your Mac.

### Prerequisite Checklist (Android Local Build)
- [ ] **Java Development Kit (JDK 17)** installed (`java --version`).
- [ ] **Android Studio** installed with the Android SDK, Build-Tools, and Emulator configured.
- [ ] **Environment variables set:** Ensure your `.env` contains correct variables.

### 🤖 Step-by-Step Local Android Build

#### Step 1: Prebuild the native Android directory
Generate/update the native Android folder:
```bash
npx expo prebuild --platform android
```
*(This creates or updates the native `android` folder in your project based on your `app.json` configuration.)*

#### Step 2: Run Gradle Release build
Navigate into the android folder and trigger a release build:
```bash
cd android && ./gradlew assembleRelease
```
*This command compiles the entire React Native bundle and creates an APK locally.*

#### Step 3: Locate your APK File
Once complete, your standalone APK file is generated at:
`android/app/build/outputs/apk/release/app-release.apk`

#### Step 4: Upload and Share
Since this is generated locally, you must upload it manually to a file hosting service:
1. Upload `app-release.apk` to **Google Drive**, **Dropbox**, **WeTransfer**, or **OneDrive**.
2. Set the file permissions to *"Anyone with the link can view/download"*.
3. Share the download link. Users can download and install it on their Android devices immediately.

---

## 📲 Method 3: Live Dev Sharing via Expo Go (Fastest for Testing)

If you are just sharing the app with other developers, designers, or testers for a quick review, you don't need to build a standalone APK. You can run the dev server and let them access it directly through the **Expo Go** app.

### Step-by-Step
1. Ask the tester to download **Expo Go** from the iOS App Store or Android Google Play Store.
2. Ensure you are running the development server:
   ```bash
   npx expo start --go
   ```
3. **If you are on the same Wi-Fi network:**
   * Share the QR code displayed in the terminal.
   * The tester opens Expo Go (Android) or their Camera app (iOS) and scans the QR code.
4. **If you are on different Wi-Fi networks / remote:**
   * Install the tunnel tool: `npm install -g @expo/ngrok`
   * Start the server with the tunnel option:
     ```bash
     npx expo start --tunnel
     ```
   * Share the tunnel link or QR code. Expo Go will download the JavaScript bundle remotely over the internet.

---

## 🛠️ Summary Matrix: Which should I choose?

| Criteria | EAS Cloud Build (Android APK) | Local Gradle Build (Android APK) | iOS Ad Hoc Build | Expo Go Sharing |
| :--- | :--- | :--- | :--- | :--- |
| **Target OS** | Android | Android | iOS | Android & iOS |
| **Cost** | Free (Generous tier) | Free | Apple Dev Account ($99/yr) | Free |
| **Requirements**| EAS Account | Android Studio & SDK | Apple Developer Account | Expo Go App |
| **Ideal For** | Quick remote sharing | Local/Offline pipelines | Internal iOS testing | Rapid dev iteration |
| **Delivery** | Direct Link / QR Code | Upload to Drive/Dropbox | Install Link (Safari) | Scanning QR Code |
