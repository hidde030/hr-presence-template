import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const update = mutation({
  args: { user: v.string(), room: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("presence")
      .filter((q) => q.and(q.eq(q.field("user"), args.user), q.eq(q.field("room"), args.room)))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { updatedAt: Date.now() });
    } else {
      await ctx.db.insert("presence", { ...args, updatedAt: Date.now() });
    }
  },
});

export const list = query({
  args: { room: v.string() },
  handler: async (ctx, args) => {
    const cutoff = Date.now() - 30000; 
    return await ctx.db
      .query("presence")
      .withIndex("by_room", (q) => q.eq("room", args.room))
      .filter((q) => q.gt(q.field("updatedAt"), cutoff))
      .collect();
  },
});