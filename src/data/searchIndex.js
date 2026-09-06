import { galleries } from "./swiperData.js";

// static page entries
const pageEntries = [
  { title: "Home", subtitle: "首页", path: "/", hash: null },
  { title: "Service", subtitle: "所有服务分类", path: "/service", hash: null },
  { title: "Portfolio", subtitle: "项目作品集地图", path: "/portfolio", hash: null },
  { title: "Contact Us", subtitle: "WhatsApp / 联系方式", path: "/contact", hash: null },
];

// one entry per gallery category on the Service page, deep-linked via #<cls>
const categoryEntries = galleries.map((g) => ({
  title: g.label,
  subtitle: "Service Gallery",
  path: "/service",
  hash: g.cls,
}));

// a couple of friendly aliases pointing at the same categories, since
// customers may search using a different name than the gallery label
const aliasEntries = [
  { title: "PU Panel", subtitle: "Service Gallery", path: "/service", hash: "swiper3" },
  { title: "Wall Panel", subtitle: "Service Gallery", path: "/service", hash: "swiper3" },
  { title: "Plaster Ceiling", subtitle: "Service Gallery", path: "/service", hash: "swiper1" },
  { title: "Electrical", subtitle: "Service Gallery", path: "/service", hash: "swiper1" },
  { title: "Painting", subtitle: "Service Gallery", path: "/service", hash: "swiper2" },
  { title: "Furniture & Cabinet", subtitle: "Service Gallery", path: "/service", hash: "swiper7" },
];

export const searchIndex = [...pageEntries, ...categoryEntries, ...aliasEntries];
