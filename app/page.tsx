"use client"

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect } from "react";

export default function page() {
  const messages = useQuery(api.chat.list);
  const onlineUsers = useQuery(api.presence.list, { room: "main" });
  const updatePresence = useMutation(api.presence.update);
  const sendMessage = useMutation(api.chat.send);

  // Heartbeat effect
  useEffect(() => {
    const interval = setInterval(() => {
      updatePresence({ user: "JeNaam", room: "main" });
    }, 10000); // Elke 10 seconden
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex">
      <div className="w-3/4">
        {messages?.map(m => <p key={m._id}>{m.author}: {m.body}</p>)}
      </div>
      <div className="w-1/4 bg-gray-100">
        <h3>Wie is er online?</h3>
        {onlineUsers?.map(u => <div key={u._id}>🟢 {u.user}</div>)}
      </div>
    </div>
  );
}