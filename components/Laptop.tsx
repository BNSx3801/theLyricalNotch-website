import Image from "next/image";
import macbook from "@/public/assets/macbook.png";
import { DemoVideo } from "./DemoVideo";

// The design shows the 1487×1058 frame PNG in a 1146×744 box with `background-size: cover`,
// which trims 46px of transparent margin from the top and bottom (the artwork itself starts at
// y=102). The screen is a transparent cutout in that PNG, measured from its alpha channel as
// x 163–1323, y 127–866. Converted to the cropped box and padded 1px on every side so the
// bezel's anti-aliased edge never lets the page background peek through.
const screen = {
  left: "10.894%",
  top: "8.256%",
  width: "78.211%",
  height: "76.859%",
} as const;

export function Laptop() {
  return (
    <div className="relative w-[min(1146px,92vw)]" style={{ aspectRatio: "1146 / 744" }}>
      <DemoVideo className="absolute bg-black object-cover" style={screen} />
      <Image
        src={macbook}
        alt=""
        fill
        priority
        sizes="(min-width: 1246px) 1146px, 92vw"
        className="pointer-events-none z-10 object-cover select-none"
      />
    </div>
  );
}
