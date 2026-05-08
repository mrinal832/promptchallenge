import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Calendar, MapPin, TrendingUp, Clock, ChevronRight } from 'lucide-react';
import api from '../services/api';

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await api.get('/trips');
        setTrips(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">My Journeys</h1>
          <p className="text-slate-400">Manage your upcoming and past travel experiences.</p>
        </div>
        <Link to="/create-trip" className="glass-button-primary flex items-center gap-2 w-fit">
          <Plus className="w-5 h-5" />
          Plan New Trip
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Trips', value: trips.length, icon: <Calendar className="text-primary-400" />, color: 'bg-primary-500/10' },
          { label: 'Countries', value: '12', icon: <MapPin className="text-accent" />, color: 'bg-accent/10' },
          { label: 'Exp. Points', value: '2,450', icon: <TrendingUp className="text-green-400" />, color: 'bg-green-500/10' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex items-center gap-5"
          >
            <div className={`p-4 rounded-2xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trip List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white ml-1">Recent Itineraries</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card h-64 animate-pulse bg-white/5" />
            ))}
          </div>
        ) : trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, i) => (
              <motion.div
                key={trip._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/trip/${trip._id}`} className="glass-card block overflow-hidden group hover:border-primary-500/30 transition-all">
                  <div className="h-40 bg-gradient-to-br from-primary-600/20 to-accent/20 relative">
                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10">
                      {trip.style}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{trip.destination}</h3>
                    <div className="flex items-center gap-4 text-slate-400 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : 'TBD'}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ChevronRight className="w-4 h-4" />
                        {trip.duration} Days
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-20 text-center">
            <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No trips planned yet</h3>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto">Start your first intelligent journey by creating an AI-powered itinerary.</p>
            <Link to="/create-trip" className="glass-button-primary inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create My First Trip
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
