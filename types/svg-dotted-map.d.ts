declare module "svg-dotted-map" {
  interface Region {
    lat: {
      min: number;
      max: number;
    };
    lng: {
      min: number;
      max: number;
    };
  }

  type Marker<MarkerData> = {
    lat: number;
    lng: number;
    size?: number;
  } & MarkerData;

  export interface CreateMapOptions<T = void> {
    height: number;
    width: number;
    radius?: number;
    countries?: string[];
    mapSamples?: number;
    region?: Region;
    markers: Marker<T>[];
  }

  export type Point = {
    x: number;
    y: number;
  };

  export const createMap: <MarkerData>({
    height,
    width,
    countries,
    region,
    markers,
    radius,
    mapSamples,
  }: CreateMapOptions<MarkerData>) => {
    points: Point[];
    markers: ({ x: number; y: number } & Omit<Marker<MarkerData>, "lat" | "lng" | "size">)[];
  };
}
