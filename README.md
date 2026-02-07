# 📊 Macroeconomic Sensex Forecasting Platform

<div align="center">

![Sensex Forecasting](https://img.shields.io/badge/Sensex-Forecasting-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-green?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?style=for-the-badge&logo=fastapi)

**An intelligent platform for forecasting Sensex trends using macroeconomic indicators and machine learning**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Architecture](#-architecture) • [API Documentation](#-api-documentation)

</div>

---

## 🎯 Overview

The **Macroeconomic Sensex Forecasting Platform** is a full-stack application that leverages machine learning to predict Sensex (BSE Sensitive Index) movements based on key macroeconomic indicators. Unlike traditional algorithmic trading systems, this platform focuses on **macroeconomic trend analysis** to provide fair-value estimates and multi-horizon forecasts.

### Key Highlights

- **📈 Multi-Horizon Forecasts**: 6-month, 12-month, and 18-month Sensex predictions
- **🎲 Scenario Analysis**: Base, bullish, and bearish scenario modeling
- **📊 Macro Intelligence**: Analysis of 8+ macroeconomic indicators (GST, IIP, ECI, Repo Rate, USD/INR, Crude Oil, Gold, FPI)
- **🔮 VIX Integration**: Volatility-adjusted forecasting for refined predictions
- **📉 Historical Validation**: Visual comparison of actual vs. expected Sensex trends
- **⚖️ Feature Weightage**: Transparent contribution analysis of each macroeconomic factor
- **🎨 Interactive Dashboard**: Modern React-based UI with real-time visualizations

---

## ✨ Features

### 🔍 Core Capabilities

1. **Bullish Probability Model**
   - Logistic regression classifier trained on historical macro data
   - Predicts market sentiment based on economic indicators
   - Standardized feature scaling for robust predictions

2. **Fair Value Estimation**
   - Linear regression model combining probability signals with macro shocks
   - GST shock detection for negative economic impacts
   - VIX shock integration for volatility adjustments

3. **Multi-Scenario Forecasting**
   - **Base Case**: Standard expected return projection
   - **Bull Case**: 20% upside adjustment
   - **Bear Case**: 20% downside adjustment

4. **Comprehensive Visualizations**
   - Historical fit analysis (Actual vs. Macro Fair Value)
   - VIX-adjusted model comparison
   - Feature contribution breakdown
   - Monthly forecast trajectories

### 🎨 Frontend Features

- **Overview Dashboard**: Current Sensex level, macro outlook, expected returns
- **Forecasts & Validation**: Interactive scenario selector with visual projections
- **Macro Fair Value**: Historical trend comparison
- **VIX Model**: Volatility-adjusted fair value analysis
- **Weightage Analysis**: Bar chart showing macroeconomic factor contributions
- **Process Documentation**: Detailed methodology and tech stack
- **USP Explanation**: Unique value proposition vs. traditional approaches

---

## 🚀 Installation

### Prerequisites

- **Python 3.8+** (with pip)
- **Node.js 16+** (with npm)
- **Git** (optional, for cloning)

### Quick Start

#### Option 1: Automated Setup (Windows)

```bash
# Clone the repository
git clone https://github.com/Shreyaskale7/Macroeconomic-Sensex-Forecasting.git
cd Macroeconomic-Sensex-Forecasting

# Run the automated startup script
start_app.bat
```

The script will:
1. Install Python dependencies
2. Start the FastAPI backend server
3. Serve the React frontend at `http://localhost:8000`

#### Option 2: Manual Setup

**Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
python server.py
```

**Frontend Setup** (Optional - for development)

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Build the production bundle
npm run build

# Or run in development mode
npm run dev
```

---

## 📖 Usage

### Accessing the Application

Once the server is running, open your browser and navigate to:

```
http://localhost:8000
```

### Navigation Guide

| Page | Description |
|------|-------------|
| **Overview** | Current Sensex status, macro outlook, and expected monthly return |
| **Forecasts & Validation** | Multi-horizon forecasts with scenario selection |
| **Macro Fair Value** | Historical comparison of actual vs. expected Sensex |
| **VIX Model** | Volatility-adjusted fair value trends |
| **Weightage** | Contribution breakdown of macroeconomic factors |
| **Process** | Methodology, data sources, and tech stack |
| **USP** | Unique approach vs. traditional trading systems |
| **Future Work** | Planned enhancements and roadmap |

### Using the Forecasts

1. **Select a Scenario**: Choose Base, Bull, or Bear case from the dropdown
2. **View Projections**: See 6M, 12M, and 18M Sensex forecasts
3. **Analyze Trends**: Review historical fit and VIX-adjusted models
4. **Understand Drivers**: Check feature weightage to see which factors matter most

---

## 🏗️ Architecture

### Project Structure

```
Macroeconomic-Sensex-Forecasting/
├── backend/                          # Python FastAPI backend
│   ├── server.py                     # Main API server
│   ├── sensex_macro_forecast_all_horizons.py  # Core forecasting logic
│   ├── model3.py                     # Alternative model implementation
│   ├── output.py                     # Output generation utilities
│   └── requirements.txt              # Python dependencies
├── frontend/                         # React TypeScript frontend
│   ├── App.tsx                       # Main app component
│   ├── pages/                        # Page components
│   │   ├── DashboardHome.tsx
│   │   ├── ForecastPage.tsx
│   │   ├── ExpectedSensexPage.tsx
│   │   ├── VixModelPage.tsx
│   │   ├── ContributionPage.tsx
│   │   ├── ProcessPage.tsx
│   │   ├── UspPage.tsx
│   │   └── FutureWorkPage.tsx
│   ├── components/                   # Reusable components
│   ├── services/                     # API service layer
│   ├── types.ts                      # TypeScript type definitions
│   └── package.json                  # Node dependencies
├── data/                             # Training data and models
│   ├── model_with_vix - Sheet1.csv   # Historical macro data
│   ├── bullish_model.pkl             # Trained logistic regression
│   ├── scaler.pkl                    # Feature scaler
│   └── metadata.json                 # Model metadata
├── outputs/                          # Generated visualizations
├── start_app.bat                     # Windows startup script
└── README.md                         # This file
```

### Technology Stack

#### Backend
- **FastAPI**: High-performance REST API framework
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Scikit-learn**: Machine learning models (LinearRegression, LogisticRegression)
- **Joblib**: Model serialization
- **Matplotlib**: Visualization generation
- **Uvicorn**: ASGI server

#### Frontend
- **React 19.2**: UI framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and dev server
- **Recharts**: Interactive charting library
- **React Router**: Client-side routing
- **Lucide React**: Icon library

#### Machine Learning
- **Logistic Regression**: Bullish probability classification
- **Linear Regression**: Fair value estimation
- **StandardScaler**: Feature normalization
- **Custom Shock Variables**: GST and VIX shock detection

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### 1. Get Summary
```http
GET /api/summary
```

**Response:**
```json
{
  "current_level": 75000,
  "expected_monthly_return": 1.25,
  "macro_outlook": "MILDLY POSITIVE",
  "risk_bias": "Neutral-Bullish"
}
```

#### 2. Get Forecasts
```http
GET /api/forecasts?scenario=base
```

**Query Parameters:**
- `scenario` (optional): `base` | `bull` | `bear` (default: `base`)

**Response:**
```json
{
  "sixMonth": 78500,
  "twelveMonth": 82000,
  "eighteenMonth": 85500
}
```

#### 3. Get Detailed Forecasts
```http
GET /api/detailed_forecasts?scenario=base
```

**Response:**
```json
{
  "sixMonth": [
    { "month": "Apr '25", "value": 76000 },
    { "month": "May '25", "value": 76800 },
    ...
  ],
  "twelveMonth": [...],
  "eighteenMonth": [...]
}
```

#### 4. Get Macro Fair Value History
```http
GET /api/expected_sensex
```

**Response:**
```json
[
  {
    "YEAR": "Feb '19",
    "CLOSE_SENSEX": 35900,
    "EXPECTED_SENSEX": 36200
  },
  ...
]
```

#### 5. Get VIX-Adjusted History
```http
GET /api/vix_adjusted
```

**Response:**
```json
[
  {
    "YEAR": "Feb '19",
    "CLOSE_SENSEX": 35900,
    "EXPECTED_SENSEX_VIX": 36100
  },
  ...
]
```

#### 6. Get Feature Contributions
```http
GET /api/contribution
```

**Response:**
```json
[
  { "Feature": "CRUDE", "Contribution": 18.5 },
  { "Feature": "IIP GROWTH", "Contribution": 16.2 },
  { "Feature": "FPI", "Contribution": 14.8 },
  ...
]
```

---

## 📊 Model Methodology

### Data Pipeline

1. **Data Collection**: Historical monthly data (Feb 2019 - Mar 2025)
   - Macroeconomic indicators: GST, IIP, ECI, Repo Rate, USD/INR, Crude Oil, Gold, FPI
   - Market data: Sensex closing prices, VIX
   - Returns: Monthly Sensex percentage changes

2. **Feature Engineering**
   - Lagged variables (t-1) for predictive modeling
   - Standardized shock variables for GST and VIX
   - Asymmetric shock detection (negative GST, positive VIX)

3. **Model Training**
   - **Bullish Probability Model**: Logistic regression on 8 macro features
   - **Return Model**: Linear regression with probability + shock variables
   - Cross-validation and coefficient calibration

4. **Forecasting**
   - Recursive projection using expected monthly returns
   - Scenario adjustments (±20% for bull/bear cases)
   - Uncertainty bands based on historical volatility

### Key Assumptions

- Monthly rebalancing frequency
- Mean-reverting macro shocks
- Linear relationship between probabilities and returns
- Historical volatility as proxy for future uncertainty

---

## 🎓 Use Cases

- **Retail Investors**: Long-term investment planning and market timing
- **Financial Analysts**: Macro-driven market outlook and scenario analysis
- **Academic Research**: Study of macroeconomic impacts on equity markets
- **Portfolio Managers**: Strategic asset allocation decisions
- **Policy Analysts**: Understanding economic policy impacts on markets

---

## 🔮 Future Enhancements

- [ ] Real-time data integration via APIs (RBI, NSE, Bloomberg)
- [ ] Advanced ML models (Random Forest, XGBoost, LSTM)
- [ ] Sector-level forecasting (Banking, IT, Pharma, etc.)
- [ ] Risk metrics (VaR, Sharpe Ratio, Maximum Drawdown)
- [ ] User authentication and portfolio tracking
- [ ] Mobile application (React Native)
- [ ] Automated report generation (PDF exports)
- [ ] Backtesting framework with performance metrics

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Shreyas Kale**

- GitHub: [@Shreyaskale7](https://github.com/Shreyaskale7)
- Project Link: [Macroeconomic-Sensex-Forecasting](https://github.com/Shreyaskale7/Macroeconomic-Sensex-Forecasting)

---

## 🙏 Acknowledgments

- **Data Sources**: Reserve Bank of India (RBI), National Stock Exchange (NSE), Bloomberg
- **Inspiration**: Macroeconomic research on equity market drivers
- **Tools**: Scikit-learn, FastAPI, React, Recharts

---

## 📞 Support

For questions, issues, or contributions:

1. Open an issue on [GitHub Issues](https://github.com/Shreyaskale7/Macroeconomic-Sensex-Forecasting/issues)
2. Submit a pull request for improvements
3. Contact via GitHub profile

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Shreyas Kale

</div>
