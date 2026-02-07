
export interface ContributionData {
  Feature: string;
  Contribution: number;
}

export interface ExpectedSensexData {
  YEAR: string;
  CLOSE_SENSEX: number;
  EXPECTED_SENSEX: number;
}

export interface VixAdjustedData {
  YEAR: string;
  CLOSE_SENSEX: number;
  EXPECTED_SENSEX_VIX: number;
}

export interface MonthlyForecastPoint {
  month: string;
  value: number;
}

export interface DetailedForecastData {
  sixMonth: MonthlyForecastPoint[];
  twelveMonth: MonthlyForecastPoint[];
  eighteenMonth: MonthlyForecastPoint[];
}

export interface ForecastData {
  sixMonth: number;
  twelveMonth: number;
  eighteenMonth: number;
}


export interface SummaryData {
  current_level: number;
  expected_monthly_return: number;
  macro_outlook: string;
  risk_bias: string;
}

export type Scenario = 'base' | 'bull' | 'bear';
