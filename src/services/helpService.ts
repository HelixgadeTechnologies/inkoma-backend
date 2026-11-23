import { apiClient } from "@/src/services/api";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  faqs: FaqItem[];
}

export interface SupportTicketPayload {
  name: string;
  email: string;
  category?: string;
  subject: string;
  message: string;
  priority?: "low" | "normal" | "high";
}

export interface SupportTicketRecord {
  id: string;
  ticketId: string;
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  priority: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: string;
}

/**
 * 6. Help Center & Support Tickets
 * GET /api/v1/help/faqs (Public)
 * Returns categorized FAQs for General, Storyteller, Billing, and Technical topics.
 */
export async function getFaqs(): Promise<FaqCategory[]> {
  try {
    const res = await apiClient.get<any>("/help/faqs");
    const data = res?.data || res || {};
    const categories: FaqCategory[] = data.faqs || [];
    return categories;
  } catch (error) {
    console.warn("[HelpService] Failed to fetch FAQs:", error);
    return [];
  }
}

/**
 * POST /api/v1/help/tickets (Public or Protected)
 * Submits ticket inquiry, generates ticket tracking ID (e.g. INK-681098), and stores in DB.
 */
export async function submitSupportTicket(
  payload: SupportTicketPayload
): Promise<{ ticketId: string; message: string }> {
  const res = await apiClient.post<any>("/help/tickets", payload);
  const data = res?.data || res || {};
  return {
    ticketId: data.ticketId || data.ticket?.ticketId || `INK-${Date.now().toString().slice(-6)}`,
    message: data.message || "Support ticket submitted successfully",
  };
}

/**
 * GET /api/v1/help/tickets/my (Protected)
 * Returns user ticket tracking history.
 */
export async function getMyTickets(): Promise<SupportTicketRecord[]> {
  try {
    const res = await apiClient.get<any>("/help/tickets/my");
    const data = res?.data || res || {};
    const list: any[] = data.tickets || (Array.isArray(data) ? data : []);
    return list.map((t: any) => ({
      id: String(t._id || t.id || ""),
      ticketId: t.ticketId || `INK-${t._id?.slice(-6) || "000000"}`,
      name: t.name || "",
      email: t.email || "",
      category: t.category || "General",
      subject: t.subject || "",
      message: t.message || "",
      priority: t.priority || "normal",
      status: t.status || "open",
      createdAt: t.createdAt || new Date().toISOString(),
    }));
  } catch (error) {
    console.warn("[HelpService] Failed to fetch user tickets:", error);
    return [];
  }
}
