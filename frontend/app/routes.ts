import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/defaultLayout.tsx", [
    index("routes/dashboard.tsx"),
    route("about", "routes/about.tsx"),
  ]),
] satisfies RouteConfig;
