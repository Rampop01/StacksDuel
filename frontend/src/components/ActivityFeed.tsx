import React from 'react';
import { Badge } from './Badge';

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
}

export function ActivityFeed({ activities }: { activities: Activity[] }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col space-y-3">
      <h3 className="text-white font-medium text-lg">Live Activity</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
        {activities.map(act => (
          <div key={act.id} className="flex items-center text-sm text-white/70 bg-white/5 p-2 rounded-lg">
            <span className="font-medium text-white mr-1">{act.user}</span>
            <span className="mr-1">{act.action}</span>
            <span className="font-medium text-brand-400 mr-2">{act.target}</span>
            <span className="text-xs text-white/40 ml-auto">{act.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}