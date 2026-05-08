import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { Calendar, MapPin, Clock, Star, Navigation, Share2, Download, Bot, ChevronRight, TrendingUp } from 'lucide-react';
import api from '../services/api';
import AIChatbot from '../components/ui/AIChatbot';

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(0);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await api.get(`/trips/${id}`);
        setTrip(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  if (loading) return <div className="h-96 flex items-center justify-center"><Bot className="w-12 h-12 animate-bounce text-primary-400" /></div>;
  if (!trip) return <div>Trip not found</div>;

  const mapContainerStyle = { width: '100%', height: '100%', borderRadius: '1.5rem' };
  const center = trip.itinerary?.[activeDay]?.locations?.[0]?.coordinates || { lat: 35.6762, lng: 139.6503 };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary-400 font-medium mb-2">
            <MapPin className="w-4 h-4" />
            {trip.destination}
          </div>
          <h1 className="text-4xl font-bold text-white">{trip.duration} Days in {trip.destination.split(',')[0]}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(`/trip/${id}/expenses`)} className="glass-button-secondary flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Expenses
          </button>
          <button className="glass-button-primary flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Itinerary Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Day Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {trip.itinerary.map((day, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
                  activeDay === i 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/40' 
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                Day {day.day}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Planned Activities</h2>
              {trip.itinerary[activeDay].activities.map((activity, j) => (
                <div key={j} className="glass-card p-6 flex gap-6 group hover:bg-white/[0.08] transition-all">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-400 font-bold mb-2">
                      {activity.time}
                    </div>
                    <div className="w-0.5 flex-1 bg-white/5 rounded-full" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{activity.location}</h3>
                      <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
                        <Star className="w-4 h-4 fill-current" />
                        4.8
                      </div>
                    </div>
                    <p className="text-slate-400 mb-4 leading-relaxed">{activity.description}</p>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Clock className="w-4 h-4" />
                        {activity.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Navigation className="w-4 h-4" />
                        Next: {activity.nextTravelTime || '15 mins'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Map & Context */}
        <div className="space-y-8">
          <div className="h-96 glass-card overflow-hidden">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={13}
                options={{
                  styles: [
                    { elementType: "geometry", stylers: [{ color: "#1e293b" }] },
                    { elementType: "labels.text.stroke", stylers: [{ color: "#1e293b" }] },
                    { elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
                  ]
                }}
              >
                {trip.itinerary[activeDay].locations?.map((loc, idx) => (
                  <Marker key={idx} position={loc.coordinates} label={`${idx + 1}`} />
                ))}
              </GoogleMap>
            ) : <div className="h-full bg-slate-900 animate-pulse" />}
          </div>

          <div className="glass-card p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              AI Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10 text-green-400 text-sm">
                <strong>Optimization:</strong> This route saves 45 minutes of travel time compared to typical patterns.
              </div>
              <div className="p-4 rounded-2xl bg-primary-500/5 border border-primary-500/10 text-primary-400 text-sm">
                <strong>Weather Alert:</strong> Slight chance of rain on Day 3 afternoon. Indoor activities recommended.
              </div>
            </div>
          </div>
        </div>
      </div>

      <AIChatbot tripContext={trip} />
    </div>
  );
};

export default TripDetail;
