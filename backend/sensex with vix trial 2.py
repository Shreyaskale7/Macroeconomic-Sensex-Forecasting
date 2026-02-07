import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

# ==============================
# 1. LOAD DATA
# ==============================
df = pd.read_csv("model_with_vix - Sheet1.csv")

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
    "VIX",
    "SENSEX_RETURN",
    "CLOSE_SENSEX"
]

for col in numeric_cols:
    df[col] = df[col].astype(str).str.replace(",", "").astype(float)

print("Numeric columns cleaned")

# ==============================
# 3. LOAD MODEL & SCALER
# ==============================
model = joblib.load("bullish_model.pkl")
scaler = joblib.load("scaler.pkl")
print("Model and scaler loaded successfully")

# ==============================
# 4. FEATURES FOR PROBABILITY
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
# 6. BUILD SHOCK VARIABLES
# ==============================

# GST shock (demand collapse)
gst_scaler = StandardScaler()
df["GST_SHOCK"] = gst_scaler.fit_transform(
    df["GST_YOY_LAG1"].values.reshape(-1, 1)
)
df["GST_SHOCK_NEG"] = np.minimum(df["GST_SHOCK"], 0)
df["GST_SHOCK_NEG"] = df["GST_SHOCK_NEG"].clip(-2, 0)

# VIX shock (panic / fear)
vix_scaler = StandardScaler()
df["VIX_SHOCK"] = vix_scaler.fit_transform(
    df["VIX"].values.reshape(-1, 1)
)

# Activate only high volatility and soften impact
df["VIX_SHOCK_POS"] = np.maximum(df["VIX_SHOCK"] - 0.5, 0)
df["VIX_SHOCK_POS"] = (df["VIX_SHOCK_POS"] * 0.7).clip(0, 2)

print("Shock variables created")

# ==============================
# 7. CALIBRATE RETURN MODEL
# ==============================
X_ret = pd.DataFrame({
    "PROB": df["BULLISH_PROBABILITY"],
    "GST_SHOCK": df["GST_SHOCK_NEG"],
    "VIX_SHOCK": df["VIX_SHOCK_POS"]
})

y_ret = df["SENSEX_RETURN"]

ret_model = LinearRegression()
ret_model.fit(X_ret, y_ret)

alpha = ret_model.intercept_
beta_prob, delta_gst, theta_vix = ret_model.coef_

print("\nReturn calibration equation:")
print(
    f"Expected_Return = {alpha:.4f} "
    f"+ {beta_prob:.4f}*Prob "
    f"+ {delta_gst:.4f}*GST_Shock "
    f"- {abs(theta_vix):.4f}*VIX_Shock"
)

# ==============================
# 8. EXPECTED RETURN (REFINED)
# ==============================
df["EXPECTED_RETURN_REALISTIC"] = (
    alpha
    + beta_prob * df["BULLISH_PROBABILITY"]
    + delta_gst * df["GST_SHOCK_NEG"]
    - abs(theta_vix) * df["VIX_SHOCK_POS"]
)

# Mild macro persistence (very important)
df["EXPECTED_RETURN_REALISTIC"] = (
    0.8 * df["EXPECTED_RETURN_REALISTIC"] +
    0.2 * df["EXPECTED_RETURN_REALISTIC"].shift(1).fillna(0)
)

# Cap extreme returns for realism
df["EXPECTED_RETURN_REALISTIC"] = df["EXPECTED_RETURN_REALISTIC"].clip(-0.25, 0.30)

print("Refined expected return calculated")

# ==============================
# 9. EXPECTED SENSEX
# ==============================
df["EXPECTED_SENSEX_REALISTIC"] = (
    df["CLOSE_SENSEX"].iloc[0] *
    (1 + df["EXPECTED_RETURN_REALISTIC"]).cumprod()
)

print("Expected Sensex generated")

# ==============================
# 10. PLOT
# ==============================
plt.figure(figsize=(12, 6))
plt.plot(df["YEAR"], df["CLOSE_SENSEX"], label="Actual Sensex")
plt.plot(
    df["YEAR"],
    df["EXPECTED_SENSEX_REALISTIC"],
    label="Macro + Volatility Expected Sensex"
)

plt.legend()
plt.title("Actual vs Macro + Volatility Driven Expected Sensex (Refined)")
plt.grid(True)
plt.savefig("sensex_macro_vix_projection_final_refined.png", dpi=300)
plt.close()

print("Plot saved as sensex_macro_vix_projection_final_refined.png")

# ==============================
# 11. SAVE OUTPUT
# ==============================
df.to_csv("sensex_model_output_macro_vix_final_refined.csv", index=False)
print("Final output saved as sensex_model_output_macro_vix_final_refined.csv")

# ==============================
# 12. LATEST SIGNAL
# ==============================
latest_prob = df["BULLISH_PROBABILITY"].iloc[-1]
latest_return = df["EXPECTED_RETURN_REALISTIC"].iloc[-1]

print("\n===== CURRENT MACRO + VOLATILITY SIGNAL =====")
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

