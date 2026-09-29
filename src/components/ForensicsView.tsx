import React from 'react';
import { SuspectsPanel } from './SuspectsPanel';

interface ForensicsViewProps {
  onBack: () => void;
  incident: any;
  timeOffset: number;
  counterfactualVesselId: string | null;
  onSelectCounterfactual: (id: string | null) => void;
  onSelectVessel: (vessel: any) => void;
  onOpenProofModal: () => void;
  children?: React.ReactNode;
}

export const ForensicsView: React.FC<ForensicsViewProps> = ({
  onBack,
  incident,
  timeOffset,
  counterfactualVesselId,
  onSelectCounterfactual,
  onSelectVessel,
  onOpenProofModal,
  children
}) => {
  return (
    <div className="relative w-full h-[calc(100vh-108px)] flex flex-row overflow-hidden bg-slate-950 text-white font-mono select-none">
      
      {/* === CENTER COLUMN: DEDICATED MAP CANVAS (Strictly middle, zero right-panel bleed) === */}
      <div className="flex-1 relative h-full overflow-hidden flex flex-col">
        
        {/* Floating Return Button */}
        <div className="absolute top-4 left-4 z-[1000]">
          <button
            onClick={onBack}
            className="bg-slate-900/95 hover:bg-slate-800 text-white border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 backdrop-blur-md shadow-lg cursor-pointer transition-all active:scale-95"
          >
            <span>←</span>
            <span>Return to Regional Surveillance</span>
          </button>
        </div>

        {/* Map Container and Scrubber Confined to Center Viewport via children */}
        {children}
      </div>

      {/* === RIGHT COLUMN: DEDICATED SUSPECT VESSELS PANEL (Fully Scrollable) === */}
      <div className="w-[420px] h-full shrink-0 bg-slate-900 border-l border-slate-800 flex flex-col z-20 shadow-2xl overflow-hidden">
        <SuspectsPanel 
          counterfactualVesselId={counterfactualVesselId}
          onSelectCounterfactual={onSelectCounterfactual} 
          onSelectVessel={onSelectVessel} 
          onOpenProofModal={onOpenProofModal}
          timeOffset={timeOffset} 
          incident={incident}
        />
      </div>
    </div>
  );
};
