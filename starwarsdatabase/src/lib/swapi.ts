// lib/swapi.ts
import { Planet } from "../Types/Planet";
import Result from "../Types/PlanetsResult";

// ---------- Вспомогательные типы для ответов API ----------

type PlanetProps = Planet["properties"];

interface ItemWithProperties {
  properties: PlanetProps;
}
interface ItemWithResultProperties {
  result: { properties: PlanetProps };
}
interface ItemMinimal {
  uid?: string;
  name?: string;
  url?: string;
}
type Item = ItemWithProperties | ItemWithResultProperties | ItemMinimal;

interface BaseListMeta {
  total_records?: number;
  total?: number;
  count?: number;
  next?: string | null;
  previous?: string | null;
}
interface RawListWithResults extends BaseListMeta {
  results: Item[];
}
interface RawListWithResult extends BaseListMeta {
  result: Item[]; // swapi.tech иногда так делает при поиске
}
type RawListResponse = RawListWithResults | RawListWithResult;

interface RawPlanetResponse {
  result: { properties: PlanetProps };
}

// ---------- Тайпгварды ----------

function hasResultsArray(raw: RawListResponse): raw is RawListWithResults {
  return Array.isArray((raw as RawListWithResults).results);
}
function hasResultArray(raw: RawListResponse): raw is RawListWithResult {
  return Array.isArray((raw as RawListWithResult).result);
}
function itemHasProperties(item: Item): item is ItemWithProperties {
  return typeof (item as ItemWithProperties).properties === "object";
}
function itemHasResultProperties(item: Item): item is ItemWithResultProperties {
  const maybe = item as ItemWithResultProperties;
  return typeof maybe.result === "object" && typeof maybe.result.properties === "object";
}

// ---------- Публичные функции ----------

export async function getPlanets(
  search: string,
  page: number,
  limit: number = 10
): Promise<Result> {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const url = `https://www.swapi.tech/api/planets/?name=${encodeURIComponent(
    search ?? ""
  )}&page=${safePage}&limit=${limit}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch planets: ${res.status}`);
  }

  const raw: RawListResponse = await res.json();

  const items: Item[] = hasResultsArray(raw)
    ? raw.results
    : hasResultArray(raw)
    ? raw.result
    : [];

  const planets: Planet[] = items.map<Planet>((item) => {
    if (itemHasProperties(item)) {
      return { properties: item.properties };
    }
    if (itemHasResultProperties(item)) {
      return { properties: item.result.properties };
    }
    // Fallback для урезанных элементов (uid/name/url)
    const props: PlanetProps = {
      id: item.uid,
      name: item.name ?? "Unknown",
      diameter: "",
      rotation_period: "",
      orbital_period: "",
      gravity: "",
      population: "",
      climate: "",
      terrain: "",
      surface_water: "",
      residents: [],
      films: [],
      url: item.url ?? "",
      created: "",
      edited: "",
    };
    return { properties: props };
  });

  const count: number =
    (typeof raw.total_records === "number" && raw.total_records) ||
    (typeof raw.total === "number" && raw.total) ||
    (typeof raw.count === "number" && raw.count) ||
    planets.length;

  const next: string | null =
    (typeof (raw as BaseListMeta).next === "string" ? (raw as BaseListMeta).next : null) ?? null;
  const previous: string | null =
    (typeof (raw as BaseListMeta).previous === "string"
      ? (raw as BaseListMeta).previous
      : null) ?? null;

  // Нормализованный контракт: result: Planet[]
  const normalized: Result = {
    count,
    next,
    previous,
    result: planets,
  };
  return normalized;
}

export async function getPlanet(id: string): Promise<Planet> {
  if (!id) throw new Error("getPlanet: id is required");

  const res = await fetch(`https://www.swapi.tech/api/planets/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch planet: ${res.status}`);
  }

  const data: RawPlanetResponse = await res.json();
  return { properties: data.result.properties };
}
