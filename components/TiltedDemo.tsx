import { DemoVideo } from "./DemoVideo";

// The looping demo, rotated away with CSS 3D at rest to match the "Tilted video frame" in
// Frame-01; hovering (or focusing the video) eases it flat.
export function TiltedDemo() {
  return (
    <div className="tilt-stage">
      <div className="tilt-frame">
        <DemoVideo className="tilt-video" />
      </div>
    </div>
  );
}
