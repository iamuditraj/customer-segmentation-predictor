import React from 'react';

const MARKETING_TIPS = {
  0: "Consider loyalty rewards to re-engage this group.",
  1: "Balanced offers and mid-range promotions work well.",
  2: "Target with premium products and exclusive deals.",
  3: "Use limited-time discounts to trigger purchases.",
  4: "Bundle deals and value-for-money offers are effective."
};

const CLUSTER_COLORS = {
  0: "teal",
  1: "navy",
  2: "amber",
  3: "red",
  4: "purple"
};

const CLUSTER_DATA = [
  { id: 0, name: "Older Low Spenders", age: 45, income: 25, spending: 20 },
  { id: 1, name: "Moderate Balanced", age: 43, income: 55, spending: 50 },
  { id: 2, name: "Young High Spenders", age: 32, income: 85, spending: 80 },
  { id: 3, name: "High Income Frugal", age: 41, income: 88, spending: 17 },
  { id: 4, name: "Young Low Income Spenders", age: 25, income: 25, spending: 80 },
];

const ResultCard = ({ result, isLoading }) => {
  if (!result && !isLoading) {
    return (
      <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px] animate-fade-in">
        <div className="bg-gray-50 p-6 rounded-full">
          <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">Ready to Analyze</h3>
          <p className="text-gray-500 max-w-xs mx-auto mt-2 text-sm">
            Enter customer data and click Predict to see the segment.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 space-y-8 animate-pulse border border-gray-100 min-h-[400px]">
        <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
        <div className="space-y-3">
          <div className="h-8 w-3/4 bg-gray-200 rounded-lg"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="space-y-4 pt-8 border-t border-gray-50">
          <div className="h-2 w-full bg-gray-100 rounded-full"></div>
          <div className="h-12 w-full bg-gray-50 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const { cluster_id, cluster_name, characteristics, spending_score = 50 } = result;
  const color = CLUSTER_COLORS[cluster_id] || "teal";
  
  const colorClasses = {
    teal: "bg-teal text-white border-teal text-teal-600 bg-teal-50",
    navy: "bg-navy text-white border-navy text-navy bg-navy/5",
    amber: "bg-amber-500 text-white border-amber-500 text-amber-600 bg-amber-50",
    red: "bg-red-500 text-white border-red-500 text-red-600 bg-red-50",
    purple: "bg-purple-500 text-white border-purple-500 text-purple-600 bg-purple-50"
  };

  const badgeClasses = {
    teal: "bg-teal",
    navy: "bg-navy",
    amber: "bg-amber-500",
    red: "bg-red-500",
    purple: "bg-purple-500"
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Result Card */}
      <div className={`bg-white rounded-3xl shadow-xl p-8 space-y-6 border transition-all duration-500`}>
        <div className={`inline-flex items-center px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest text-white ${badgeClasses[color]}`}>
          Cluster {cluster_id}
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl font-black text-navy">{cluster_name}</h2>
          <p className="text-gray-400 font-medium text-sm flex items-center">
            <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {characteristics}
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-end mb-2">
            <h4 className="font-bold text-navy text-xs uppercase tracking-wider">Spending Score Confidence</h4>
            <span className="text-xl font-black text-teal">{spending_score}</span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
             <div 
               className={`h-full transition-all duration-1000 ease-out ${badgeClasses[color]}`}
               style={{ width: `${spending_score}%` }}
             ></div>
          </div>
        </div>

        <div className="bg-gray-50 px-5 py-4 rounded-2xl flex items-start space-x-3 border border-gray-100">
          <div className={`p-2 rounded-lg bg-teal/10`}>
            <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h5 className="font-bold text-navy text-xs uppercase tracking-tight mb-0.5">Marketing Tip</h5>
            <p className="text-gray-700 font-medium leading-relaxed text-sm">
               {MARKETING_TIPS[cluster_id]}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-navy font-black text-base uppercase tracking-widest mb-4 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Compare Clusters
        </h3>
        <div className="overflow-hidden rounded-2xl border border-gray-100">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-400 font-black uppercase tracking-tighter">
                <th className="px-4 py-3">Cluster ID</th>
                <th className="px-4 py-3">Avg. Age</th>
                <th className="px-4 py-3 text-center">Avg. Income</th>
                <th className="px-4 py-3 text-right">Avg. Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {CLUSTER_DATA.map((cluster) => (
                <tr 
                  key={cluster.id} 
                  className={`transition-colors ${cluster.id === cluster_id ? 'bg-teal/10 font-bold' : 'hover:bg-gray-50'}`}
                >
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] text-white ${badgeClasses[CLUSTER_COLORS[cluster.id]]}`}>
                      {cluster.id}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{cluster.age}y</td>
                  <td className="px-4 py-3 text-center text-gray-600">${cluster.income}k</td>
                  <td className={`px-4 py-3 text-right font-black ${cluster.id === cluster_id ? 'text-teal' : 'text-gray-400'}`}>
                    {cluster.spending}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-gray-400 mt-4 text-center italic font-medium">
          Source: K-Means segmentation analysis of 200 Mall Customer records.
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
