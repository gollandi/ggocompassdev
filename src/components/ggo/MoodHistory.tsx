import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";
import { loadMoodHistory, MoodEntry } from "../../utils/preferences";

interface MoodHistoryProps {
  className?: string;
}

export function MoodHistory({ className = "" }: MoodHistoryProps) {
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setHistory(loadMoodHistory());
  }, []);

  if (history.length === 0) {
    return null;
  }

  const getLastSevenDays = () => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    
    const recentEntries = history.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= sevenDaysAgo && entryDate <= today;
    });
    
    return recentEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getTrend = () => {
    const recent = getLastSevenDays();
    if (recent.length < 2) return "stable";
    
    const firstMood = recent[0].mood;
    const lastMood = recent[recent.length - 1].mood;
    
    if (lastMood > firstMood + 1) return "improving";
    if (lastMood < firstMood - 1) return "declining";
    return "stable";
  };

  const getAverageMood = () => {
    const recent = getLastSevenDays();
    if (recent.length === 0) return 0;
    return recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length;
  };

  const trend = getTrend();
  const avgMood = getAverageMood();
  const recentDays = getLastSevenDays();

  const getTrendIcon = () => {
    switch (trend) {
      case "improving": return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "declining": return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendMessage = () => {
    switch (trend) {
      case "improving": return "Your confidence is trending upward! 📈";
      case "declining": return "Your confidence has dipped recently. This is normal during recovery.";
      default: return "Your confidence has been stable.";
    }
  };

  const getMoodColor = (mood: number) => {
    if (mood <= 3) return "bg-red-100 text-red-800";
    if (mood <= 7) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <div className={`bg-white rounded-xl p-6 shadow-md ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-ggo-teal rounded p-2 -m-2"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-ggo-teal/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-ggo-teal" />
          </div>
          <div>
            <h4 className="text-ggo-navy font-medium">Confidence Tracking</h4>
            <p className="text-xs text-ggo-text-muted flex items-center gap-1">
              {getTrendIcon()}
              {getTrendMessage()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-ggo-navy">{avgMood.toFixed(1)}</div>
          <div className="text-xs text-ggo-text-muted">7-day avg</div>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div className="mt-4 space-y-3">
          <h5 className="text-sm font-medium text-ggo-navy">Last 7 days</h5>
          
          <div className="space-y-2">
            {recentDays.map((entry, index) => {
              const date = new Date(entry.date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div key={entry.date} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${isToday ? 'text-ggo-teal' : 'text-ggo-text-muted'}`}>
                      {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-xs text-ggo-text-muted">
                      Day {entry.day}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getMoodColor(entry.mood)}`}>
                      {entry.mood}/10
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {recentDays.length === 0 && (
            <p className="text-sm text-ggo-text-muted italic">
              No confidence checks recorded in the last 7 days.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
