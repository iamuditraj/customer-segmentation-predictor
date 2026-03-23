# Customer Segmentation Predictor

A full-stack application for predicting customer segments using K-Means clustering.

## Folder Structure

```text
DS/
├── backend/                          # Flask Backend
│   ├── Mall_Customers.csv            # Dataset
│   ├── app.py                        # Main entry point
│   ├── ml_final.py                   # ML Analysis script
│   └── requirements.txt              # Python dependencies
├── frontend/                         # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputForm.jsx
│   │   │   └── ResultCard.jsx
│   │   ├── App.jsx
│   │   └── ...
│   └── vite.config.js
└── README.md                         # This file
```

## Getting Started

### 1. Prerequisites
Ensure you have Python and Node.js installed.

### 2. Setup and Run Backend
1. Open a terminal in the `DS/` folder.
2. Navigate to the backend directory:
   ```powershell
   cd backend
   ```
3. (Optional) Activate your virtual environment:
   ```powershell
   .\venv\Scripts\activate
   ```
4. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
5. Run the Flask server:
   ```powershell
   python app.py
   ```
The backend will run on `http://127.0.0.1:5000`.

### 3. Setup and Run Frontend
1. Open a new terminal in the `DS/` folder.
2. Navigate to the frontend directory:
   ```powershell
   cd frontend
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Run the development server:
   ```powershell
   npm run dev
   ```
The frontend will be available at `http://localhost:5173`.

## Testing the API
You can test the backend independently using `curl` from your terminal:

```bash
curl -X POST http://localhost:5000/predict \
     -H "Content-Type: application/json" \
     -d '{"age": 25, "annual_income": 60, "spending_score": 80}'
```

**Expected JSON Response:**
```json
{
  "cluster_id": 2,
  "cluster_name": "Young High Income High Spenders",
  "characteristics": "Low Age · High Income · High Spending"
}
```

## Features
- **Real-time Prediction**: Backend trains the KMeans model on startup for fast responses.
- **Smart UI**: Frontend uses Tailwind CSS for a premium look and feel.
- **Proxy Configuration**: Frontend uses a Vite proxy to communicate with the backend via `/api/predict`.
