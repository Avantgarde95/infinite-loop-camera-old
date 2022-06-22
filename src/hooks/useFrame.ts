import { useEffect } from "react";

export default function useFrame(onFrame: () => void) {
  useEffect(() => {
    const interval = setInterval(() => {
      onFrame();
    }, 1000 / 30);

    return () => {
      clearInterval(interval);
    };
  }, [onFrame]);
}
