import { getPlanet } from "@/lib/swapi";

type SP = { page?: string; search?: string };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams
  const page = Number(sp.page ?? 1);
  const search = sp.search ?? "";

    // const planet = getPlanet()

    return <>
        {/* <Outlet /> */}
    </>;
}