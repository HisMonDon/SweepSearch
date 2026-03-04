export type Category = {
    label: string;
    tagKey: string;
    tagValue: string;
};

export type Place = {
    id: string;
    name: string;
    lat: number;
    lon: number;
    tags: Record<string, any>;
    distanceMeters: number;
};