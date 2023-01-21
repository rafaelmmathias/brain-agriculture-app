import { ENVIRONMENT } from "../../config";

if (ENVIRONMENT === "development") {
  await import("./dev-server");
}
