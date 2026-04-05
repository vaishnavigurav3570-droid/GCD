// Mock data for AgriVision Dashboard

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  soilMoisture: number;
  soilMoistureStatus: string;
  ph: number;
  phStatus: string;
  humidity: number;
  windSpeed: number;
}

export interface MarketPrice {
  crop: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down';
}

export interface TimelinePhase {
  month: string;
  status: 'completed' | 'pending' | 'locked';
  tasks: string[];
}

export interface Crop {
  id: string;
  name: string;
  emoji?: string;
  active?: boolean;
}

export interface SubsidyAlert {
  title: string;
  scheme: string;
  department: string;
  deadline?: string;
  subsidy: string;
  eligible?: boolean;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  farmSize: string;
  location: string;
  avatar?: string;
}

// Weather & IoT Sensor Data
export const mockWeatherData: WeatherData = {
  location: 'Kolval, Goa',
  temperature: 32,
  condition: 'Sunny',
  soilMoisture: 42,
  soilMoistureStatus: 'Low',
  ph: 6.5,
  phStatus: 'Optimal',
  humidity: 65,
  windSpeed: 12,
};

// Market Prices (Mandi Rates)
export const mockMarketPrices: MarketPrice[] = [
  { crop: 'Cashew', price: 115, unit: '₹/kg', change: 2, trend: 'up' },
  { crop: 'Coconut', price: 35, unit: '₹/piece', change: -1.5, trend: 'down' },
  { crop: 'Paddy', price: 45, unit: '₹/kg', change: 1.2, trend: 'up' },
  { crop: 'Mango', price: 60, unit: '₹/kg', change: 0.8, trend: 'up' },
];

// Crop Selection
export const mockCrops: Crop[] = [
  { id: 'cashew', name: 'Cashew', emoji: '🥜' },
  { id: 'coconut', name: 'Coconut', emoji: '🥥' },
  { id: 'paddy', name: 'Paddy', emoji: '🌾' },
  { id: 'mango', name: 'Mango', emoji: '🥭' },
];

// Cultivation Schedule Timeline
export const mockTimelinePhases: TimelinePhase[] = [
  {
    month: 'April 2026',
    status: 'completed',
    tasks: [
      'Prepare soil bed',
      'Purchase quality seeds',
      'Arrange irrigation setup',
    ],
  },
  {
    month: 'May 2026',
    status: 'pending',
    tasks: [
      'Sow seeds in nursery',
      'Maintain soil moisture',
      'Apply initial fertilizer',
      'Monitor pest activity',
    ],
  },
  {
    month: 'June 2026',
    status: 'pending',
    tasks: [
      'Transplant seedlings',
      'Apply herbicides',
      'Install support structures',
    ],
  },
];

// Subsidy Alerts
export const mockSubsidyAlerts: SubsidyAlert[] = [
  {
    title: 'Cashew Cultivation Subsidy',
    scheme: 'Agricultural Subsidy Scheme',
    department: 'Goa Department of Agriculture',
    deadline: '30 June 2026',
    subsidy: '₹5,000 per acre',
    eligible: true,
    description: 'Subsidy for cashew cultivation on suitable land',
  },
];

// User Data
export const mockUser: User = {
  id: 'user-001',
  name: 'Rahul Kumar',
  email: 'rahul@agrivision.com',
  farmSize: '2.5 Acres',
  location: 'Kolval, Goa',
  initials: 'RK',
};

// Language translations (simplified)
export const translations = {
  en: {
    appTitle: 'AgriVision Dashboard',
    weather: 'Weather & IoT',
    marketPrices: 'Mandi Rates',
    diseaseScanner: 'Disease Scanner',
    myCrops: 'My Crops',
    subsidyAlerts: 'Subsidy Alerts',
    cultivationSchedule: 'Cultivation Schedule',
    agriBot: 'AgriBot',
  },
  konkani: {
    appTitle: 'कृषिदृष्टि डैशबोर्ड',
    weather: 'हवामान & IoT',
    marketPrices: 'मंडी दर',
    diseaseScanner: 'रोग स्कैनर',
    myCrops: 'माझी पिके',
    subsidyAlerts: 'सबसिडी सूचना',
    cultivationSchedule: 'बी-गल वेळापत्रक',
    agriBot: 'कृषि सहायक',
  },
  marathi: {
    appTitle: 'कृषिदृष्टि डॅशबोर्ड',
    weather: 'हवामान & IoT',
    marketPrices: 'मंडी दर',
    diseaseScanner: 'रोग स्कॅनर',
    myCrops: 'माझी पिकं',
    subsidyAlerts: 'सबसिडी सूचना',
    cultivationSchedule: 'बियाणे लागवडीचा वेळापत्रक',
    agriBot: 'कृषी सहायक',
  },
};
