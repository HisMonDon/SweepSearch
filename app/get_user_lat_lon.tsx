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
