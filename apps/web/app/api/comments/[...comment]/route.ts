import { NextComment } from "@fuma-comment/server/next";
import { auth, storage } from "@/server/comments/config";

export const { GET, POST, DELETE, PATCH } = NextComment({
  mention: { enabled: true },
  auth,
  storage,
});
