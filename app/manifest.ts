import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Danifon | فروشگاه تخصصی اپل",
    short_name: "Danifon",
    description: "قیمت‌گذاری زنده آیفون، موجودی آکبند و کارکرده، محاسبه رجیستری و اقساط",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF6EE",
    theme_color: "#141413",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
