# ============================
#       Import Libraries
# ============================
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.preprocessing import StandardScaler
from xgboost import XGBRegressor, plot_importance

from stable_baselines3 import DQN
from stable_baselines3.common.env_util import make_vec_env
import gymnasium as gym
import joblib 

# ============================
#       Load and Preprocess Data
# ============================
df = pd.read_csv(r"C:\Users\HP\OneDrive\Documents\RStudio_files\project\sports_data_encoded.csv")

# Feature selection
df.drop(columns=['Athlete_ID', 'name', 'email_id'], inplace=True, errors='ignore')

# Ensure Injury_Risk column exists
if 'Injury_Risk' not in df.columns:
    np.random.seed(42)
    df['Injury_Risk'] = np.random.choice([0, 1], size=len(df))

# ============================
#   Custom Handling for Age, Height, and Weight
# ============================

# 1. Age: Clip between [17, 40] and create Age_Factor
if 'Age' in df.columns:
    df['Age'] = df['Age'].apply(lambda x: np.clip(x, 17, 40))
    df['Age_Factor'] = df['Age'].apply(lambda x: (40 - x) / (40 - 17))  # Normalize 17-40

# 2. Height: Clip between [100, 200] and create Height_Advantage
if 'Height' in df.columns:
    df['Height'] = np.clip(df['Height'], 100, 200)
    df['Height_Advantage'] = (df['Height'] - 100) / (200 - 100)

# 3. Weight Handling
if 'Weight' in df.columns:
    # Handle invalid weights
    invalid_weights = df[df['Weight'] <= 0]
    if not invalid_weights.empty:
        print("[Warning] Invalid weight(s) found (0 or less):")
        print(invalid_weights[['Weight']])
    df = df[df['Weight'] > 0]

    # Penalize extremely high weights (>150)
    df.loc[df['Weight'] > 150, 'Performance_Score'] = 1  # Minimum possible score
    print("[Info] Performance score downgraded for weight > 150 kg.")

    # Optional: If you want to filter for healthy range [52, 90] — comment if you don't want
    # df = df[(df['Weight'] > 52) & (df['Weight'] <= 90)]


# ============================
#   Performance Score Regression
# ============================
plt.figure(figsize=(10, 8))
corr = df.corr()
sns.heatmap(corr[['Performance_Score']].sort_values(by='Performance_Score', ascending=False), annot=True, cmap='coolwarm')
plt.title("Feature Correlation with Performance Score")
plt.show()

# Features and Target
target = 'Performance_Score'
X = df.drop(columns=[target, 'Injury_Risk'])
y = df[target]

# Scale the data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# ================================
#  XGBoost Hyperparameter Tuning
# ================================
xgb = XGBRegressor(objective='reg:squarederror', random_state=42)

param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [4, 6, 8],
    'learning_rate': [0.01, 0.05, 0.1],
    'subsample': [0.8, 1.0],
}

grid_search = GridSearchCV(estimator=xgb, param_grid=param_grid, cv=3, scoring='r2', n_jobs=-1, verbose=1)
grid_search.fit(X_train, y_train)

best_xgb = grid_search.best_estimator_
print("✅ Best XGBoost Parameters:", grid_search.best_params_)

# Predict and Evaluate
y_pred_xgb = best_xgb.predict(X_test)

def evaluate(y_true, y_pred):
    print("\n[ XGBoost Final Model Evaluation ]")
    print("R² Score :", r2_score(y_true, y_pred))
    print("MAE      :", mean_absolute_error(y_true, y_pred))
    print("RMSE     :", np.sqrt(mean_squared_error(y_true, y_pred)))

evaluate(y_test, y_pred_xgb)

# Plot Feature Importance
plt.figure(figsize=(12, 6))
plot_importance(best_xgb, max_num_features=10, importance_type='gain')
plt.title("Top Feature Importance - XGBoost")
plt.show()