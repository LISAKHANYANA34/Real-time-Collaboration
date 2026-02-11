import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Globe, Eye, EyeOff, Chrome } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { saveUserToFirestore } from '../lib/userService';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await saveUserToFirestore(user);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err.code, err.message);
      
      // SPECIFIC ERROR MESSAGES - NOW IN REAL ENGLISH!
      if (err.code === 'auth/user-not-found') {
        setError('❌ No account found with this email. Please sign up first.');
      } else if (err.code === 'auth/wrong-password') {
        setError('❌ Incorrect password. Please try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('❌ Invalid email format. Please use a valid email address.');
      } else if (err.code === 'auth/user-disabled') {
        setError('❌ This account has been disabled. Contact support.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('❌ Too many failed attempts. Please try again later.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('❌ Network error. Check your internet connection.');
      } else if (err.code === 'auth/invalid-credential') {
        // This is the generic error Firebase gives when email/password combo is wrong
        setError('❌ Invalid email or password. Please try again.');
      } else {
        setError('❌ Login failed: ' + (err.message || 'Unknown error'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await saveUserToFirestore(user);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Google login error:', err.code);
      
      if (err.code === 'auth/popup-closed-by-user') {
        setError('❌ Sign-in cancelled. Please try again.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('❌ Popup was blocked. Please allow popups for this site.');
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        setError('❌ An account already exists with the same email but different sign-in method.');
      } else {
        setError('❌ Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">CanvasCollab</h1>
          </div>
          <p className="text-slate-400 mt-2">Sign in with your Google account</p>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full mb-4 px-4 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-lg font-semibold transition-all flex items-center justify-center shadow-lg"
        >
          <Chrome className="h-5 w-5 mr-3 text-blue-600" />
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-900 text-slate-400">Or sign in with email</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gmail.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-10 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="text-right mt-2">
                <button 
                  type="button"
                  onClick={() => alert('Password reset will be sent to your email')}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign up with Google
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
