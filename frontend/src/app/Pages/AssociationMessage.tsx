import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

interface Message {
  sender: "hotel" | "association";
  content: string;
  timestamp: string;
}

export default function AssociationChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // تحميل المحادثات القديمة
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/messages/association/hotel");
        const data = await res.json();
        const formatted = data.map((msg: any) => ({
          sender: msg.sender,
          content: msg.content,
          timestamp: new Date(msg.sentAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setMessages(formatted);
      } catch (err) {
        console.error("فشل تحميل الرسائل:", err);
      }
    };

    fetchMessages();

    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSend = async () => {
    if (newMessage.trim() === "") return;

    const message = {
      sender: "association",
      receiver: "hotel",
      content: newMessage,
    };

    const displayMessage: Message = {
      sender: "association",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    try {
      await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      socket.emit("sendMessage", displayMessage);
      setMessages((prev) => [...prev, displayMessage]);
      setNewMessage("");
    } catch (err) {
      console.error("فشل إرسال الرسالة:", err);
    }
  };

  return (
    <div className="flex flex-col h-[90vh] bg-lime-50 rounded-xl border border-lime-200 shadow-md p-4">
      <h2 className="text-2xl font-semibold text-lime-800 mb-4">Chat with Hotel</h2>

      <ScrollArea className="flex-1 overflow-y-auto bg-white rounded-md p-4 border border-lime-100 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col mb-3 ${
              msg.sender === "association" ? "items-end" : "items-start"
            }`}
          >
            <Card
              className={`max-w-xs px-3 py-2 ${
                msg.sender === "association"
                  ? "bg-lime-100 text-lime-900"
                  : "bg-emerald-100 text-emerald-950"
              }`}
            >
              <CardContent className="p-0">{msg.content}</CardContent>
            </Card>
            <span className="text-xs text-muted-foreground mt-1">{msg.timestamp}</span>
          </div>
        ))}
      </ScrollArea>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border-lime-300 focus:ring-lime-500"
        />
        <Button onClick={handleSend} className="bg-lime-600 hover:bg-lime-700">
          Send
        </Button>
      </div>
    </div>
  );
}