import React, { useState } from 'react';

const PRESET_PROFILES = [
  { age: 22, annual_income: 80, spending_score: 90 }, // Profile 1: Young High Spender
  { age: 45, annual_income: 85, spending_score: 15 }, // Profile 2: High Income Frugal
  { age: 55, annual_income: 25, spending_score: 20 }, // Profile 3: Older Low Spender
];

const InputForm = ({ onPredict, isLoading }) => {
  const [formData, setFormData] = useState({
    age: 25,
    annual_income: 50,
    spending_score: 50
  });

  const [errors, setErrors] = useState({});
  const [profileIndex, setProfileIndex] = useState(0);

  const validate = () => {
    const newErrors = {};
    if (formData.age < 18 || formData.age > 70) newErrors.age = "Age must be between 18 and 70";
    if (formData.annual_income < 1 || formData.annual_income > 150) newErrors.annual_income = "Income must be between 1 and 150";
    if (formData.spending_score < 1 || formData.spending_score > 100) newErrors.spending_score = "Spending score must be between 1 and 100";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleTryExample = () => {
    const nextProfile = PRESET_PROFILES[profileIndex];
    setFormData(nextProfile);
    setProfileIndex((profileIndex + 1) % PRESET_PROFILES.length);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onPredict(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-2">
         <h3 className="text-gray-500 font-bold uppercase text-xs tracking-widest">Customer Profile</h3>
         <button 
           type="button" 
           onClick={handleTryExample}
           className="text-teal font-bold text-xs hover:text-teal-700 transition-colors uppercase tracking-widest bg-teal/5 px-3 py-1.5 rounded-lg border border-teal/10"
         >
           Try an Example
         </button>
      </div>

      {/* Age Card */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 transition-all hover:bg-white hover:shadow-md">
        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-600 font-bold text-sm">Age (years)</label>
          <span className="text-teal font-black text-lg">{formData.age}</span>
        </div>
        <input
          type="number"
          name="age"
          min="18"
          max="70"
          value={formData.age}
          onChange={handleChange}
          className={`w-full px-3 py-2 rounded-lg bg-white border outline-none transition-all ${
            errors.age ? 'border-red-400 ring-4 ring-red-50' : 'border-gray-200 focus:border-teal'
          }`}
        />
        {errors.age && <p className="text-red-500 text-xs mt-1.5 font-bold italic">{errors.age}</p>}
      </div>

      {/* Income Card */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 transition-all hover:bg-white hover:shadow-md">
        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-600 font-bold text-sm">Annual Income (k$)</label>
          <span className="text-teal font-black text-lg">{formData.annual_income}</span>
        </div>
        <input
          type="number"
          name="annual_income"
          min="1"
          max="150"
          value={formData.annual_income}
          onChange={handleChange}
          className={`w-full px-3 py-2 rounded-lg bg-white border outline-none transition-all ${
            errors.annual_income ? 'border-red-400 ring-4 ring-red-50' : 'border-gray-200 focus:border-teal'
          }`}
        />
        {errors.annual_income && <p className="text-red-500 text-xs mt-1.5 font-bold italic">{errors.annual_income}</p>}
      </div>

      {/* Spending Score Card */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 transition-all hover:bg-white hover:shadow-md">
        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-600 font-bold text-sm">Spending Score (1-100)</label>
          <span className="text-teal font-black text-lg">{formData.spending_score}</span>
        </div>
        <input
          type="range"
          name="spending_score"
          min="1"
          max="100"
          value={formData.spending_score}
          onChange={handleChange}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal"
        />
        {errors.spending_score && <p className="text-red-500 text-xs mt-1.5 font-bold italic">{errors.spending_score}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-xl font-black text-white transition-all shadow-lg flex items-center justify-center space-x-2 ${
          isLoading ? 'bg-gray-400' : 'bg-teal hover:bg-teal-700 active:scale-95'
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Predicting...</span>
          </>
        ) : (
          <span>Predict Segment</span>
        )}
      </button>
    </form>
  );
};

export default InputForm;
