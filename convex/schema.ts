import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    body: v.string(),
    author: v.string(),
  }),
  presence: defineTable({
    user: v.string(),
    room: v.string(),
    updatedAt: v.number(), 
  }).index("by_room", ["room"]),
});