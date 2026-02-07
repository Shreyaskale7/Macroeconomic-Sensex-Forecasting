import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report


import joblib
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "..", "data")
OUTPUT_DIR = os.path.join(BASE_DIR, "..", "outputs")

df = pd.read_csv(os.path.join(DATA_DIR, "sensex_macro_model_step2_reduced.csv"))

df["YEAR"] = pd.to_datetime(df["YEAR"])
df = df.sort_values("YEAR").reset_index(drop=True)

df.head()

df["Market_Direction"] = df["SENSEX return"].apply(
    lambda x: 1 if x > 0 else 0
)

df["Market_Direction"].value_counts()

X = df.drop(columns=["YEAR", "SENSEX return", "Market_Direction"])
y = df["Market_Direction"]

X.shape, y.shape

split = int(len(df) * 0.8)

X_train = X.iloc[:split]
X_test  = X.iloc[split:]

y_train = y.iloc[:split]
y_test  = y.iloc[split:]

len(X_train), len(X_test)

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)

X_train_scaled[:2]

model = LogisticRegression(max_iter=1000)
model.fit(X_train_scaled, y_train)

y_pred = model.predict(X_test_scaled)

print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

coefficients = pd.Series(
    model.coef_[0],
    index=X.columns
).sort_values(key=abs, ascending=False)

coefficients

contribution_pct = (coefficients.abs() / coefficients.abs().sum()) * 100
contribution_pct

contribution_pct.sort_values().plot(kind="barh", figsize=(8,5))
plt.title("Contribution of Macroeconomic Indicators")
plt.xlabel("Contribution (%)")
plt.show()

df["Bullish_Probability"] = model.predict_proba(
    scaler.transform(X)
)[:,1]

print("Bullish probability calculated")

avg_pos = df[df["SENSEX return"] > 0]["SENSEX return"].mean()
avg_neg = df[df["SENSEX return"] < 0]["SENSEX return"].mean()

df["Expected_Return"] = (
    df["Bullish_Probability"] * avg_pos +
    (1 - df["Bullish_Probability"]) * avg_neg
)

print("Expected return calculated")

df["Expected_Sensex"] = (
    df["CLOSE SENSEX"].iloc[0] *
    (1 + df["Expected_Return"]).cumprod()
)

print("Expected Sensex generated")

import matplotlib.pyplot as plt

plt.figure(figsize=(12,6))
plt.plot(df["YEAR"], df["CLOSE SENSEX"], label="Actual Sensex")
plt.plot(df["YEAR"], df["Expected_Sensex"], label="Macro Model Sensex", linestyle="--")

plt.legend()
plt.title("Actual vs Macro-Driven Expected Sensex")
plt.grid(True)

plt.savefig(os.path.join(OUTPUT_DIR, "sensex_projection.png"), dpi=300)
plt.close()

print("Plot saved as sensex_projection.png")
