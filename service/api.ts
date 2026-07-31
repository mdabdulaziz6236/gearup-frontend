const API_BASE_URL = process.env.BACKEND_API_URL

export async function getAllGears() {
  const res = await fetch(`${API_BASE_URL}/api/gear`, {
    cache: "no-store", 
  });
  if (!res.ok) throw new Error("Failed to fetch gears");
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_BASE_URL}/api/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getSingleGear(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/gear/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}