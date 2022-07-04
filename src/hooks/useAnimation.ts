import { useEffect } from "react";

import { dLog } from "utils/DebugUtils";

/**
 * Hook for running an animation.
 */
export default function useAnimation(onFrame: () => void, fps: number) {
  useEffect(() => {
    const interval = setInterval(() => {
      onFrame();
    }, 1000 / fps);

    dLog(`Started an animation (Target FPS: ${fps})`);

    return () => {
      clearInterval(interval);
      dLog("Stopped the animation");
    };
  }, [onFrame, fps]);
}
