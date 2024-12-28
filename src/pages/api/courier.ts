export const prerender = false;

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const apiKey = import.meta.env.API_KEY;

  try {
    const courierResponse = await fetch(
      `https://api.binderbyte.com/v1/list_courier?api_key=${apiKey}`
    );
    const couriers = await courierResponse.json();

    if (couriers.length > 0) {
      return new Response(JSON.stringify(couriers), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(
      JSON.stringify({
        status: 404,
        message: "Kami tidak menemukan jasa pengiriman yang tersedia.",
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message:
          "Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
