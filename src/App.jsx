// src/App.jsx
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import PublicationListPage from "./components/PublicationListPage";
import AddPublicationPage from "./components/AddPublicationPage";

import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import EditPublicationPage from "./components/EditPublicationPage";
import PublicationDetailPage from "./components/PublicationDetailPage";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />
          {/* Protected Routes */}
          <Route
            path="/publications"
            element={
              <ProtectedRoute>
                <PublicationListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publications/add"
            element={
              <ProtectedRoute>
                <AddPublicationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publications/edit/:id"
            element={
              <ProtectedRoute>
                <EditPublicationPage />
              </ProtectedRoute>
            }
          />
          {/* Redirect Routes */}
          <Route path="/" element={<Navigate to="/publications" replace />} />
          <Route path="*" element={<Navigate to="/publications" replace />} />

          <Route
            path="/publications/:id"
            element={
              <ProtectedRoute>
                <PublicationDetailPage />
              </ProtectedRoute>
            } />
        </Routes>

      </main>
      <Footer />
    </div>
  );
}