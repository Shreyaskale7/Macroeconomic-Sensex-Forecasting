
import { ContributionData, ExpectedSensexData, VixAdjustedData, ForecastData, DetailedForecastData, SummaryData } from '../types';

const API_BASE = '/api';

export const fetchSummary = async (): Promise<SummaryData> => {
  const response = await fetch(`${API_BASE}/summary`);
  if (!response.ok) throw new Error('Failed to fetch summary');
  return response.json();
};

export const fetchContributionAnalysis = async (): Promise<ContributionData[]> => {
  const response = await fetch(`${API_BASE}/contribution`);
  if (!response.ok) throw new Error('Failed to fetch contribution data');
  return response.json();
};

export const fetchMacroExpectedSensex = async (): Promise<ExpectedSensexData[]> => {
  const response = await fetch(`${API_BASE}/expected_sensex`);
  if (!response.ok) {
    console.error("Failed to fetch expected sensex");
    return [];
  }
  return response.json();
};

export const fetchVixAdjustedSensex = async (): Promise<VixAdjustedData[]> => {
  const response = await fetch(`${API_BASE}/vix_adjusted`);
  if (!response.ok) return [];
  return response.json();
};

export const fetchForecasts = async (scenario: 'base' | 'bull' | 'bear' = 'base'): Promise<ForecastData> => {
  const response = await fetch(`${API_BASE}/forecasts?scenario=${scenario}`);
  if (!response.ok) throw new Error('Failed to fetch forecasts');
  return response.json();
};

export const fetchDetailedMonthlyForecasts = async (scenario: 'base' | 'bull' | 'bear' = 'base'): Promise<DetailedForecastData> => {
  const response = await fetch(`${API_BASE}/detailed_forecasts?scenario=${scenario}`);
  if (!response.ok) throw new Error('Failed to fetch detailed forecasts');
  return response.json();
};
