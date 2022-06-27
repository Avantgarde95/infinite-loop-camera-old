import { useEffect } from "react";

import { dLog } from "utils/DebugUtils";

/**
 * Hook for running an animation.
 */
export default function useAnimation(onFrame: () => void, fps: number) {
  useEffect(() => {
    dLog(`Animation start (Target FPS: ${fps})`);

    const interval = setInterval(() => {
      onFrame();
    }, 1000 / fps);

    return () => {
      clearInterval(interval);
    };
  }, [onFrame, fps]);
}
