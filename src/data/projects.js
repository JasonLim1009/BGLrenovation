import { placeholderProjects, CATEGORIES } from "./projectsData.js";
import generated from "./projects.generated.json";

// scripts/sync-fb-projects.mjs (run on a schedule by
// .github/workflows/sync-projects.yml, see that file for setup) overwrites
// projects.generated.json with real project data pulled from BGL's Facebook
// page. Until that's configured with real credentials, generated.projects
// stays an empty array and the placeholder demo data below is used instead.
export const isLiveData = Array.isArray(generated?.projects) && generated.projects.length > 0;
export const projects = isLiveData ? generated.projects : placeholderProjects;
export { CATEGORIES };
