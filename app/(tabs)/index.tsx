import { useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import type { Category, Place } from "../../src/closest/types";
import { CATEGORIES } from "../../src/closest/categories";
import { getUserLatLon } from "../../src/closest/location";
import { findClosestPlaces } from "../../src/closest/findClosestPlaces";

const Y_OPTIONS = [5, 10, 15, 20, 25, 30];

export default function HomeScreen() {
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [y, setY] = useState<number>(10);
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const loc = await getUserLatLon();
      const places = await findClosestPlaces({
        userLat: loc.lat,
        userLon: loc.lon,
        category,
        y,
      });
      setResults(places);
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 60 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Closest Finder</Text>

      <View style={{ marginTop: 12 }}>
        <Text>Category: {category.label}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
          {CATEGORIES.slice(0, 6).map((c) => (
            <Pressable
              key={c.label}
              onPress={() => setCategory(c)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: 10,
                borderWidth: 1,
              }}
            >
              <Text>{c.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ marginTop: 12 }}>
        <Text>Y: {y}</Text>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
          {Y_OPTIONS.map((n) => (
            <Pressable
              key={n}
              onPress={() => setY(n)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: 10,
                borderWidth: 1,
              }}
            >
              <Text>{n}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable
        onPress={loading ? undefined : run}
        style={{
          marginTop: 14,
          padding: 12,
          backgroundColor: "black",
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>{loading ? "Searching..." : "Find closest"}</Text>
      </Pressable>

      {error ? <Text style={{ marginTop: 12 }}>{error}</Text> : null}

      <FlatList
        style={{ marginTop: 12 }}
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            <Text>{Math.round(item.distanceMeters)} m</Text>
          </View>
        )}
      />
    </View>
  );
}