# Nxt-Watch YT UI Clone React App

## Overview
Nxt-Watch is a YouTube-inspired UI clone built using **React** and **Vite**, offering features such as **user authentication, video interactions (like/dislike/save), theme switching, and persistent data storage**.

## Features
- **User Authentication:** Users log in with credentials and are redirected to the homepage upon success.
- **Navigation & UI Components:**
  - **Navbar:** Global navigation bar.
  - **SideNavBar:** Navigation links tailored for different screen sizes.
  - **ProtectedRoute:** Ensures only authenticated users access certain pages.
- **Video Interactions:** Clicking a video navigates to the **VideoDetails** page where users can:
  - **Like, dislike, and save videos**.
  - Saved videos are managed via **Redux**, with **localStorage** ensuring persistence.
- **Dark & Light Theme Toggle:** Implemented using **React Context API** and styled with **TailwindCSS**.
- **Error Handling:** Graceful management of API errors.
- **Skeleton Loader:** Displays loading placeholders while fetching data.
- **Toast Notifications:** Shown upon successful login.
- **React Modal:** Used for logout confirmation.

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS
- **State Management:** Redux, Context API
- **Storage:** LocalStorage for video persistence
- **UI Enhancements:** Skeleton loaders, modals, toast notifications

## Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone ...
   ```
2. **Navigate to the project folder:**
   ```sh
   cd nxt-watch
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Start the development server:**
   ```sh
   npm run dev
   ```

## Folder Structure
```
nxt-watch/
│── src/
│   ├── components/        # UI components
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SideNavBar.jsx
│   │   ├── VideoDetailsCard.jsx
│   ├── contexts/          # State management
│   │   ├── SavedVideosSlice.jsx  # Manages liked, disliked, and saved videos
│   │   ├── store.jsx            # Redux store setup
│   │   ├── ThemeStoreProvider.jsx # Theme context provider
│   ├── customHooks/       # Custom hooks
│   │   ├── useFetch.jsx   # Handles API calls efficiently
│   ├── pages/             # Application pages
│   │   ├── GamingRoute.jsx
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── SavedVideos.jsx
│   │   ├── TrendingRoute.jsx
│   │   ├── VideoItemDetails.jsx
│── public/                # Static assets
│── package.json           # Dependencies and scripts
│── vite.config.js         # Vite configuration
```

## Author
- **Ram** - A detail-oriented frontend developer passionate about scalable, maintainable, and visually appealing UI designs.
