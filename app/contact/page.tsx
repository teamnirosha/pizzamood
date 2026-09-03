"use client";

import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const enquiryTypes = [
  "General Enquiry",
  "Catering / Bulk Requirement",
  "Corporate Enquiry",
  "Franchise / Partnership",
  "Feedback",
  "Complaint",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    enquiryType: "",
    company: "",
    location: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Contact Form:", formData);

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#241a16]">

      {/* ================= HERO ================= */}

      <section className="bg-[#241a16] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold">
              <MessageCircle className="h-4 w-4 text-orange-400" />
              Get In Touch
            </div>

            <h1 className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Let&apos;s talk
              <span className="block text-orange-400">
                over pizza.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
              Have a question, feedback, catering requirement,
              or business enquiry? Send us a message and our
              team will get back to you.
            </p>

          </div>

        </div>
      </section>

      {/* ================= MAIN ================= */}

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-20">

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

          {/* ================= LEFT ================= */}

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Contact Pizzaloot
            </p>

            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              We&apos;d love to
              <span className="block text-orange-500">
                hear from you.
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Whether you want to know more about our menu,
              plan food for an event, share feedback, or simply
              have a question, our team is here to help.
            </p>

            {/* CONTACT INFORMATION */}

            <div className="mt-10 space-y-5">

              <ContactItem
                icon={<Phone className="h-5 w-5" />}
                title="Call Us"
                value="+91 99999 99999"
                href="tel:+919999999999"
              />

              <ContactItem
                icon={<Mail className="h-5 w-5" />}
                title="Email Us"
                value="hello@pizzaloot.in"
                href="mailto:hello@pizzaloot.in"
              />

              <ContactItem
                icon={<MapPin className="h-5 w-5" />}
                title="Visit Us"
                value="Pune, Maharashtra"
              />

              <ContactItem
                icon={<Clock3 className="h-5 w-5" />}
                title="Opening Hours"
                value="11:00 AM - 11:00 PM"
              />

            </div>

            {/* WHATSAPP */}

            <div className="mt-10 rounded-3xl bg-orange-50 p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div>

                  <h3 className="font-black">
                    Need a quick answer?
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Message us on WhatsApp and our team
                    will help you with your enquiry.
                  </p>

                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block font-bold text-orange-600 hover:text-orange-700"
                  >
                    Chat on WhatsApp →
                  </a>

                </div>

              </div>

            </div>

          </div>

          {/* ================= FORM ================= */}

          <div className="rounded-[2rem] border border-orange-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10">

            {!submitted ? (

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* FORM TITLE */}

                <div>

                  <h3 className="text-2xl font-black sm:text-3xl">
                    Send us a message
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Fill out the form below and we&apos;ll
                    get back to you shortly.
                  </p>

                </div>

                {/* NAME + PHONE */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Full Name
                      <span className="ml-1 text-orange-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Phone Number
                      <span className="ml-1 text-orange-500">*</span>
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />
                  </div>

                </div>

                {/* EMAIL + COMPANY */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Email Address
                      <span className="ml-1 text-orange-500">*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Company / Organization
                    </label>

                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />
                  </div>

                </div>

                {/* ENQUIRY TYPE */}

                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Enquiry Type
                    <span className="ml-1 text-orange-500">*</span>
                  </label>

                  <select
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  >

                    <option value="">
                      Select enquiry type
                    </option>

                    {enquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}

                  </select>

                </div>

                {/* LOCATION */}

                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Your area / city"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />

                </div>

                {/* MESSAGE */}

                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Message
                    <span className="ml-1 text-orange-500">*</span>
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />

                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-4 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
                >
                  Send Enquiry

                  <Send className="h-5 w-5 transition group-hover:translate-x-1" />
                </button>

                <p className="text-center text-xs leading-5 text-gray-400">
                  We&apos;ll use your details only to respond
                  to your enquiry.
                </p>

              </form>

            ) : (

              /* ================= SUCCESS ================= */

              <div className="flex min-h-[550px] flex-col items-center justify-center px-4 text-center">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <h3 className="mt-7 text-3xl font-black">
                  Message sent!
                </h3>

                <p className="mt-4 max-w-md leading-7 text-gray-600">
                  Thank you for contacting Pizzaloot.
                  We&apos;ve received your message and our
                  team will get back to you soon.
                </p>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      enquiryType: "",
                      company: "",
                      location: "",
                      message: "",
                    });
                  }}
                  className="mt-8 rounded-full border border-gray-200 px-6 py-3 font-bold transition hover:bg-gray-50"
                >
                  Send Another Message
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

      {/* ================= BOTTOM CTA ================= */}

      <section className="px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">

        <div className="mx-auto max-w-7xl rounded-[2rem] bg-orange-500 px-6 py-12 text-center text-white sm:px-10 lg:py-16">

          <h2 className="text-3xl font-black sm:text-4xl">
            Looking for your nearest outlet?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Find a Pizzaloot location near you and
            discover great food around Pune.
          </p>

          <a
            href="/locations"
            className="mt-7 inline-flex items-center rounded-full bg-white px-7 py-4 font-bold text-orange-600 transition hover:bg-orange-50"
          >
            Find Our Locations
          </a>

        </div>

      </section>

    </main>
  );
}

/* ================= CONTACT ITEM ================= */

function ContactItem({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
        {icon}
      </div>

      <div>

        <p className="text-sm font-bold text-gray-900">
          {title}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {value}
        </p>

      </div>

    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block transition hover:translate-x-1"
      >
        {content}
      </a>
    );
  }

  return content;
}

