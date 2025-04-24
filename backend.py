<<<<<<< HEAD
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
import os
from sklearn.preprocessing import StandardScaler
from xgboost import XGBRegressor
from stable_baselines3.common.env_util import make_vec_env
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
DATA_PATH = os.getenv("DATA_PATH")

app = Flask(__name__)
CORS(app)

# ============================
# Load and Preprocess Dataset
# ============================
if not DATA_PATH or not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"Dataset not found at {DATA_PATH}. Please set the correct path in the .env file.")

df = pd.read_csv(DATA_PATH)
df.drop(columns=['Athlete_ID', 'name', 'email_id'], inplace=True, errors='ignore')

if 'Injury_Risk' not in df.columns:
    np.random.seed(42)
    df['Injury_Risk'] = np.random.choice([0, 1], size=len(df))

target = 'Performance_Score'
X = df.drop(columns=[target, 'Injury_Risk'])
y = df[target]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

xgb = XGBRegressor(objective='reg:squarederror', random_state=42, n_estimators=200, max_depth=6, learning_rate=0.05)
xgb.fit(X_scaled, y)

joblib.dump(xgb, "xgboost_performance.pkl")
joblib.dump(scaler, "scaler.pkl")

print("✅ XGBoost Model and Scaler Saved!")

# ============================
# API Endpoints
# ============================

@app.route("/")
def home():
    return jsonify({"message": "Server is running!"})


@app.route('/predict', methods=['POST'])
def predict():
    try:
        if not os.path.exists("xgboost_performance.pkl") or not os.path.exists("scaler.pkl"):
            return jsonify({"error": "Model or Scaler not found! Train the model first."})

        data = request.json.get("features", None)
        if data is None:
            return jsonify({"error": "No input features provided!"})

        model = joblib.load("xgboost_performance.pkl")
        scaler = joblib.load("scaler.pkl")

        data_array = np.array(data).reshape(1, -1)

        # =========================
        # Validate Age, Weight, Height
        # =========================
        age = data_array[0][0]
        weight = data_array[0][1]
        height = data_array[0][2]

        if age < 17 or age > 40:
            return jsonify({"error": "Invalid Age! Must be between 17 and 40."})
        if height < 100 or height > 250:
            return jsonify({"error": "Invalid Height! Must be between 100 and 250 cm."})
        if weight <= 0:
            return jsonify({"error": "Invalid Weight! Must be greater than 0."})

        # Predict
        X_new = scaler.transform(data_array)
        prediction = model.predict(X_new)[0]

        # Apply Weight Penalty
        if weight < 52 or weight > 90:
            penalty_factor = 0.5 if weight < 52 else 0.3
            adjusted_prediction = prediction * penalty_factor
            return jsonify({
                "Performance_Score": float(adjusted_prediction),
                "note": f"Weight {weight}kg is not optimal (52-90 kg). Score penalized."
            })

        return jsonify({"Performance_Score": float(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)})

# ============================
# Run Server
# ============================
if __name__ == '__main__':
=======
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
import os
from sklearn.preprocessing import StandardScaler
from xgboost import XGBRegressor
from stable_baselines3.common.env_util import make_vec_env
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
DATA_PATH = os.getenv("DATA_PATH")

app = Flask(__name__)
CORS(app)

# ============================
# Load and Preprocess Dataset
# ============================
if not DATA_PATH or not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"Dataset not found at {DATA_PATH}. Please set the correct path in the .env file.")

df = pd.read_csv(DATA_PATH)
df.drop(columns=['Athlete_ID', 'name', 'email_id'], inplace=True, errors='ignore')

if 'Injury_Risk' not in df.columns:
    np.random.seed(42)
    df['Injury_Risk'] = np.random.choice([0, 1], size=len(df))

target = 'Performance_Score'
X = df.drop(columns=[target, 'Injury_Risk'])
y = df[target]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

xgb = XGBRegressor(objective='reg:squarederror', random_state=42, n_estimators=200, max_depth=6, learning_rate=0.05)
xgb.fit(X_scaled, y)

joblib.dump(xgb, "xgboost_performance.pkl")
joblib.dump(scaler, "scaler.pkl")

print("✅ XGBoost Model and Scaler Saved!")

# ============================
# API Endpoints
# ============================

@app.route("/")
def home():
    return jsonify({"message": "Server is running!"})


@app.route('/predict', methods=['POST'])
def predict():
    try:
        if not os.path.exists("xgboost_performance.pkl") or not os.path.exists("scaler.pkl"):
            return jsonify({"error": "Model or Scaler not found! Train the model first."})

        data = request.json.get("features", None)
        if data is None:
            return jsonify({"error": "No input features provided!"})

        model = joblib.load("xgboost_performance.pkl")
        scaler = joblib.load("scaler.pkl")

        data_array = np.array(data).reshape(1, -1)

        # =========================
        # Validate Age, Weight, Height
        # =========================
        age = data_array[0][0]
        weight = data_array[0][1]
        height = data_array[0][2]

        if age < 17 or age > 40:
            return jsonify({"error": "Invalid Age! Must be between 17 and 40."})
        if height < 100 or height > 250:
            return jsonify({"error": "Invalid Height! Must be between 100 and 250 cm."})
        if weight <= 0:
            return jsonify({"error": "Invalid Weight! Must be greater than 0."})

        # Predict
        X_new = scaler.transform(data_array)
        prediction = model.predict(X_new)[0]

        # Apply Weight Penalty
        if weight < 52 or weight > 90:
            penalty_factor = 0.5 if weight < 52 else 0.3
            adjusted_prediction = prediction * penalty_factor
            return jsonify({
                "Performance_Score": float(adjusted_prediction),
                "note": f"Weight {weight}kg is not optimal (52-90 kg). Score penalized."
            })

        return jsonify({"Performance_Score": float(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)})

# ============================
# Run Server
# ============================
if __name__ == '__main__':
>>>>>>> aabcc364fd18c3985bb63f96b2c78ccb33d0f85b
    app.run(debug=True)