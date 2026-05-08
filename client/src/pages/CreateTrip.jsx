import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, MapPin, Calendar, Users, Wallet, Utensils, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import api from '../services/api';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [autocomplete, setAutocomplete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    duration: 3,
    budget: 'moderate',
    travelStyle: 'adventure',
    foodPreference: 'anything',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/trips', formData);
      navigate(`/trip/${data._id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Design Your Journey</h1>
        <p className="text-slate-400 max-w-lg mx-auto">Fill in your preferences, and our AI will engineer the perfect itinerary for you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Destination */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Where to?</h3>
            </div>
            <Autocomplete
              onLoad={(ref) => setAutocomplete(ref)}
              onPlaceChanged={() => {
                if (autocomplete !== null) {
                  const place = autocomplete.getPlace();
                  setFormData({...formData, destination: place.formatted_address || place.name});
                }
              }}
            >
              <input 
                type="text" 
                required
                className="glass-input w-full"
                placeholder="e.g. Tokyo, Japan"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
              />
            </Autocomplete>
          </motion.div>

          {/* Dates */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">When?</h3>
            </div>
            <div className="flex gap-4">
              <input 
                type="date" 
                required
                className="glass-input flex-1"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
              <input 
                type="number" 
                min="1"
                max="14"
                className="glass-input w-24"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              />
            </div>
          </motion.div>
        </div>

        {/* Preferences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Budget */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4 text-slate-300 font-medium">
              <Wallet className="w-4 h-4" /> Budget
            </div>
            <select 
              className="glass-input w-full"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
            >
              <option value="economy">Economy</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          {/* Travel Style */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4 text-slate-300 font-medium">
              <Plane className="w-4 h-4" /> Style
            </div>
            <select 
              className="glass-input w-full"
              value={formData.travelStyle}
              onChange={(e) => setFormData({...formData, travelStyle: e.target.value})}
            >
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="relaxing">Relaxing</option>
              <option value="family">Family</option>
            </select>
          </div>

          {/* Food */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4 text-slate-300 font-medium">
              <Utensils className="w-4 h-4" /> Food
            </div>
            <select 
              className="glass-input w-full"
              value={formData.foodPreference}
              onChange={(e) => setFormData({...formData, foodPreference: e.target.value})}
            >
              <option value="anything">Anything</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="halal">Halal</option>
            </select>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit" 
          disabled={loading}
          aria-label={loading ? "Generating your itinerary" : "Generate itinerary"}
          className="glass-button-primary w-full py-6 text-xl flex items-center justify-center gap-3 shadow-2xl shadow-primary-500/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              AI is Engineering Your Trip...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              Generate Itinerary
              <ArrowRight className="w-6 h-6" />
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default CreateTrip;
