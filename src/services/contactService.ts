export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface SubmissionResult {
  success: boolean;
  method: 'emailjs' | 'mailto';
  message: string;
}

/**
 * Sends a contact form message via EmailJS REST API.
 * Falls back to mailto: if EmailJS keys are not configured.
 */
export async function sendContactMessage(data: ContactFormData): Promise<SubmissionResult> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // ── EmailJS ────────────────────────────────────────────────────────────────
  if (serviceId && templateId && publicKey) {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            user_name: data.name,
            user_email: data.email,
            from_name: data.name,
            from_email: data.email,
            reply_to: data.email,
            time: new Date().toLocaleString(),
            submitted_at: new Date().toLocaleString(),
            message: data.message,
            to_name: 'Priyanga V S',
          },
        }),
      });

      if (response.ok) {
        return {
          success: true,
          method: 'emailjs',
          message: 'Your message has been sent successfully!',
        };
      }

      console.warn('EmailJS returned non-OK:', await response.text());
    } catch (err) {
      console.error('EmailJS request failed:', err);
    }
  }

  // ── Mailto fallback ────────────────────────────────────────────────────────
  const subject = encodeURIComponent(`Portfolio enquiry from ${data.name}`);
  const body = encodeURIComponent(`${data.message}\n\n- ${data.name} (${data.email})`);
  window.location.href = `mailto:priyangaa7512@gmail.com?subject=${subject}&body=${body}`;

  return {
    success: true,
    method: 'mailto',
    message: 'Opening your email client to send the message…',
  };
}
