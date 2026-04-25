import { useEffect, useRef } from 'react';
import { useStore } from '../store';

export const useAudioAlerts = () => {
  const { surgeProtocolActive } = useStore();
  const lastAlert = useRef(false);

  useEffect(() => {
    if (surgeProtocolActive && !lastAlert.current) {
        // Play notification sound using Web Audio API
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.5);
        
        lastAlert.current = true;
    } else if (!surgeProtocolActive) {
        lastAlert.current = false;
    }
  }, [surgeProtocolActive]);
};
