import { createHandler } from "@fuma-comment/server/custom";
import { auth, storage } from "@/server/comments/config";

export const { GET, POST, DELETE, PATCH } = createHandler({
  auth,
  storage,
});
