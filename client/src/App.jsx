import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomerListPage from './pages/CustomerListPage';
import CreateCustomerPage from './pages/CreateCustomerPage';
import CustomerDetailsPage from './pages/CustomerDetailsPage';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main className="container" style={{ flex: 1, paddingBottom: '2rem' }}>
          <Routes>
            <Route path="/" element={<CustomerListPage />} />
            <Route path="/create-customer" element={<CreateCustomerPage />} />
            <Route path="/customer/:id" element={<CustomerDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
