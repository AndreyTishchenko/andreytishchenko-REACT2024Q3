import { getPlanets } from "@/lib/swapi";
import CardList from "@/components/CardsList/CradsList";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const page = Number(searchParams.page ?? 1);
  const search = searchParams.search ?? "";

  const planetList = await getPlanets(search, page, 10);
  return <CardList planetList={planetList} />;
}
