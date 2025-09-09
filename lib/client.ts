// Typat fetch-anrop till API:t
export async function fetchFromApi(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  return res.json();
}
