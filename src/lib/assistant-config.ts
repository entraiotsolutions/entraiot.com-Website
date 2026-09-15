export type SalesIntent = "curious" | "interested" | "ready";

export const ENTRAIOT_CONTACT = {
  infoEmail: "info@entraiot.com",
  businessEmail: "bde.entraiot@gmail.com",
  phoneDisplay: "+91 81245 45524",
  phoneRaw: "+918124545524",
  whatsAppDisplay: "+91 99444 42061",
  whatsAppRaw: "+919944442061",
  appointmentPath: "/contact",
} as const;

export const QUICK_REPLIES = [
  "Services",
  "Pricing",
  "Book Demo",
  "Talk to Expert",
] as const;

export function getWhatsappLink(message?: string) {
  const text =
    message ||
    "Hi Entraiot team, I want to learn about your AI and IoT solutions.";
  return `https://wa.me/${ENTRAIOT_CONTACT.whatsAppRaw.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export function getCallLink() {
  return `tel:${ENTRAIOT_CONTACT.phoneRaw}`;
}

export const ENTRAIOT_SYSTEM_PROMPT = `You are Entraiot AI Sales Assistant.
You answer clearly, directly, and in a human tone.
Start with the answer, keep it short (2-5 lines), and avoid robotic intros.
Never use stock opening lines or filler before the answer.
Only provide contact details when relevant.
Be natural, friendly, and helpful without extra filler text.`;
