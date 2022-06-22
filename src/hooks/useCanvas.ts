import { useRef } from "react";

export default function useCanvas() {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const setCanvasRef = (element: HTMLCanvasElement | null) => {
    if (element === null) {
      return;
    }

    contextRef.current = element.getContext("2d");

    if (contextRef.current === null) {
      throw new Error("Can't retrieve the context!");
    }
  };

  return { setCanvasRef, contextRef };
}
