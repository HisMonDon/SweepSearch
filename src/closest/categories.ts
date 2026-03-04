import type { Category } from "./types";

export const CATEGORIES: Category[] = [
    { label: "Restaurant", tagKey: "amenity", tagValue: "restaurant" },
    { label: "Cafe", tagKey: "amenity", tagValue: "cafe" },
    { label: "Fast Food", tagKey: "amenity", tagValue: "fast_food" },
    { label: "Pharmacy", tagKey: "amenity", tagValue: "pharmacy" },
    { label: "Hospital", tagKey: "amenity", tagValue: "hospital" },
    { label: "Supermarket", tagKey: "shop", tagValue: "supermarket" },
    { label: "Convenience Store", tagKey: "shop", tagValue: "convenience" },
    { label: "Gas Station", tagKey: "amenity", tagValue: "fuel" },
];