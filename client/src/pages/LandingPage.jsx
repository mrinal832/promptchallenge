import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Shield, Zap, ArrowRight, Star } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="pt-20 pb-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>The Future of Intelligent Travel is Here</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight"
        >
          Your Next Adventure, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent">Engineered by AI.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Experience hyper-personalized itineraries, real-time route optimization, 
          and seamless group collaboration. All powered by the latest Gemini AI.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/register" className="glass-button-primary !text-lg !px-8 !py-4 flex items-center gap-2">
            Start Planning Free <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="glass-button-secondary !text-lg !px-8 !py-4">
            View Sample Trip
          </button>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Globe className="w-8 h-8 text-primary-400" />,
            title: "Global Intelligence",
            desc: "AI-powered discovery of hidden gems and local favorites tailored to your style."
          },
          {
            icon: <Zap className="w-8 h-8 text-yellow-400" />,
            title: "Real-time Adaptation",
            desc: "Instantly updates your itinerary based on weather, traffic, and unexpected delays."
          },
          {
            icon: <Shield className="w-8 h-8 text-green-400" />,
            title: "Smart Budgeting",
            desc: "Advanced expense tracking and predictive analytics to keep your finances on track."
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 hover:bg-white/[0.08] transition-all cursor-default group"
          >
            <div className="mb-6 p-3 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="py-20 glass-card bg-gradient-to-r from-primary-600/10 to-accent/10 border-none overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 grid md:grid-cols-4 gap-8 text-center px-8">
          {[
            { label: "AI Suggestions", val: "10M+" },
            { label: "Happy Travelers", val: "50k+" },
            { label: "Countries Covered", val: "190+" },
            { label: "Average Rating", val: "4.9/5" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-bold text-white mb-1">{stat.val}</div>
              <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
