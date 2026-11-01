import { validateContact } from "@/src/lib/contact";
import { deliverContactMessage } from "@/src/lib/contactDelivery";
export async function POST(request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Invalid origin." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Expected JSON." }, { status: 415 });
  // Bound the actual streamed body, including requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return Response.json({ error: "Missing message." }, { status: 400 });
  let size = 0, raw = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) { await reader.cancel(); return Response.json({ error: "Message too large." }, { status: 413 }); }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    const values = JSON.parse(raw);
    const errors = validateContact(values);
    if (Object.keys(errors).length) return Response.json({ errors }, { status: 400 });
    await deliverContactMessage({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() });
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof SyntaxError) return Response.json({ error: "Invalid JSON." }, { status: 400 });
    return Response.json({ error: "Message could not be sent. Please use the direct email link." }, { status: error.message === "CONTACT_PROVIDER_NOT_CONFIGURED" ? 503 : 502 });
  }
}
