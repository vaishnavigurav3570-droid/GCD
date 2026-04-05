'use client';

import { useState } from 'react';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { WeatherCard } from '@/components/cards/WeatherCard';
import { MarketPricesCard } from '@/components/cards/MarketPricesCard';
import { DiseaseScannerCard } from '@/components/cards/DiseaseScannerCard';
import { CropSelectionCard } from '@/components/cards/CropSelectionCard';
import { SubsidyAlertCard } from '@/components/cards/SubsidyAlertCard';
import { CultivationTimeline } from '@/components/timeline/CultivationTimeline';
import { AgriBot } from '@/components/chatbot/AgriBot';
import {
  mockWeatherData,
  mockMarketPrices,
  mockCrops,
  mockTimelinePhases,
  mockSubsidyAlerts,
} from '@/lib/mock-data';

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'konkani' | 'marathi'>('en');
  const [selectedCrop, setSelectedCrop] = useState('cashew');

  const handleSignOut = () => {
    console.log('Sign out clicked');
    // TODO: Implement sign out logic with Supabase
  };

  const handleLanguageChange = (lang: 'en' | 'konkani' | 'marathi') => {
    setLanguage(lang);
    console.log('[v0] Language changed to:', lang);
  };

  const handleCropSelect = (cropId: string) => {
    setSelectedCrop(cropId);
    console.log('[v0] Crop selected:', cropId);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header
        onLanguageChange={handleLanguageChange}
        onSignOut={handleSignOut}
      />

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 bg-background">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Row: 3 Column Grid (Weather | Market | Disease Scanner) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WeatherCard data={mockWeatherData} />
            <MarketPricesCard prices={mockMarketPrices} />
            <DiseaseScannerCard />
          </div>

          {/* Middle Row: 2 Column Grid (Crops | Subsidy) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CropSelectionCard
              crops={mockCrops}
              onCropSelect={handleCropSelect}
              selectedCrop={selectedCrop}
            />
            <SubsidyAlertCard alerts={mockSubsidyAlerts} />
          </div>

          {/* Timeline Row */}
          <div className="grid grid-cols-1">
            <CultivationTimeline
              phases={mockTimelinePhases}
              title="Cultivation Schedule"
              subtitle={`Smart farming timeline for ${
                mockCrops.find((c) => c.id === selectedCrop)?.name || 'Cashew'
              }`}
            />
          </div>
        </div>
      </main>

      {/* Floating Chatbot */}
      <AgriBot />

      {/* Footer */}
      <Footer />
    </div>
  );
}
