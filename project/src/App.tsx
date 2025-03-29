import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, TrendingUp, School, Users, ChevronRight, BarChart2, GraduationCap, Menu, X, Twitter, Disc as Discord, Youtube, Facebook } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuthStore } from './store/authStore';

// Mock data for the chart
const marketData = [
  { time: '00:00', EUR: 1.0921, BTC: 52000 },
  { time: '04:00', EUR: 1.0925, BTC: 51800 },
  { time: '08:00', EUR: 1.0918, BTC: 52200 },
  { time: '12:00', EUR: 1.0930, BTC: 52400 },
  { time: '16:00', EUR: 1.0928, BTC: 52100 },
  { time: '20:00', EUR: 1.0932, BTC: 52300 },
];

const forexFacts = [
  "The forex market trades over $6.6 trillion per day",
  "The most traded currency pair is EUR/USD",
  "Forex trading operates 24 hours a day, 5 days a week",
  "The modern forex market began in the 1970s",
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const { user, signIn, signUp } = useAuthStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % forexFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold">Astral Pips Institute</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
                <Link to="/forum" className="text-gray-700 hover:text-blue-600">Forum</Link>
                <Link to="/markets" className="text-gray-700 hover:text-blue-600">Markets</Link>
                {user ? (
                  <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Dashboard
                  </Link>
                ) : (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Sign In
                  </button>
                )}
              </div>
              
              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link to="/courses" className="text-gray-700">Courses</Link>
                <Link to="/forum" className="text-gray-700">Forum</Link>
                <Link to="/markets" className="text-gray-700">Markets</Link>
                {user ? (
                  <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center">
                    Dashboard
                  </Link>
                ) : (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Master the Markets with Confidence</h1>
              <p className="text-xl mb-8">Learn forex, crypto, and derivatives trading through our comprehensive, gamified education platform.</p>
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center">
                Start Your Journey
                <ChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Live Market Overview</h2>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="EUR" stroke="#2563eb" />
                <Line yAxisId="right" type="monotone" dataKey="BTC" stroke="#f59e0b" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Forex Facts */}
        <div className="bg-blue-50 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Did You Know?</h3>
              <p className="text-lg text-gray-700 transition-opacity duration-500">
                {forexFacts[currentFact]}
              </p>
            </div>
          </div>
        </div>

        {/* Course Levels */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Your Learning Path</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <School className="w-10 h-10 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Forex Fundamentals</h3>
              <p className="text-gray-600 mb-4">Master the basics of currency trading.</p>
              <div className="h-2 bg-gray-200 rounded-full mb-4">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <button className="text-blue-600 font-semibold flex items-center">
                Continue Learning <ChevronRight className="ml-1" />
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <BarChart2 className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Crypto Trading</h3>
              <p className="text-gray-600 mb-4">Understand blockchain and crypto markets.</p>
              <div className="h-2 bg-gray-200 rounded-full mb-4">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <button className="text-blue-600 font-semibold flex items-center">
                Start Module <ChevronRight className="ml-1" />
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <GraduationCap className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Advanced Derivatives</h3>
              <p className="text-gray-600 mb-4">Learn options and futures trading.</p>
              <div className="h-2 bg-gray-200 rounded-full mb-4">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <button className="text-blue-600 font-semibold flex items-center">
                Unlock Course <ChevronRight className="ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Join Our Trading Community</h2>
              <p className="text-gray-600">Connect with fellow traders, share insights, and learn together.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Learning Forum</h3>
                <p className="text-gray-600 mb-4">Ask questions, share knowledge, and help others learn.</p>
                <Link to="/forum" className="text-blue-600 font-semibold flex items-center">
                  Visit Forum <ChevronRight className="ml-1" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Trading Discussion</h3>
                <p className="text-gray-600 mb-4">Discuss market analysis, strategies, and trade ideas.</p>
                <Link to="/discussion" className="text-blue-600 font-semibold flex items-center">
                  Join Discussion <ChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4">About Astral Pips</h4>
                <p className="text-sm">Your premier destination for comprehensive financial markets education.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                  <li><Link to="/forum" className="hover:text-white">Forum</Link></li>
                  <li><Link to="/support" className="hover:text-white">Support</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/market-analysis" className="hover:text-white">Market Analysis</Link></li>
                  <li><Link to="/economic-calendar" className="hover:text-white">Economic Calendar</Link></li>
                  <li><Link to="/trading-tools" className="hover:text-white">Trading Tools</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-white"><Twitter className="h-5 w-5" /></a>
                  <a href="#" className="hover:text-white"><Discord className="h-5 w-5" /></a>
                  <a href="#" className="hover:text-white"><Youtube className="h-5 w-5" /></a>
                  <a href="#" className="hover:text-white"><Facebook className="h-5 w-5" /></a>
                </div>
                <div className="mt-4">
                  <p className="text-sm">Need help? Contact support:</p>
                  <a href="mailto:support@astralpips.com" className="text-sm text-blue-400 hover:text-blue-300">
                    support@astralpips.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;