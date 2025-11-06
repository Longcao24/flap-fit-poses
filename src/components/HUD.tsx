import { GameMetrics } from '@/types/pose';
import { Activity, Zap, Trophy, Flame } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HUDProps {
  metrics: GameMetrics;
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

export const HUD = ({ metrics }: HUDProps) => {
  return (
    <TooltipProvider>
      <div className="space-y-3">
        {/* Score Display */}
        <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/20 shadow-glow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Score</span>
            <Trophy className="w-5 h-5 text-accent" />
          </div>
          <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
            {formatNumber(metrics.score)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Best: {formatNumber(metrics.bestScore)}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-card/80 backdrop-blur-xl rounded-xl p-4 border border-accent/20 cursor-help hover:border-accent/40 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-accent animate-pulse" />
                  <span className="text-xs font-medium text-muted-foreground">Calories Burned</span>
                </div>
                <div className="text-2xl font-bold text-accent tabular-nums">
                  {formatNumber(metrics.calories)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">kcal</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Burned through continuous activity</p>
              <p className="text-xs text-muted-foreground">+ bonus per flap</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-card/80 backdrop-blur-xl rounded-xl p-4 border border-secondary/20 cursor-help hover:border-secondary/40 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-medium text-muted-foreground">Total Flaps</span>
                </div>
                <div className="text-2xl font-bold text-secondary tabular-nums">
                  {formatNumber(metrics.flaps)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {metrics.flaps === 0 ? 'Start moving!' : 'movements'}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Squats + Arm Raises</p>
              <p className="text-xs text-muted-foreground">Detected by AI</p>
            </TooltipContent>
          </Tooltip>
        </div>

      {/* Performance Metrics */}
      <div className="bg-card/80 backdrop-blur-xl rounded-xl p-4 border border-border space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-warning" />
          <span className="text-xs font-medium text-muted-foreground">Performance</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">FPS</span>
            <span className="font-mono font-medium">{metrics.fps}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Confidence</span>
            <span className="font-mono font-medium">{(metrics.poseConfidence * 100).toFixed(0)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Latency</span>
            <span className="font-mono font-medium">{metrics.latency.toFixed(0)}ms</span>
          </div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
};
