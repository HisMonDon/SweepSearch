import type { Place } from "./types";
import { haversineMeters } from "./haversine";

export function parsePlaces(json: any, userLat: number, userLon: number): Place[] {
    const elements: any[] = json?.elements ?? [];
    const out: Place[] = [];

    for (const el of elements) {
        const tags = el?.tags ?? {};
        const name = (tags?.name ?? "").trim();
        if (!name) continue;

        let lat: number | null = null;
        let lon: number | null = null;

        if (el.type === "node") {
            lat = typeof el.lat === "number" ? el.lat : null;
            lon = typeof el.lon === "number" ? el.lon : null;
        } else if (el.center) {
            lat = typeof el.center.lat === "number" ? el.center.lat : null;
            lon = typeof el.center.lon === "number" ? el.center.lon : null;
        }

        if (lat === null || lon === null) continue;

        const distanceMeters = haversineMeters(userLat, userLon, lat, lon);

        out.push({
            id: `${el.type}_${el.id}`,
            name,
            lat,
            lon,
            tags,
            distanceMeters,
        });
    }

    out.sort((a, b) => a.distanceMeters - b.distanceMeters);
    return out;
}