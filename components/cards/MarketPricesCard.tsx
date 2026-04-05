'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MarketPrice {
  crop: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down';
}

interface MarketPricesCardProps {
  prices?: MarketPrice[];
}

export function MarketPricesCard({
  prices = [
    { crop: 'Cashew', price: 115, unit: '₹/kg', change: 2, trend: 'up' },
    { crop: 'Coconut', price: 35, unit: '₹/piece', change: -1.5, trend: 'down' },
    { crop: 'Paddy', price: 45, unit: '₹/kg', change: 1.2, trend: 'up' },
    { crop: 'Mango', price: 60, unit: '₹/kg', change: 0.8, trend: 'up' },
  ],
}: MarketPricesCardProps) {
  return (
    <Card className="col-span-1 rounded-2xl p-6 bg-card shadow-md hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-foreground">Mandi Rates</h3>
          <p className="text-sm text-muted-foreground">Current market prices</p>
        </div>

        {/* Prices List */}
        <div className="space-y-3">
          {prices.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
              <div>
                <p className="text-sm font-semibold text-foreground">{item.crop}</p>
                <p className="text-xs text-muted-foreground">{item.unit}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{item.price}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {item.trend === 'up' ? (
                      <>
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-semibold text-green-500">
                          +{Math.abs(item.change)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-3 w-3 text-red-500" />
                        <span className="text-xs font-semibold text-red-500">
                          {item.change}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="pt-2 text-xs text-muted-foreground text-center border-t border-border">
          Last updated: Today
        </div>
      </div>
    </Card>
  );
}
