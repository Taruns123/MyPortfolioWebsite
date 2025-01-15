import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export const LoadingScreen = (props) => {
  const { started, setStarted } = props;
  const { progress } = useProgress();

  const [dampProgress, setDampProgress] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const updateDampProgress = () => {
      setDampProgress((prev) => {
        const delta = progress - prev;
        const step = delta * 0.1; // Adjust the damping factor (0.1 for smoother change, lower is slower)
        const nextProgress = prev + step;

        // If the progress is close enough to the target, snap to the target
        if (Math.abs(delta) < 0.1) {
          return progress;
        }

        return nextProgress;
      });

      animationFrameId = requestAnimationFrame(updateDampProgress);
    };

    updateDampProgress();

    // Clean up animation frame when component unmounts or progress changes
    return () => cancelAnimationFrame(animationFrameId);
  }, [progress]);

  useEffect(() => {
    if (dampProgress >= 100) {
      // Add a small delay for smoothness
      setTimeout(() => setStarted(true), 500);
    }
  }, [dampProgress, setStarted]);

  useEffect(() => {
    if (!started) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [started]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-700 delay-400 pointer-events-none
  flex items-center justify-center bg-black ;
  ${started ? "opacity-0" : "opacity-100"}`}
    >
      <div
        className="text-4xl md:text-9xl font-extrabold text-[#0039a6] relative h-30 md:h-58"
        style={{ fontFamily: "PPNeueMontreal-Bold, sans-serif" }}
      >
        <div
          className="absolute left-0 top-0 h-40 md:h-60  overflow-hidden truncate text-clip transition-all duration-500"
          style={{
            fontFamily: "PPNeueMontreal-Bold, sans-serif",
            width: `${dampProgress}%`,
          }}
        >
          Tarun Shetty
        </div>
        <div className="opacity-40">Tarun Shetty</div>
      </div>
    </div>
  );
};
