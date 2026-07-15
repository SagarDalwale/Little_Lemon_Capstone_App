# Little_Lemon_Capstone_App
Little Lemon Capstone App
A modern, cross-platform mobile application developed as the final Capstone Project for the Meta Front-End Developer / React Native Professional Certificate on Coursera.

The Little Lemon Capstone App is a fully functional restaurant application that provides users with a seamless digital experience—from a customized onboarding flow to browsing and filtering a dynamic menu.

🚀 Features
User Onboarding & Profile Management: A secure, interactive onboarding flow that collects user details and persists them locally, allowing users to update their profile information and notification preferences.

Dynamic Menu & Filtering: Fetches restaurant menu data directly from an API, caches it locally using SQLite for offline access, and provides users with category filters (e.g., Starters, Mains, Desserts) and a live search bar.

Persistent State: Utilizes AsyncStorage and local database storage to ensure the user's data and session persist across app restarts.

Figma UI/UX Implementation: Built strictly according to professional UI/UX wireframes provided by the Meta design team, ensuring clean layout, typography, and responsive design.

🛠️ Tech Stack
Frontend: React Native / JavaScript

Database & Storage: Async Storage / SQLite (for local menu caching)

Navigation: React Navigation (Stack and Tab navigators)

Design & Wireframes: Figma

📂 Repository Structure
Little_Lemon_Capstone_Project/: Contains the primary application codebase, configuration files, and components.

WireFrames/: Holds the design assets and Figma mockups used to construct the app's visual interface.

💻 Getting Started
To run this project locally, follow these steps:

Clone the repository:

Bash
git clone https://github.com/SagarDalwale/Little_Lemon_Capstone_App.git
cd Little_Lemon_Capstone_App/Little_Lemon_Capstone_Project
Install dependencies:

Bash
npm install
Start the application:

Bash
npm run android
# or
npm run ios
