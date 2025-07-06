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

export default function HotelChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // تحميل الرسائل من قاعدة البيانات
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/messages/hotel/association");
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
        console.error("فشل في تحميل الرسائل:", err);
      }
    };

    fetchMessages();

    // الاستماع للرسائل الجديدة
    socket.on("receiveMessage", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSend = async () => {
    if (newMessage.trim() === "") return;

    const message = {
      sender: "hotel",
      receiver: "association",
      content: newMessage,
    };

    const displayMessage: Message = {
      sender: "hotel",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    try {
      // حفظ الرسالة في قاعدة البيانات
      await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      // إرسال عبر socket
      socket.emit("sendMessage", displayMessage);

      setMessages((prev) => [...prev, displayMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("فشل في إرسال الرسالة:", error);
    }
  };

  return (
    <div className="flex flex-col h-[90vh] bg-emerald-50 rounded-xl border border-emerald-200 shadow-md p-4">
      <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Chat with Association</h2>

      <ScrollArea className="flex-1 overflow-y-auto bg-white rounded-md p-4 border border-emerald-100 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col mb-3 ${
              msg.sender === "hotel" ? "items-end" : "items-start"
            }`}
          >
            <Card
              className={`max-w-xs px-3 py-2 ${
                msg.sender === "hotel"
                  ? "bg-emerald-100 text-emerald-900"
                  : "bg-lime-100 text-emerald-950"
              }`}
            >
              <CardContent className="p-0">{msg.content}</CardContent>
            </Card>
            <span className="text-xs text-muted-foreground mt-1">
              {msg.timestamp}
            </span>
          </div>
        ))}
      </ScrollArea>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border-emerald-300 focus:ring-emerald-500"
        />
        <Button onClick={handleSend} className="bg-emerald-600 hover:bg-emerald-700">
          Send
        </Button>
      </div>
    </div>
  );
}