import React, { useRef, useEffect } from 'react';


interface TimeScrubberProps {
  timeOffset: number;
  setTimeOffset: (time: number | ((prev: number) => number)) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  mode: 'backward' | 'forward';
  setMode: (mode: 'backward' | 'forward') => void;
  incident: any;
}

export const TimeScrubber: React.FC<TimeScrubberProps> = ({
  timeOffset,
  setTimeOffset,
  isPlaying,
  setIsPlaying,
  mode,
  setMode,
  incident
}) => {
  const hasPausedAtIntercept = useRef(false);

  // default to 2.53 if undefined
  const maxDelta = incident?.durationHours || 2.53;
  const detectionTime = incident?.detectionTime || '10:00 UTC';
  const sourceTime = incident?.sourceTime || '07:28 UTC';

  const handlePlayToggle = () => {
    if (!isPlaying) {
      if (mode === 'backward' && timeOffset >= 5.95) {
        setTimeOffset(0.0);
        hasPausedAtIntercept.current = false;
      } else if (mode === 'forward' && timeOffset <= 0.05) {
        setTimeOffset(6.0);
        hasPausedAtIntercept.current = false;
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (timeOffset < 0.5) {
      hasPausedAtIntercept.current = false;
    }
  }, [timeOffset]);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeOffset((prev: number) => {
          let next = mode === 'backward' ? prev + 0.025 : prev - 0.025;

          // Check if we hit the exact source intercept
          if (next >= maxDelta && next <= maxDelta + 0.05 && !hasPausedAtIntercept.current) {
            hasPausedAtIntercept.current = true;
            setIsPlaying(false);
            setTimeout(() => {
              setIsPlaying(true);
            }, 4000);
            return maxDelta; // Lock cleanly
          }
          if (mode === 'backward' && next >= 6.0) {
            setIsPlaying(false);
            return 6.0;
          }
          if (mode === 'forward' && next <= 0.0) {
            setIsPlaying(false);
            return 0.0;
          }
          return parseFloat(next.toFixed(3));
        });
      }, 60);
    }
    return () => clearInterval(interval);
  }, [isPlaying, setTimeOffset, setIsPlaying, mode, maxDelta]);



  return (
    <div className="absolute bottom-6 left-6 right-6 z-[1000] bg-white/95 backdrop-blur-md border border-slate-200 px-4 py-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col gap-2">
      
      <div className="flex items-center justify-between">
        {/* Left Controls: Balanced Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePlayToggle}
            className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-md cursor-pointer transition-all active:scale-95 shrink-0"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          <button
            type="button"
            onClick={() => { setMode('backward'); if (timeOffset >= 5.95) { setTimeOffset(0); hasPausedAtIntercept.current = false; } }}
            className={`h-10 px-4 rounded-xl font-mono font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-colors ${
              mode === 'backward' ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span className="text-sm">↺</span>
            <span>Backward Reconstruction</span>
          </button>

          <button
            type="button"
            onClick={() => { setMode('forward'); if (timeOffset <= 0.05) { setTimeOffset(6.0); hasPausedAtIntercept.current = false; } }}
            className={`h-10 px-4 rounded-xl font-mono font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-colors ${
              mode === 'forward' ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span className="text-sm">⇥</span>
            <span>Forward Drift Prediction</span>
          </button>
        </div>

        {/* Right: Discharge Event Badge (Yellow Pill) */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-300 border border-amber-400 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-800 animate-ping"></span>
          <span className="font-mono text-xs font-black text-slate-950 tracking-wide">
            DISCHARGE TIME: {sourceTime} (T-{maxDelta}h)
          </span>
        </div>
      </div>

      {/* Timeline Range Slider with Light Track */}
      <div className="w-full flex items-center gap-3 pt-1">
        <span className="text-[10px] font-mono font-bold text-slate-500 shrink-0">
          T-0h: Detection ({detectionTime})
        </span>
        <input
          type="range"
          min="0"
          max="6"
          step="0.05"
          value={timeOffset}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setTimeOffset(val);
            if (val < maxDelta - 0.1) hasPausedAtIntercept.current = false;
            setIsPlaying(false);
          }}
          className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <span className="text-[10px] font-mono font-bold text-slate-500 shrink-0">
          T-6h: Pre-Discharge
        </span>
      </div>

    </div>
  );
};
