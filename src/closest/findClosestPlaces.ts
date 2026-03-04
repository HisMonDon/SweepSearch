import type { Category, Place } from "./types";
import { buildOverpassQuery, overpassRequest } from "./overpass";
import { parsePlaces } from "./parsePlaces";

export async function findClosestPlaces(args: {
    userLat: number;
    userLon: number;
    category: Category;
    y: number;
}) {
    const { userLat, userLon, category, y } = args;

    const radii = [1000, 3000, 8000, 15000];
    const seen = new Set<string>();
    const all: Place[] = [];

    for (const r of radii) {
        const q = buildOverpassQuery({
            lat: userLat,
            lon: userLon,
            radiusMeters: r,
            tagKey: category.tagKey,
            tagValue: category.tagValue,
        });

        const json = await overpassRequest(q);
        const places = parsePlaces(json, userLat, userLon);

        for (const p of places) {
            if (!seen.has(p.id)) {
                seen.add(p.id);
                all.push(p);
            }
        }

        all.sort((a, b) => a.distanceMeters - b.distanceMeters);
        if (all.length >= y) return all.slice(0, y);
    }

    all.sort((a, b) => a.distanceMeters - b.distanceMeters);
    return all.slice(0, Math.min(y, all.length));
}