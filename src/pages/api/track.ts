export const prerender = false;

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const awb = url.searchParams.get("awb");
  const courier = url.searchParams.get("courier");
  const apiKey = import.meta.env.API_KEY;

  if (!awb || !courier) {
    return new Response(
      JSON.stringify({
        status: 400,
        message: "Nomor resi dan ekspedisi harus diisi.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await fetch(
      `https://api.binderbyte.com/v1/track?api_key=${apiKey}&courier=${courier}&awb=${awb}`
    );
    const data = await response.json();

    if (data.status === 200) {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(
      JSON.stringify({
        status: 404,
        message:
          "Nomor resi tidak ditemukan. Mohon periksa kembali nomor resi Anda.",
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
          "Terjadi kesalahan saat melacak paket. Silakan coba lagi nanti.",
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
