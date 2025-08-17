import { Html, useProgress } from "@react-three/drei";

function Loader() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <Html center>
      <div style={{ fontFamily: "system-ui", fontWeight: 600 }}>
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

export default Loader;
