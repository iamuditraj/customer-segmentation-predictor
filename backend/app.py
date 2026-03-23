from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
import os

app = Flask(__name__)
# Enable CORS for http://localhost:5173
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Configuration and Model training
CSV_PATH = 'Mall_Customers.csv'
FEATURES = ['Age', 'Annual Income (k$)', 'Spending Score (1-100)']

# Cluster mapping
CLUSTER_INFO = {
    0: {
        "name": "Older Low Income Low Spenders",
        "characteristics": "High Age · Low Income · Low Spending"
    },
    1: {
        "name": "Moderate Balanced",
        "characteristics": "Medium Age · Medium Income · Medium Spending"
    },
    2: {
        "name": "Young High Income High Spenders",
        "characteristics": "Low Age · High Income · High Spending"
    },
    3: {
        "name": "High Income but Frugal",
        "characteristics": "Medium Age · High Income · Low Spending"
    },
    4: {
        "name": "Young Low Income High Spenders",
        "characteristics": "Low Age · Low Income · High Spending"
    }
}

def train_model():
    if not os.path.exists(CSV_PATH):
        raise FileNotFoundError(f"{CSV_PATH} not found.")
    
    df = pd.read_csv(CSV_PATH)
    X = df[FEATURES]
    
    # Train KMeans model
    kmeans = KMeans(n_clusters=5, n_init=10, random_state=42)
    kmeans.fit(X)
    return kmeans

# Train the model once at startup
try:
    model = train_model()
except Exception as e:
    print(f"Error training model: {e}")
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not trained"}), 500
    
    try:
        data = request.get_json()
        
        # Extract features from JSON
        age = data.get('age')
        income = data.get('annual_income')
        spending = data.get('spending_score')
        
        if any(v is None for v in [age, income, spending]):
            return jsonify({"error": "Missing input data"}), 400
        
        # Prepare input for prediction
        input_data = np.array([[age, income, spending]])
        cluster_id = int(model.predict(input_data)[0])
        
        info = CLUSTER_INFO.get(cluster_id, {
            "name": "Unknown",
            "characteristics": "Unknown"
        })
        
        return jsonify({
            "cluster_id": cluster_id,
            "cluster_name": info["name"],
            "characteristics": info["characteristics"]
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
