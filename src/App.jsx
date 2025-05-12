import React from 'react'
import ThemeContextProvider from './contexts/ThemeContextProvider'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import TrendingRoute from './pages/TrendingRoute'
import Home from './pages/Home'
import GamingRoute from './pages/GamingRoute'
import VideoItemDetails from './pages/VideoItemDetails'
import SavedVideos from './pages/SavedVideos'
import { Provider } from 'react-redux'
import store from './contexts/store'
import NotFound from './pages/Not-Found'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <TrendingRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gaming"
            element={
              <ProtectedRoute>
                <GamingRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video-details/:id"
            element={
              <ProtectedRoute>
                <VideoItemDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-videos"
            element={
              <ProtectedRoute>
                <SavedVideos />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ThemeContextProvider>
    </Provider>
  );
}


export default App