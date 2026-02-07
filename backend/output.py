import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib

# ==============================

# ==============================
# 1. LOAD DATA
# ==============================
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "..", "data")
OUTPUT_DIR = os.path.join(BASE_DIR, "..", "outputs")

df = pd.read_csv(os.path.join(DATA_DIR, "model_file_withclosesensex(Sheet1).csv"))

# Standardize column names
df.columns = df.columns.str.strip().str.upper().str.replace(" ", "_")

print("Columns loaded:", df.columns.tolist())

# ==============================
# 2. CLEAN NUMERIC DATA
# ==============================
numeric_cols = [
    "GST_YOY_LAG1",
    "IIP_GROWTH_LAG1",
    "ECI_GROWTH_LAG1",
    "REPO_LAG1",
    "USDINR_CHANGE_LAG1",
    "CRUDE_CHANGE",
    "GOLD_CHANGE",
    "FPI_LAG1",
    "SENSEX_RETURN",
    "CLOSE_SENSEX"
]

for col in numeric_cols:
    df[col] = df[col].astype(str).str.replace(",", "").astype(float)

print("Numeric columns cleaned")

# ==============================
# 3. LOAD MODEL & SCALER (PKL)
# ==============================
model = joblib.load(os.path.join(DATA_DIR, "bullish_model.pkl"))
scaler = joblib.load(os.path.join(DATA_DIR, "scaler.pkl"))

print("Model and scaler loaded successfully")

# ==============================
# 4. DEFINE FEATURES
# ==============================
features = [
    "GST_YOY_LAG1",
    "IIP_GROWTH_LAG1",
    "ECI_GROWTH_LAG1",
    "REPO_LAG1",
    "USDINR_CHANGE_LAG1",
    "CRUDE_CHANGE",
    "GOLD_CHANGE",
    "FPI_LAG1"
]

X = df[features]
X_scaled = scaler.transform(X)

# ==============================
# 5. BULLISH PROBABILITY
# ==============================
df["BULLISH_PROBABILITY"] = model.predict_proba(X_scaled)[:, 1]

print("Bullish probability calculated")

# ==============================
# 6. EXPECTED RETURN
# ==============================
avg_pos = df[df["SENSEX_RETURN"] > 0]["SENSEX_RETURN"].mean()
avg_neg = df[df["SENSEX_RETURN"] < 0]["SENSEX_RETURN"].mean()

df["EXPECTED_RETURN"] = (
    df["BULLISH_PROBABILITY"] * avg_pos +
    (1 - df["BULLISH_PROBABILITY"]) * avg_neg
)

print("Expected return calculated")

# ==============================
# 7. EXPECTED SENSEX
# ==============================
df["EXPECTED_SENSEX"] = (
    df["CLOSE_SENSEX"].iloc[0] *
    (1 + df["EXPECTED_RETURN"]).cumprod()
)

print("Expected Sensex generated")

# ==============================
# 8. COEFFICIENT INTERPRETATION
# ==============================
coef_df = pd.DataFrame({
    "FEATURE": features,
    "COEFFICIENT": model.coef_[0]
}).sort_values("COEFFICIENT", ascending=False)

print("\nMacro Variable Importance (Logistic Coefficients):")
print(coef_df)

print("\nModel Intercept:", model.intercept_[0])

# ==============================
# 9. PLOT ACTUAL VS EXPECTED
# ==============================
plt.figure(figsize=(12, 6))
plt.plot(df["YEAR"], df["CLOSE_SENSEX"], label="Actual Sensex")
plt.plot(df["YEAR"], df["EXPECTED_SENSEX"], "--", label="Macro Expected Sensex")
plt.legend()
plt.title("Actual vs Macro-Driven Expected Sensex")
plt.grid(True)
plt.savefig(os.path.join(OUTPUT_DIR, "sensex_projection7.png"), dpi=300)
plt.close()

print("Plot saved as sensex_projection7.png")

# ==============================
# 10. SAVE FINAL OUTPUT
# ==============================
df.to_csv(os.path.join(OUTPUT_DIR, "sensex_model_output.csv"), index=False)
print("Final output saved as sensex_model_output.csv")

# ==============================
# 11. LATEST SIGNAL (LIVE INTERPRETATION)
# ==============================
latest_prob = df["BULLISH_PROBABILITY"].iloc[-1]
latest_return = df["EXPECTED_RETURN"].iloc[-1]

print("\n===== CURRENT MACRO SIGNAL =====")
print("Latest Bullish Probability:", round(latest_prob, 2))
print("Latest Expected Return:", round(latest_return * 100, 2), "%")

if latest_prob >= 0.65:
    print("Macro Regime: STRONGLY BULLISH")
elif latest_prob >= 0.55:
    print("Macro Regime: MILDLY BULLISH")
elif latest_prob >= 0.45:
    print("Macro Regime: NEUTRAL")
else:
    print("Macro Regime: BEARISH")
