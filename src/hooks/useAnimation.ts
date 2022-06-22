import { useEffect } from "react";

/**
 * Hook for running an animation.
 */
export default function useAnimation(onFrame: () => void, fps: number) {
  useEffect(() => {
    const interval = setInterval(() => {
      onFrame();
    }, 1000 / fps);

    return () => {
      clearInterval(interval);
    };
  }, [onFrame, fps]);
}
