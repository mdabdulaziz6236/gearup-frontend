"use server";
import { cookies } from "next/headers";
const API_BASE_URL = process.env.BACKEND_API_URL;

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

export async function createRental(payload: {
  gearId: string;
  startDate: string;
  endDate: string;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(`${API_BASE_URL}/api/rentals`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  return result;
}

export async function getMyRentals() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${API_BASE_URL}/api/rentals`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch rentals");
  const result = await res.json();

  return result;
}

export async function initiatePayment(payload: { rentalOrderId: string }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(`${API_BASE_URL}/api/payments/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Payment initiation failed");

  return result;
}

export async function confirmPayment(payload: { transactionId: string }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(`${API_BASE_URL}/api/payments/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Payment verification failed");
  return data;
}

export async function getMyPayments() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(
    `${API_BASE_URL}/api/payments`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch payments");
  return await res.json();
}

export async function getPaymentDetails(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(
    `${API_BASE_URL}/api/payments/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch payment details");
  return await res.json();
}



export async function getSingleRentalOrder(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${API_BASE_URL}/api/rentals/${id}`, {
    headers: {
       "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Failed to fetch order details");
  return await res.json();
}


export async function submitReview(
  payload: { gearId: string; rating: number; comment: string }, 
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(`${API_BASE_URL}/api/reviews`, {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload)
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to submit review");
  return data;
}


export async function getSingleReview(gearId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${API_BASE_URL}/api/reviews/${gearId}`, {
    headers: {
       "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Failed to fetch order details");
  const result = await res.json()
  return result
}