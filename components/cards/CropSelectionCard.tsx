'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Crop {
  id: string;
  name: string;
  emoji?: string;
  active?: boolean;
}

interface CropSelectionCardProps {
  crops?: Crop[];
  onCropSelect?: (cropId: string) => void;
  selectedCrop?: string;
}

const defaultCrops: Crop[] = [
  { id: 'cashew', name: 'Cashew', emoji: '🥜' },
  { id: 'coconut', name: 'Coconut', emoji: '🥥' },
  { id: 'paddy', name: 'Paddy', emoji: '🌾' },
  { id: 'mango', name: 'Mango', emoji: '🥭' },
];

export function CropSelectionCard({
  crops = defaultCrops,
  onCropSelect,
  selectedCrop = 'cashew',
}: CropSelectionCardProps) {
  const [selected, setSelected] = useState<string>(selectedCrop);

  const handleCropSelect = (cropId: string) => {
    setSelected(cropId);
    onCropSelect?.(cropId);
  };

  return (
    <Card className="col-span-1 md:col-span-1 rounded-2xl p-6 bg-card shadow-md hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-foreground">My Crops</h3>
          <p className="text-sm text-muted-foreground">Select active crop</p>
        </div>

        {/* Crop Grid */}
        <div className="grid grid-cols-2 gap-3">
          {crops.map((crop) => (
            <Button
              key={crop.id}
              onClick={() => handleCropSelect(crop.id)}
              variant={selected === crop.id ? 'default' : 'outline'}
              className={`h-auto py-3 px-3 relative flex flex-col items-center gap-2 rounded-lg ${
                selected === crop.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/50 hover:bg-muted'
              }`}
            >
              {selected === crop.id && (
                <CheckCircle2 className="absolute top-1 right-1 h-4 w-4" />
              )}
              {crop.emoji && <span className="text-2xl">{crop.emoji}</span>}
              <span className="text-sm font-semibold text-center">{crop.name}</span>
            </Button>
          ))}
        </div>

        {/* Active Crop Info */}
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-xs text-muted-foreground">Active Crop</p>
          <p className="text-sm font-semibold text-foreground">
            {crops.find(c => c.id === selected)?.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Schedule & recommendations tailored for this crop
          </p>
        </div>
      </div>
    </Card>
  );
}
