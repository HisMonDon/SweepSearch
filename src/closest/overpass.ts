export function buildOverpassQuery(args: {
    lat: number;
    lon: number;
    radiusMeters: number;
    tagKey: string;
    tagValue: string;
}) {
    const { lat, lon, radiusMeters, tagKey, tagValue } = args;

    return `
[out:json][timeout:25];
(
  node(around:${radiusMeters},${lat},${lon})["${tagKey}"="${tagValue}"];
  way(around:${radiusMeters},${lat},${lon})["${tagKey}"="${tagValue}"];
  relation(around:${radiusMeters},${lat},${lon})["${tagKey}"="${tagValue}"];
);
out center 300;
`;
}

export async function overpassRequest(query: string) {
    const resp = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "User-Agent": "sweepsearch/1.0",
        },
        body: "data=" + encodeURIComponent(query),
    });

    if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Overpass error ${resp.status}: ${text}`);
    }

    return resp.json();
}