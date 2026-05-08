import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripDetail from './pages/TripDetail';
import ExpenseAnalytics from './pages/ExpenseAnalytics';
import Navbar from './components/layout/Navbar';

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={!userInfo ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!userInfo ? <RegisterPage /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={userInfo ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/create-trip" element={userInfo ? <CreateTrip /> : <Navigate to="/login" />} />
          <Route path="/trip/:id" element={userInfo ? <TripDetail /> : <Navigate to="/login" />} />
          <Route path="/trip/:id/expenses" element={userInfo ? <ExpenseAnalytics /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      <footer className="py-6 border-t border-white/5 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} TripSync AI. Built for the Future of Travel.
      </footer>
    </div>
  );
}

export default App;
