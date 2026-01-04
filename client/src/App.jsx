import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomerListPage from './pages/CustomerListPage';
import CreateCustomerPage from './pages/CreateCustomerPage';
import CustomerDetailsPage from './pages/CustomerDetailsPage';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main className="container" style={{ flex: 1, paddingBottom: '2rem' }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/" element={
                <ProtectedRoute>
                  <CustomerListPage />
                </ProtectedRoute>
              } />
              <Route path="/create-customer" element={
                <ProtectedRoute>
                  <CreateCustomerPage />
                </ProtectedRoute>
              } />
              <Route path="/customer/:id" element={
                <ProtectedRoute>
                  <CustomerDetailsPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
