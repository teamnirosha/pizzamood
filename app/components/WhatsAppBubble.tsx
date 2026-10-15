import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/usps";

// bottom-20 on mobile keeps it above the sticky mobile action bar (z-40) in Footer.
export default function WhatsAppBubble() {
  return (
    <a
      href={whatsappLink("Hi Pizza Mood, I want to know more about the franchise.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Pizza Mood on WhatsApp"
      className="fixed bottom-20 right-4 z-50 flex items-center gap-2 rounded-full bg-emerald-500 p-3.5 text-white shadow-2xl shadow-emerald-600/40 transition hover:bg-emerald-600 md:bottom-6 md:px-5"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-400/50" aria-hidden="true" />
      <MessageCircle className="h-6 w-6" />
      <span className="hidden text-sm font-black md:inline">Chat with us</span>
    </a>
  );
}
