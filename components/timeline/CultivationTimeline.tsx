'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { TimelineItem } from './TimelineItem';

interface TimelinePhase {
  month: string;
  status: 'completed' | 'pending' | 'locked';
  tasks: string[];
}

interface CultivationTimelineProps {
  phases?: TimelinePhase[];
  title?: string;
  subtitle?: string;
}

const defaultPhases: TimelinePhase[] = [
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

export function CultivationTimeline({
  phases = defaultPhases,
  title = 'Cultivation Schedule',
  subtitle = 'Smart farming timeline for Cashew',
}: CultivationTimelineProps) {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <Card className="col-span-1 md:col-span-2 rounded-2xl p-6 bg-card shadow-md hover:shadow-lg transition-shadow">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {/* Timeline */}
        <div className="relative overflow-hidden">
          {phases.map((phase, index) => (
            <div key={index} className="pb-4 last:pb-0">
              <TimelineItem
                month={phase.month}
                status={phase.status}
                tasks={phase.tasks}
                isActive={activePhase === index}
                onClick={() => setActivePhase(activePhase === index ? null : index)}
              />
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="pt-4 border-t border-border grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground" />
            <span className="text-xs text-muted-foreground">Locked</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
