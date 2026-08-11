import React, { useMemo, useState } from 'react';
import { CheckCircle2Icon, SendIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { profile, socialLinks } from '../data/profile';
import { useSeo } from '../hooks/useSeo';
import { breadcrumbSchema, personSchema } from '../utils/seo';

interface FormState {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = { name: '', email: '', message: '' };

export function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  const jsonLd = useMemo(
    () => [
    personSchema,
    breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' }]
    )],

    []
  );

  useSeo({
    title: 'Contact | Priyanga V S',
    description:
    'Get in touch with Priyanga V S, Data Analyst based in Tamil Nadu, India — available for Data Analyst, Business Analyst and BI roles.',
    path: '/contact',
    jsonLd
  });

  const validate = (values: FormState): FormErrors => {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (values.message.trim().length < 10) next.message = 'Please add a little more detail (10+ characters).';
    return next;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name.trim()}`);
    const body = encodeURIComponent(`${form.message.trim()}\n\n— ${form.name.trim()} (${form.email.trim()})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const fieldClasses =
  'w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted focus:border-primary focus:outline-none';

  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about data roles"
        description="Open to Data Analyst, Business Analyst, BI and reporting opportunities. The quickest route is email." />
      

      <section className="py-12 sm:py-16" aria-labelledby="contact-heading">
        <div className="mx-auto grid max-w-content gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div>
              <h2 id="contact-heading" className="font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                Contact details
              </h2>
              <ul className="mt-6 space-y-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  const external = social.href.startsWith('http');
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors duration-200 hover:border-primary">
                        
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                          <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                            {social.label}
                          </span>
                          <span className="block truncate text-sm font-medium text-fg">{social.display}</span>
                        </span>
                      </a>
                    </li>);

                })}
              </ul>
              <p className="mt-6 text-sm text-muted">Based in {profile.location}.</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
              <h2 className="font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                Send a message
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                This form opens your email client with the message ready to send.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-fg">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={fieldClasses}
                    placeholder="Your name" />
                  
                  {errors.name ?
                  <p id="contact-name-error" className="mt-2 text-xs text-warning">
                      {errors.name}
                    </p> :
                  null}
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-fg">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={fieldClasses}
                    placeholder="you@company.com" />
                  
                  {errors.email ?
                  <p id="contact-email-error" className="mt-2 text-xs text-warning">
                      {errors.email}
                    </p> :
                  null}
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-fg">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`${fieldClasses} resize-y`}
                    placeholder="Tell me about the role or the problem you're solving." />
                  
                  {errors.message ?
                  <p id="contact-message-error" className="mt-2 text-xs text-warning">
                      {errors.message}
                    </p> :
                  null}
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                  <SendIcon className="h-4 w-4" aria-hidden="true" />
                  Send message
                </Button>

                <p aria-live="polite" className="min-h-[1.25rem]">
                  {sent ?
                  <span className="inline-flex items-center gap-2 text-sm text-success">
                      <CheckCircle2Icon className="h-4 w-4" aria-hidden="true" />
                      Your email client should now be open with the message ready.
                    </span> :
                  null}
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </main>);

}