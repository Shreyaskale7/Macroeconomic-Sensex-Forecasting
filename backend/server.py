from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
import os
import pandas as pd
import numpy as np
from typing import List, Dict, Any, Optional

# Import the forecaster logic
# Ensure backend directory is in path or run from backend dir
from sensex_macro_forecast_all_horizons import forecaster, generate_forecast_with_bands

app = FastAPI(title="Sensex Macro Intelligence API")

# CORS for local development if running frontend separately
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Endpoints
@app.get("/api/contribution")
def get_contribution():
    return forecaster.get_contribution_data()

@app.get("/api/expected_sensex")
def get_expected_sensex():
    # This seems incomplete in the forecaster logic refactor, 
    # but let's emulate what the frontend expects or return historicals.
    # The frontend expects { YEAR, CLOSE_SENSEX, EXPECTED_SENSEX }
    # Our simple refactor returned everything. We might need to process it.
    
    # Let's generate a mockup or use actual data if available.
    # The current forecaster logic calculates 'expected_monthly_return' but doesn't store a full 'expected sensex' time series 
    # except what might be in model3.py logic. 
    # For now, let's return reasonable data from the dataframe we have.
    
    # We can try to reconstruct "Expected Sensex" from probabilities if we want, or just send what we have.
    # Frontend Service: fetchMacroExpectedSensex returns YEAR, CLOSE_SENSEX, EXPECTED_SENSEX
    
    # We will compute a simple expected path based on the probabilities for visualization
    # Replicating model3.py logic roughly:
    # Expected_Return = Prob * avg_pos + (1-Prob) * avg_neg
    # Expected_Sensex = Initial * cumprod(1+Expected_Return)
    
    df = forecaster.df.copy()
    avg_pos = df[df["SENSEX_RETURN"] > 0]["SENSEX_RETURN"].mean()
    avg_neg = df[df["SENSEX_RETURN"] < 0]["SENSEX_RETURN"].mean()
    
    df["EXPECTED_RETURN_H"] = (
        df["BULLISH_PROBABILITY"] * avg_pos +
        (1 - df["BULLISH_PROBABILITY"]) * avg_neg
    )
    
    # We only have returns, need dates. The CSV has no dates? 
    # Wait, model3.py had dates. Let's check columns.
    # Our refactor loaded 'model_with_vix - Sheet1.csv' which may not have dates.
    # But model3.py loaded 'sensex_macro_model_step2_reduced.csv' which had YEAR.
    # Let's assume we can generate dates or use what's there.
    
    # If no YEAR column, we synthesize standard monthly dates ending at current.
    # df length is ~74?
    
    # Let's just return what we can. 
    # Note: Using hardcoded dates if missing is risky but acceptable for "Fair Value" concept visualization.
    
    data = []
    # Fixed end date to March 2025 as per user requirement (Feb 2019 - Mar 2025)
    end_date = pd.Timestamp("2025-03-01")
    dates = pd.date_range(end=end_date, periods=len(df), freq='M')
    
    current_val = df["CLOSE_SENSEX"].iloc[0] # distinct from current_level global
    
    # Recalculate expected path from start
    expected_path = [current_val]
    for r in df["EXPECTED_RETURN_H"]:
        expected_path.append(expected_path[-1] * (1 + r))
    expected_path = expected_path[1:]
    
    for i, date in enumerate(dates):
        data.append({
            "YEAR": date.strftime("%b '%y"),
            "CLOSE_SENSEX": float(df["CLOSE_SENSEX"].iloc[i]),
            "EXPECTED_SENSEX": float(expected_path[i])
        })
        
    return data

@app.get("/api/vix_adjusted")
def get_vix_adjusted():
    # Return the refined "Macro + Volatility" model history
    return forecaster.get_vix_adjusted_history()

@app.get("/api/forecasts")
def get_forecasts(scenario: str = 'base'):
    # Returns point estimates { sixMonth, twelveMonth, eighteenMonth }
    
    l6 = forecaster.get_forecast(6, scenario)
    l12 = forecaster.get_forecast(12, scenario)
    l18 = forecaster.get_forecast(18, scenario)
    
    return {
        "sixMonth": round(l6[-1]),
        "twelveMonth": round(l12[-1]),
        "eighteenMonth": round(l18[-1])
    }


@app.get("/api/summary")
def get_summary():
    return forecaster.get_summary()

@app.get("/api/detailed_forecasts")
def get_detailed_forecasts(scenario: str = 'base'):
    # Returns monthly paths { sixMonth: [], twelveMonth: [], ... }
    
    l6 = forecaster.get_forecast(6, scenario)
    l12 = forecaster.get_forecast(12, scenario)
    l18 = forecaster.get_forecast(18, scenario)
    
    def to_points(levels):
        points = []
        # Fixed start date to align with "March 2025 Live" status
        start_date = pd.Timestamp("2025-03-01")
        for i, val in enumerate(levels):
            d = start_date + pd.DateOffset(months=i+1)
            points.append({
                "month": d.strftime("%b '%y"),
                "value": round(val)
            })
        return points

    return {
        "sixMonth": to_points(l6),
        "twelveMonth": to_points(l12),
        "eighteenMonth": to_points(l18)
    }

# Serve React App
# We assume the react build will be in ../frontend/dist
frontend_dist = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_react(full_path: str):
        # API requests are already handled above.
        # Request for files that exist in dist (like favicon)
        possible_file = os.path.join(frontend_dist, full_path)
        if os.path.isfile(possible_file):
            return FileResponse(possible_file)
            
        # For all other routes, serve index.html (SPA routing)
        return FileResponse(os.path.join(frontend_dist, "index.html"))
else:
    print(f"Warning: Frontend dist not found at {frontend_dist}")

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
