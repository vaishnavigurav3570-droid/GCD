'use client';

import { CheckCircle2, Circle, Lock } from 'lucide-react';

interface TimelineItemProps {
  month: string;
  status: 'completed' | 'pending' | 'locked';
  tasks: string[];
  isActive?: boolean;
  onClick?: () => void;
}

export function TimelineItem({
  month,
  status,
  tasks,
  isActive,
  onClick,
}: TimelineItemProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />;
      case 'locked':
        return <Lock className="h-6 w-6 text-muted-foreground flex-shrink-0" />;
      default:
        return <Circle className="h-6 w-6 text-primary flex-shrink-0" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800';
      case 'locked':
        return 'bg-muted/30 border-border';
      default:
        return 'bg-primary/5 border-primary/30';
    }
  };

  return (
    <div className="flex gap-4 pb-6 relative">
      {/* Timeline line (vertical) */}
      <div className="flex flex-col items-center">
        {getStatusIcon()}
        {/* Connecting line to next item */}
        <div className="w-0.5 h-16 bg-border mt-2" />
      </div>

      {/* Content */}
      <div
        onClick={onClick}
        className={`flex-1 cursor-pointer transition-all ${
          isActive ? 'opacity-100' : 'opacity-75 hover:opacity-90'
        }`}
      >
        <div
          className={`p-4 rounded-lg border ${getStatusColor()}`}
        >
          <h4 className="font-semibold text-foreground text-sm md:text-base">
            {month}
          </h4>
          <div className={`mt-2 text-xs md:text-sm ${
            status === 'locked' ? 'text-muted-foreground' : 'text-muted-foreground'
          }`}>
            {tasks.length > 0 ? (
              <ul className="space-y-1">
                {tasks.slice(0, 2).map((task, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{task}</span>
                  </li>
                ))}
                {tasks.length > 2 && (
                  <li className="text-muted-foreground text-xs italic">
                    +{tasks.length - 2} more tasks
                  </li>
                )}
              </ul>
            ) : (
              <p>No tasks scheduled</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
