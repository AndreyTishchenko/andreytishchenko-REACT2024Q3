// lib/swapi.ts
import { Planet } from "../Types/Planet";
import Result from "../Types/PlanetsResult";

// Получить список планет (поиск + пагинация)
export async function getPlanets(
  search: string,
  page: number,
  limit: number = 10
): Promise<Result> {
  const url = `https://www.swapi.tech/api/planets/?name=${encodeURIComponent(
    search ?? ""
  )}&page=${page}&limit=${limit}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch planets: ${res.status}`);
  }

  const raw = await res.json();

  // API может отдавать и `results`, и `result`
  const items: any[] = Array.isArray(raw.results)
    ? raw.results
    : Array.isArray(raw.result)
    ? raw.result
    : [];

  // нормализация: приводим всё к { properties: PlanetProperties }
  const planets: Planet[] = items.map((item) => {
    if (item?.properties) {
      // полный объект уже есть
      return { properties: item.properties };
    }

    if (item?.result?.properties) {
      return { properties: item.result.properties };
    }

    // fallback: минимальный объект
    return {
      properties: {
        id: item?.uid ?? undefined,
        name: item?.name ?? "Unknown",
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
        url: item?.url ?? "",
        created: "",
        edited: "",
      },
    };
  });

  return {
    count:
      raw.total_records ??
      raw.total ??
      raw.count ??
      planets.length,
    next: raw.next ?? null,
    previous: raw.previous ?? null,
    result: planets,
  };
}

// Получить одну планету по id
export async function getPlanet(id: string): Promise<Planet> {
  const res = await fetch(`https://www.swapi.tech/api/planets/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch planet: ${res.status}`);
  }

  const data = await res.json();

  return {
    properties: data.result.properties,
  } as Planet;
}
