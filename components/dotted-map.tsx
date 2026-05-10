import * as React from "react";
import { createMap } from "svg-dotted-map";

import { cn } from "@/lib/utils";

export interface Marker {
  lat: number;
  lng: number;
  size?: number;
  pulse?: boolean;
}

/** addMarkers returns markers with lat/lng removed; only x, y and other props (e.g. size) remain */
type MapMarker<M extends Marker> = Omit<M, "lat" | "lng"> & {
  x: number;
  y: number;
};

export interface DottedMapProps<M extends Marker = Marker>
  extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  mapSamples?: number;
  markers?: M[];
  dotColor?: string;
  markerColor?: string;
  dotRadius?: number;
  stagger?: boolean;
  pulse?: boolean;

  renderMarkerOverlay?: (args: {
    marker: MapMarker<M>;
    index: number;
    x: number;
    y: number;
    r: number;
  }) => React.ReactNode;
}

export function DottedMap<M extends Marker = Marker>({
  width = 150,
  height = 75,
  mapSamples = 5000,
  markers = [],
  dotColor = "currentColor",
  markerColor = "currentColor",
  dotRadius = 0.2,
  stagger = true,
  pulse = false,
  renderMarkerOverlay,
  className,
  style,
  ...svgProps
}: DottedMapProps<M>) {
  const { points, markers: processedMarkers } = createMap({
    width,
    height,
    mapSamples,
    markers: markers.map((m, __index) => ({ ...m, __index })),
  });

  const safePoints = Array.isArray(points) ? points : [];
  const safeMarkers = Array.isArray(processedMarkers) ? processedMarkers : [];

  const sortedPoints = [...safePoints].sort((a, b) => a.y - b.y || a.x - b.x);
  const yToRowIndex = new Map<number, number>();
  let xStep = 0;
  let prevY = Number.NaN;
  let prevXInRow = Number.NaN;

  for (const point of sortedPoints) {
    if (point.y !== prevY) {
      prevY = point.y;
      prevXInRow = Number.NaN;
      if (!yToRowIndex.has(point.y)) yToRowIndex.set(point.y, yToRowIndex.size);
    }
    if (!Number.isNaN(prevXInRow)) {
      const delta = point.x - prevXInRow;
      if (delta > 0) xStep = xStep === 0 ? delta : Math.min(xStep, delta);
    }
    prevXInRow = point.x;
  }

  xStep ||= 1;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("text-white/35", className)}
      style={{ width: "100%", height: "100%", ...style }}
      {...svgProps}
    >
      {safePoints.map((point: { x: number; y: number }, index: number) => {
        const rowIndex = yToRowIndex.get(point.y) ?? 0;
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0;
        return (
          <circle
            cx={point.x + offsetX}
            cy={point.y}
            r={dotRadius}
            fill={dotColor}
            key={`${point.x}-${point.y}-${index}`}
          />
        );
      })}

      {safeMarkers.map((marker: { x: number; y: number; __index?: number }, index: number) => {
        const rowIndex = yToRowIndex.get(marker.y) ?? 0;
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0;

        const x = marker.x + offsetX;
        const y = marker.y;
        const inputIndex = marker.__index ?? index;
        const inputMarker = markers[inputIndex];
        const r = inputMarker?.size ?? dotRadius;
        const shouldPulse = pulse ? inputMarker?.pulse !== false : inputMarker?.pulse === true;
        const pulseTo = r * 2.8;

        return (
          <g key={`${marker.x}-${marker.y}-${index}`}>
            <circle cx={x} cy={y} r={r} fill={markerColor} />

            {shouldPulse ? (
              <g pointerEvents="none">
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill="none"
                  stroke={markerColor}
                  strokeOpacity={1}
                  strokeWidth={0.35}
                >
                  <animate
                    attributeName="r"
                    values={`${r};${pulseTo}`}
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;0"
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill="none"
                  stroke={markerColor}
                  strokeOpacity={0.9}
                  strokeWidth={0.3}
                >
                  <animate
                    attributeName="r"
                    values={`${r};${pulseTo}`}
                    dur="1.4s"
                    begin="0.7s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.9;0"
                    dur="1.4s"
                    begin="0.7s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ) : null}

            {renderMarkerOverlay?.({
              marker: { ...(inputMarker as unknown as MapMarker<M>), x, y },
              index,
              x,
              y,
              r,
            })}
          </g>
        );
      })}
    </svg>
  );
}
