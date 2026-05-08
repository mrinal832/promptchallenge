import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { Plane, LogOut, User, Map as MapIcon, Plus } from 'lucide-react';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/50 backdrop-blur-lg border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-primary-600 rounded-lg group-hover:bg-primary-500 transition-colors">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">TripSync <span className="text-primary-400">AI</span></span>
        </Link>

        <div className="flex items-center gap-6">
          {userInfo ? (
            <>
              <Link to="/dashboard" className="nav-link flex items-center gap-1.5">
                <MapIcon className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/create-trip" className="glass-button-primary !py-1.5 !px-4 flex items-center gap-1.5 text-sm">
                <Plus className="w-4 h-4" /> Plan New Trip
              </Link>
              <div className="h-6 w-px bg-white/10 mx-2" />
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-white">{userInfo.name}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">{userInfo.role}</span>
                </div>
                <button onClick={handleLogout} aria-label="Logout" className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="glass-button-primary !py-2 !px-5">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
