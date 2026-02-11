import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Chrome } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { saveUserToFirestore } from '../lib/userService';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await saveUserToFirestore(user);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign up cancelled. Please try again.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked. Please allow popups for this site.');
      } else {
        setError('Failed to sign up with Google. Please try again.');
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
          <p className="text-slate-400 mt-2">Create your account with Google</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Google Sign-Up Button - ONLY OPTION */}
        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full px-4 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-lg font-semibold transition-all flex items-center justify-center shadow-lg"
        >
          <Chrome className="h-5 w-5 mr-3 text-blue-600" />
          {loading ? 'Creating account...' : 'Sign up with Google'}
        </button>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-400 hover:text-blue-300 font-medium hover:underline"
            >
              Sign in with Google
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-8">
          © 2026 CanvasCollab. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
