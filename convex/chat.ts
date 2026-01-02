import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const send = mutation({
  args: { body: v.string(), author: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", { body: args.body, author: args.author });
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("desc").take(50);
  },
});