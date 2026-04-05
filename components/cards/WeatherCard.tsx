'use client';

import { Cloud, Droplets, Gauge } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface WeatherData {
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

interface WeatherCardProps {
  data?: WeatherData;
}

export function WeatherCard({ 
  data = {
    location: 'Kolval, Goa',
    temperature: 32,
    condition: 'Sunny',
    soilMoisture: 42,
    soilMoistureStatus: 'Low',
    ph: 6.5,
    phStatus: 'Optimal',
    humidity: 65,
    windSpeed: 12,
  }
}: WeatherCardProps) {
  const getMoistureColor = (status: string) => {
    switch (status) {
      case 'Low':
        return 'text-red-500';
      case 'Optimal':
        return 'text-green-500';
      case 'High':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getPhColor = (status: string) => {
    return status === 'Optimal' ? 'text-green-500' : 'text-yellow-500';
  };

  return (
    <Card className="col-span-1 rounded-2xl p-6 bg-card shadow-md hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-foreground">Weather & IoT</h3>
          <p className="text-sm text-muted-foreground">{data.location}</p>
        </div>

        {/* Temperature & Condition */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-4xl font-bold text-primary">{data.temperature}°C</p>
            <p className="text-sm text-muted-foreground">{data.condition}</p>
          </div>
          <Cloud className="h-12 w-12 text-primary/60" />
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* IoT Metrics */}
        <div className="space-y-3">
          {/* Soil Moisture */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-primary/60" />
              <span className="text-sm text-foreground">Soil Moisture</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{data.soilMoisture}%</p>
              <p className={`text-xs font-medium ${getMoistureColor(data.soilMoistureStatus)}`}>
                {data.soilMoistureStatus}
              </p>
            </div>
          </div>

          {/* Soil pH */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-primary/60" />
              <span className="text-sm text-foreground">Soil pH</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{data.ph}</p>
              <p className={`text-xs font-medium ${getPhColor(data.phStatus)}`}>
                {data.phStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-2 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-sm font-semibold text-foreground">{data.humidity}%</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">Wind Speed</p>
            <p className="text-sm font-semibold text-foreground">{data.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
