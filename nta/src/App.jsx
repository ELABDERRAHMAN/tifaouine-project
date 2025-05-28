import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ToastProvider } from "./contexts/ToastContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import OrphanFiles from "./pages/OrphanFiles"
import CreateOrphan from "./pages/CreateOrphan"
import UploadFiles from "./pages/UploadFiles"
import Statistics from "./pages/Statistics"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"
import ParticleBackground from "./components/ParticleBackground"

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen relative overflow-hidden">
            <ParticleBackground />
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orphan-files"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <OrphanFiles />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-orphan"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CreateOrphan />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload-files/:id"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <UploadFiles />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/statistics"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Statistics />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Settings />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
