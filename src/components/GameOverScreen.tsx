import { Button } from '@/components/ui/button';
import { GameMetrics } from '@/types/pose';
import { RotateCcw, Trophy, Flame, Activity, Heart } from 'lucide-react';

interface GameOverScreenProps {
  metrics: GameMetrics;
  onRestart: () => void;
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

const getMotivationalMessage = (flaps: number, calories: number): string => {
  if (calories >= 50) return "🔥 Amazing workout! You're on fire!";
  if (calories >= 30) return "💪 Great job! Keep pushing!";
  if (calories >= 15) return "🌟 Nice effort! You're getting stronger!";
  if (flaps >= 50) return "🎯 Impressive! So many movements!";
  if (flaps >= 20) return "✨ Good session! Keep it up!";
  if (flaps >= 10) return "👏 Not bad! Let's do more next time!";
  return "🚀 Good start! Let's burn more calories!";
};

export const GameOverScreen = ({ metrics, onRestart }: GameOverScreenProps) => {
  const isNewRecord = metrics.score === metrics.bestScore && metrics.score > 0;
  const motivationalMessage = getMotivationalMessage(metrics.flaps, metrics.calories);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-background/95 backdrop-blur-sm">
      <div className="text-center space-y-6 max-w-md px-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-foreground">Game Over!</h2>
          {isNewRecord && (
            <p className="text-accent font-semibold text-lg animate-pulse-glow">
              🎉 New Record!
            </p>
          )}
        </div>

        <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/20 shadow-glow space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            <div>
              <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
                {formatNumber(metrics.score)}
              </div>
              <div className="text-sm text-muted-foreground">Points</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-accent">
                <Flame className="w-5 h-5 animate-pulse" />
                <span className="text-2xl font-bold tabular-nums">{formatNumber(metrics.calories)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Calories Burned</p>
              <p className="text-[10px] text-accent/70">kcal</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-secondary">
                <Activity className="w-5 h-5" />
                <span className="text-2xl font-bold tabular-nums">{formatNumber(metrics.flaps)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Total Flaps</p>
              <p className="text-[10px] text-secondary/70">movements</p>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-foreground">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              {motivationalMessage}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            size="lg"
            onClick={onRestart}
            className="w-full gradient-primary text-white font-bold text-lg py-6 h-auto rounded-xl shadow-intense hover:scale-105 transition-bounce"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>

          <p className="text-sm text-muted-foreground">
            Best Score: <span className="font-bold text-foreground">{formatNumber(metrics.bestScore)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
