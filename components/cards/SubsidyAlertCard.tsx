'use client';

import { AlertCircle, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SubsidyAlert {
  title: string;
  scheme: string;
  department: string;
  deadline?: string;
  subsidy: string;
  eligible?: boolean;
  description?: string;
}

interface SubsidyAlertCardProps {
  alerts?: SubsidyAlert[];
}

const defaultAlerts: SubsidyAlert[] = [
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

export function SubsidyAlertCard({ alerts = defaultAlerts }: SubsidyAlertCardProps) {
  return (
    <Card className="col-span-1 md:col-span-1 rounded-2xl p-6 bg-card shadow-md hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-primary/60 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-foreground">Subsidy Alerts</h3>
            <p className="text-sm text-muted-foreground">Government schemes for you</p>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                alert.eligible
                  ? 'bg-green-50 dark:bg-green-950/30 border-green-500/50'
                  : 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-500/50'
              }`}
            >
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {alert.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{alert.scheme}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">Department:</span> {alert.department}
                  </p>
                  {alert.deadline && (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold">Deadline:</span> {alert.deadline}
                    </p>
                  )}
                  <p className="text-xs font-semibold text-primary">
                    {alert.subsidy}
                  </p>
                </div>

                {alert.description && (
                  <p className="text-xs text-muted-foreground pt-2">
                    {alert.description}
                  </p>
                )}

                {alert.eligible && (
                  <div className="pt-2">
                    <Button
                      size="sm"
                      className="w-full gap-2 text-xs"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div className="text-xs text-muted-foreground p-3 rounded-lg bg-muted/50">
          Check with your local agriculture department for current schemes
        </div>
      </div>
    </Card>
  );
}
