import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Prediction failed. Please check if the backend is running.');
      }

      const data = await response.json();
      setResult({ ...data, ...formData });
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <nav className="bg-navy text-white py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col items-center sm:items-start">
          <h1 className="text-3xl font-bold tracking-tight">
            Customer Segmentation Predictor
          </h1>
          <p className="text-teal font-medium mt-1">
            K-Means Clustering Model
          </p>
        </div>
      </nav>
      
      {/* Error Banner */}
      {error && (
        <div className="bg-red-500 text-white py-3 px-8 shadow-sm flex justify-between items-center animate-fade-in relative z-50">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Could not connect to the prediction server. Make sure the Flask backend is running.</span>
          </div>
          <button 
            onClick={() => setError(null)} 
            className="hover:bg-red-600 p-1 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-6 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left: Input Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-navy mb-6">Customer Details</h2>
            <InputForm onPredict={handlePredict} isLoading={loading} />
          </div>

          {/* Right: Result Card */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-navy mb-6">Segmentation Result</h2>
            <ResultCard result={result} isLoading={loading} />
          </div>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        &copy; 2024 Customer Segmentation Predictor
      </footer>
    </div>
  );
}

export default App;
