/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, Mail, MapPin, Facebook, Youtube, Globe, Diamond, Users, Music, History } from "lucide-react";
import ScrollAnimation from "@/src/components/ScrollAnimation";
import RegistrationForm from "@/src/components/RegistrationForm";
import { Button } from "@/components/ui/button";

type Page = 'home' | 'registration' | 'partners' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Registration", id: "registration" },
    { name: "Our Partners", id: "partners" },
    { name: "Contact Us", id: "contact" },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative min-h-[50vh] md:min-h-screen flex flex-col items-center justify-center pt-16 md:pt-28 overflow-hidden bg-white">
              {/* Background Decorative Elements */}
              <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#1D546D]/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2"></div>
              <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#5F9598]/10 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[#061E29]/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
              
              {/* Line Art Background */}
              <div className="absolute inset-0 z-0 opacity-20 flex items-center justify-center pointer-events-none">
                <img 
                  src="/IMG_20260416_031330.webp" 
                  alt="Line Art Background" 
                  className="w-full h-full object-cover mix-blend-multiply"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="container mx-auto px-4 z-10 text-center space-y-3 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-2xl sm:text-5xl md:text-8xl font-black text-[#061E29] leading-tight tracking-tighter">
                    DIAMOND <span className="text-[#1D546D]">JUBILEE</span>
                  </h1>
                  <p className="text-sm sm:text-2xl md:text-4xl font-medium text-gray-600 mt-1 md:mt-4">
                    60 Years of Shiroil Govt. High School
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="max-w-2xl mx-auto text-xs md:text-xl text-gray-500 font-light leading-relaxed"
                >
                  Join us for a grand celebration of our shared history, achievements, and the enduring spirit of our beloved institution. Let's reunite and reminisce.
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4"
                >
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto h-9 md:h-14 px-5 md:px-10 text-sm md:text-xl font-bold rounded-full bg-[#1D546D] hover:bg-[#061E29] text-white shadow-xl shadow-[#1D546D]/20 transition-all hover:scale-105"
                    onClick={() => setCurrentPage('registration')}
                  >
                    Register Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto h-9 md:h-14 px-5 md:px-10 text-sm md:text-xl font-bold rounded-full border-2 border-gray-200 hover:bg-gray-50 transition-all"
                    onClick={() => {
                      const el = document.getElementById('scroll-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explore History
                  </Button>
                </motion.div>
              </div>

              {/* Floating Elements */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <div className="w-1 h-12 rounded-full bg-gradient-to-b from-[#1D546D] to-transparent"></div>
              </div>
            </section>

            {/* Scroll Animation Section */}
            <section id="scroll-section">
              <ScrollAnimation />
            </section>

            {/* Program Details Section */}
            <section className="py-16 md:py-20 bg-[#F3F4F4] relative overflow-hidden">
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#1D546D 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
              </div>
              
              {/* Colorful Background Blobs - Adjusted for smaller layout */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1D546D]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5F9598]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#061E29]/10 rounded-full blur-[120px]"></div>

              <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <div className="text-center mb-12 md:mb-16">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-block px-3 py-1 rounded-full bg-[#5F9598]/10 text-[#5F9598] font-black uppercase tracking-[0.3em] text-[9px] mb-4"
                  >
                    What to Expect
                  </motion.div>
                  <h2 className="text-3xl md:text-5xl font-black text-[#061E29] tracking-tighter mb-4">Program Highlights</h2>
                  <div className="w-20 h-1.5 bg-gradient-to-r from-[#061E29] via-[#1D546D] to-[#5F9598] mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {[
                    { 
                      title: "Grand Reunion", 
                      desc: "Meet your old classmates and teachers in a nostalgic gathering that bridges generations.", 
                      icon: <Users size={24} />,
                      color: "bg-[#061E29]",
                    },
                    { 
                      title: "Cultural Night", 
                      desc: "Spectacular performances by current students and alumni showcasing our rich heritage.", 
                      icon: <Music size={24} />,
                      color: "bg-[#1D546D]",
                    },
                    { 
                      title: "Exhibition", 
                      desc: "A curated journey through 60 years of school history, achievements, and milestones.", 
                      icon: <History size={24} />,
                      color: "bg-[#5F9598]",
                    },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      whileHover={{ y: -15, scale: 1.02 }}
                      whileTap={{ scale: 0.98, y: -5 }}
                      className={`group relative p-8 ${item.color} rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer`}
                    >
                      <div className="relative z-10">
                        <div className={`w-16 h-16 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-8 shadow-lg`}>
                          {item.icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight leading-tight">{item.title}</h3>
                        <p className="text-white/90 text-sm md:text-lg leading-relaxed font-semibold">{item.desc}</p>
                        
                        <div className="mt-8 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-white">
                          Explore Details 
                          <motion.span 
                            animate={{ x: [0, 6, 0] }} 
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-xl"
                          >
                            →
                          </motion.span>
                        </div>
                      </div>

                      {/* Large Decorative Number */}
                      <div className="absolute -bottom-6 -right-6 text-9xl font-black text-white/10 select-none pointer-events-none italic">
                        {i + 1}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      case 'registration':
        return <RegistrationForm />;
      case 'partners':
        return (
          <div className="min-h-screen pt-16 md:pt-32 pb-10 md:pb-20 bg-[#F3F4F4] relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#1D546D]/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#5F9598]/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2"></div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="text-xl md:text-5xl font-black text-[#061E29] mb-3 md:mb-8 tracking-tighter">Our Partners</h2>
              <div className="w-10 md:w-24 h-0.5 md:h-1.5 bg-[#1D546D] mx-auto mb-3 md:mb-8 rounded-full"></div>
              <p className="text-xs md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                We are grateful to our partners who have supported us in making this Diamond Jubilee celebration possible.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 mt-8 md:mt-20">
                {[
                   { name: "Diamond Partner", color: "bg-[#061E29]", text: "text-[#061E29]", bg: "bg-[#061E29]/5" },
                  { name: "Gold Sponsor", color: "bg-[#1D546D]", text: "text-[#1D546D]", bg: "bg-[#1D546D]/5" },
                  { name: "Silver Sponsor", color: "bg-[#5F9598]", text: "text-[#5F9598]", bg: "bg-[#5F9598]/5" },
                  { name: "Tech Partner", color: "bg-[#061E29]", text: "text-[#061E29]", bg: "bg-[#061E29]/5" },
                  { name: "Media Ally", color: "bg-[#1D546D]", text: "text-[#1D546D]", bg: "bg-[#1D546D]/5" },
                  { name: "Safety Hub", color: "bg-[#5F9598]", text: "text-[#5F9598]", bg: "bg-[#5F9598]/5" },
                  { name: "Food Network", color: "bg-[#061E29]", text: "text-[#061E29]", bg: "bg-[#061E29]/5" },
                  { name: "Community Link", color: "bg-[#1D546D]", text: "text-[#1D546D]", bg: "bg-[#1D546D]/5" },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className={`h-28 md:h-52 ${item.bg} rounded-[1.5rem] md:rounded-[3rem] flex flex-col items-center justify-center p-4 border border-[#1D546D]/10 shadow-sm hover:shadow-xl transition-all cursor-pointer group`}
                  >
                    <div className={`w-8 h-8 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${item.color} mb-2 md:mb-4 transition-opacity`}></div>
                    <span className={`text-[9px] md:text-lg font-black tracking-tighter uppercase ${item.text}`}>{item.name}</span>
                    <span className="text-[7px] md:text-xs font-bold text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity italic">ESTD. 1967</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="min-h-screen pt-16 md:pt-32 pb-10 md:pb-20 bg-[#F3F4F4] relative overflow-hidden">
            {/* Background Blobs for Atmosphere */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#061E29]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1D546D]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#5F9598]/5 rounded-full blur-[100px]"></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                <div className="space-y-6 md:space-y-12">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-2 md:space-y-6"
                  >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#1D546D]/10 text-[#1D546D] font-black uppercase tracking-[0.3em] text-[10px] mb-2">
                      Reach Out
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black text-[#061E29] tracking-tighter leading-none">Get in <span className="text-[#1D546D]">Touch</span></h2>
                    <div className="w-24 h-2 bg-gradient-to-r from-[#061E29] to-[#5F9598] rounded-full"></div>
                    <p className="text-sm md:text-2xl text-gray-600 font-semibold leading-relaxed max-w-lg">
                      Have questions about the diamond jubilee or registration? Our team is here to assist you 24/7.
                    </p>
                  </motion.div>

                  <div className="space-y-4 md:space-y-8">
                    {[
                      { icon: <Phone size={24} />, label: "Phone", value: "+880 1234 567890", color: "bg-[#061E29]/10", text: "text-[#061E29]" },
                      { icon: <Mail size={24} />, label: "Email", value: "info@shiroiljubilee.com", color: "bg-[#1D546D]/10", text: "text-[#1D546D]" },
                      { icon: <MapPin size={24} />, label: "Venue", value: "Shiroil Govt. High School, Rajshahi", color: "bg-[#5F9598]/10", text: "text-[#5F9598]" },
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-4 md:gap-8 group cursor-pointer p-2 rounded-3xl transition-colors hover:bg-white/50"
                      >
                        <div className={`w-12 h-12 md:w-20 md:h-20 rounded-2xl md:rounded-3xl ${item.color} flex items-center justify-center ${item.text} group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                          {item.icon}
                        </div>
                        <div>
                          <p className={`font-black uppercase tracking-widest text-[8px] md:text-sm ${item.text} mb-1 opacity-80`}>{item.label}</p>
                          <p className="text-[#061E29] text-sm md:text-2xl font-black tracking-tight">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white p-6 md:p-14 rounded-[2rem] md:rounded-[4rem] shadow-[0_20px_60px_-15px_rgba(5,22,30,0.1)] border border-[#1D546D]/5 relative overflow-hidden"
                >
                  {/* Decorative form accents */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1D546D]/5 rounded-bl-full"></div>
                  
                  <form className="space-y-4 md:space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                      <div className="space-y-2">
                        <label className="text-[9px] md:text-xs font-black uppercase tracking-[0.3em] text-[#1D546D]">Your Name</label>
                        <input className="w-full h-10 md:h-16 px-4 md:px-8 rounded-xl md:rounded-2xl bg-[#F3F4F4] border-2 border-transparent focus:bg-white focus:border-[#1D546D] focus:ring-4 focus:ring-[#1D546D]/10 transition-all outline-none text-sm md:text-lg font-bold" placeholder="Alex J." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] md:text-xs font-black uppercase tracking-[0.3em] text-[#1D546D]">Email Address</label>
                        <input className="w-full h-10 md:h-16 px-4 md:px-8 rounded-xl md:rounded-2xl bg-[#F3F4F4] border-2 border-transparent focus:bg-white focus:border-[#1D546D] focus:ring-4 focus:ring-[#1D546D]/10 transition-all outline-none text-sm md:text-lg font-bold" placeholder="alex@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-xs font-black uppercase tracking-[0.3em] text-[#1D546D]">Message Subject</label>
                      <input className="w-full h-10 md:h-16 px-4 md:px-8 rounded-xl md:rounded-2xl bg-[#F3F4F4] border-2 border-transparent focus:bg-white focus:border-[#1D546D] focus:ring-4 focus:ring-[#1D546D]/10 transition-all outline-none text-sm md:text-lg font-bold" placeholder="General Inquiry" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-xs font-black uppercase tracking-[0.3em] text-[#1D546D]">How can we help?</label>
                      <textarea rows={4} className="w-full p-4 md:p-8 rounded-xl md:rounded-3xl bg-[#F3F4F4] border-2 border-transparent focus:bg-white focus:border-[#1D546D] focus:ring-4 focus:ring-[#1D546D]/10 transition-all outline-none text-sm md:text-lg font-bold resize-none" placeholder="Your message here..." />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-12 md:h-20 rounded-xl md:rounded-3xl bg-[#1D546D] hover:bg-[#061E29] text-white text-sm md:text-2xl font-black shadow-[0_15px_40px_-10px_rgba(29,77,95,0.4)] transition-all flex items-center justify-center gap-3"
                    >
                      Send Message
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>→</motion.span>
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4] font-sans text-[#061E29] selection:bg-[#1D546D]/20 selection:text-[#061E29]">
      {/* Header */}
      <header className={`fixed left-0 right-0 z-50 pointer-events-none transition-all duration-500 ${isScrolled ? 'top-2 md:top-4' : 'top-4 md:top-6'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between pointer-events-auto">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 md:gap-4 group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-full py-2 px-4 md:px-6 transition-all"
          >
            <div className="relative flex items-center justify-center">
              <img 
                src="/DiamondJubilee.webp" 
                alt="Diamond Jubilee Logo" 
                className="h-8 md:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                }}
                referrerPolicy="no-referrer"
              />
              <div className="fallback-icon hidden w-8 h-8 md:w-10 md:h-10 bg-[#1D546D] rounded-full flex items-center justify-center text-white">
                <Diamond size={20} />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="block text-xs md:text-lg font-black leading-none tracking-tighter text-[#061E29]">DIAMOND JUBILEE</span>
              <span className="text-[6px] md:text-[8px] font-bold text-[#1D546D] tracking-widest uppercase mt-0.5 block">60th Anniversary</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 xl:gap-2 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-full p-1.5 md:p-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id as Page)}
                className={`text-[10px] xl:text-xs font-bold uppercase tracking-widest transition-colors px-3 xl:px-4 py-2 rounded-full hover:bg-white/20 ${
                  currentPage === link.id ? "text-[#061E29] bg-white/40 shadow-sm" : "text-gray-700 hover:text-[#061E29]"
                }`}
              >
                {link.name}
              </button>
            ))}
            <Button 
              onClick={() => setCurrentPage('registration')}
              className="rounded-full px-5 xl:px-6 font-bold bg-[#1D546D] hover:bg-[#061E29] text-white shadow-md ml-1 xl:ml-2"
            >
              Join Program
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-3 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-full text-[#061E29] transition-colors hover:bg-white/30"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-40 bg-white pt-32 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id as Page);
                    setIsMenuOpen(false);
                  }}
                  className={`text-3xl font-black text-left ${
                    currentPage === link.id ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <Button 
                size="lg"
                onClick={() => {
                  setCurrentPage('registration');
                  setIsMenuOpen(false);
                }}
                className="w-full h-16 text-xl font-bold rounded-2xl bg-blue-600"
              >
                Register Now
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-10 md:pt-20 pb-6 md:pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6 md:space-y-8">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="relative shrink-0 w-16 h-16 md:w-32 md:h-32 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10 shadow-inner overflow-hidden group/logo">
                  <img 
                    src="/DiamondJubilee.webp" 
                    alt="Diamond Jubilee Logo" 
                    className="w-4/5 h-4/5 object-contain transition-transform group-hover/logo:scale-110"
                    onError={(e) => {
                      console.error("Footer logo failed to load");
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="fallback-icon hidden text-white/20">
                    <Diamond size={32} />
                  </div>
                </div>
                <div className="pt-1 md:pt-2">
                  <h3 className="text-xl md:text-4xl font-black tracking-tighter leading-none">DIAMOND JUBILEE</h3>
                  <p className="text-gray-400 font-bold mt-1 md:mt-2 tracking-wide uppercase text-[10px] md:text-sm">60th Anniversary Celebration</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed text-xs md:text-base">
                Celebrating six decades of academic excellence, character building, and community service at Shiroil Govt. High School, Rajshahi.
              </p>
              <div className="flex gap-3 md:gap-4">
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1D546D] flex items-center justify-center text-white transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#5F9598] flex items-center justify-center text-white transition-colors">
                  <Youtube size={16} />
                </a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#061E29] flex items-center justify-center text-white transition-colors">
                  <Globe size={16} />
                </a>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <h4 className="text-sm md:text-lg font-bold uppercase tracking-widest text-[#1D546D]">Venue</h4>
              <div className="flex gap-2 md:gap-3 text-gray-400 text-xs md:text-base cursor-pointer hover:text-white transition-colors group">
                <MapPin className="shrink-0 text-[#1D546D] group-hover:scale-110 transition-transform" size={16} />
                <p>Shiroil Govt. High School,<br />Rajshahi, Bangladesh</p>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <h4 className="text-sm md:text-lg font-bold uppercase tracking-widest text-[#5F9598]">Contact</h4>
              <div className="space-y-3 md:space-y-4">
                <div className="flex gap-2 md:gap-3 text-gray-400 text-xs md:text-base cursor-pointer hover:text-white transition-colors group">
                  <Phone className="shrink-0 text-[#5F9598] group-hover:scale-110 transition-transform" size={16} />
                  <p>+880 1234 567890</p>
                </div>
                <div className="flex gap-2 md:gap-3 text-gray-400 text-xs md:text-base cursor-pointer hover:text-white transition-colors group">
                  <Mail className="shrink-0 text-[#5F9598] group-hover:scale-110 transition-transform" size={16} />
                  <p>info@shiroiljubilee.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 md:pt-10 border-t border-gray-800 text-center text-gray-500 text-[10px] md:text-sm font-medium">
            <p>© 2026 Shiroil Govt. High School Diamond Jubilee Committee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
