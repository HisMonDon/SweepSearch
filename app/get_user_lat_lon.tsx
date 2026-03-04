import * as Location from "expo-location";

export async function getUserLatLon() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Location permission not granted");
  }

  const pos = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  return { lat: pos.coords.latitude, lon: pos.coords.longitude };
}
export function buildOverpassQuery({ lat, lon, radius, tagKey, tagValue }: { lat: number; lon: number; radius: number; tagKey: string; tagValue: string }) {
  return `
[out:json][timeout:25];
(
  node(around:${radius},${lat},${lon})["${tagKey}"="${tagValue}"];
  way(around:${radius},${lat},${lon})["${tagKey}"="${tagValue}"];
  relation(around:${radius},${lat},${lon})["${tagKey}"="${tagValue}"];
);
out center 300;
`;
}