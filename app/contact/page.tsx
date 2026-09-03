"use client";

import { FormEvent, useState } from "react";
import {
//   ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const eventTypes = [
  "Corporate Event",
  "Birthday Party",
  "College Event",
  "Wedding / Function",
  "Family Gathering",
  "Other",
];

const quantityOptions = [
  "10 - 25 People",
  "25 - 50 People",
  "50 - 100 People",
  "100 - 250 People",
  "250+ People",
];

export default function ContactPage() {
  const searchParams = useSearchParams();

  const selectedProduct =
    searchParams.get("product") || "";

  const [submitted, setSubmitted] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    eventType: "",
    people: "",
    eventDate: "",
    eventTime: "",
    location: "",
    product: selectedProduct,
    quantity: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("Bulk Order Enquiry:", formData);

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#241a16]">

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative overflow-hidden bg-[#241a16] text-white">

        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold">
              <MessageCircle className="h-4 w-4 text-orange-400" />
              Bulk Order Enquiry
            </div>

            <h1 className="text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
              Planning a big
              <span className="block text-orange-400">
                pizza moment?
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
              Tell us about your event and what you need.
              Our team will help you plan the right pizzas,
              sides and drinks for your group.
            </p>

          </div>

        </div>

      </section>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-20">

        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">

          {/* ==================================================
              LEFT INFORMATION
          ================================================== */}

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Let's Plan It
            </p>

            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Great food for
              <span className="block text-orange-500">
                every occasion.
              </span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Whether you're organizing an office lunch,
              birthday, college event or family gathering,
              Pizzaloot can help make feeding a crowd simple.
            </p>

            {/* SELECTED PRODUCT */}

            {selectedProduct && (
              <div className="mt-8 rounded-3xl border border-orange-200 bg-orange-50 p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Selected Product
                </p>

                <p className="mt-2 text-xl font-black">
                  {selectedProduct}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Your bulk enquiry is for this product.
                  You can add more requirements below.
                </p>

              </div>
            )}

            {/* BENEFITS */}

            <div className="mt-8 space-y-4">

              <InfoItem
                icon={<CheckCircle2 />}
                title="Flexible quantities"
                description="Tell us how many people you're serving."
              />

              <InfoItem
                icon={<Clock3 />}
                title="Planned delivery"
                description="Share your preferred date and time."
              />

              <InfoItem
                icon={<MessageCircle />}
                title="Personal assistance"
                description="Our team can help you choose the right package."
              />

            </div>

            {/* CONTACT DETAILS */}

            <div className="mt-10 border-t border-orange-100 pt-8">

              <p className="font-bold">
                Prefer to talk directly?
              </p>

              <div className="mt-5 space-y-4">

                <a
                  href="tel:+919999999999"
                  className="flex items-center gap-3 text-gray-600 transition hover:text-orange-500"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                    <Phone className="h-4 w-4" />
                  </span>

                  +91 99999 99999
                </a>

                <a
                  href="mailto:hello@pizzaloot.in"
                  className="flex items-center gap-3 text-gray-600 transition hover:text-orange-500"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                    <Mail className="h-4 w-4" />
                  </span>

                  hello@pizzaloot.in
                </a>

                <div className="flex items-center gap-3 text-gray-600">

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                    <MapPin className="h-4 w-4" />
                  </span>

                  Pune, Maharashtra
                </div>

              </div>

            </div>

          </div>

          {/* ==================================================
              FORM
          ================================================== */}

          <div className="rounded-[2rem] border border-orange-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10">

            {!submitted ? (

              <form
                onSubmit={handleSubmit}
                className="space-y-7"
              >

                {/* FORM HEADER */}

                <div>
                  <h3 className="text-2xl font-black sm:text-3xl">
                    Tell us what you need
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Fill in the details below and our team
                    will get back to you.
                  </p>
                </div>

                {/* PERSONAL DETAILS */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <InputField
                    label="Full Name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    label="Company / Organization"
                    name="company"
                    placeholder="Optional"
                    value={formData.company}
                    onChange={handleChange}
                  />

                </div>

                {/* EVENT DETAILS */}

                <div className="border-t border-gray-100 pt-7">

                  <h4 className="mb-5 text-lg font-black">
                    Event Details
                  </h4>

                  <div className="grid gap-5 sm:grid-cols-2">

                    <SelectField
                      label="Event Type"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      options={eventTypes}
                      required
                    />

                    <SelectField
                      label="Number of People"
                      name="people"
                      value={formData.people}
                      onChange={handleChange}
                      options={quantityOptions}
                      required
                    />

                    <InputField
                      label="Event Date"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                    />

                    <InputField
                      label="Preferred Time"
                      name="eventTime"
                      type="time"
                      value={formData.eventTime}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                {/* ORDER DETAILS */}

                <div className="border-t border-gray-100 pt-7">

                  <h4 className="mb-5 text-lg font-black">
                    Order Details
                  </h4>

                  <div className="space-y-5">

                    {/* PRODUCT */}

                    <div>

                      <label className="mb-2 block text-sm font-bold">
                        Product / Menu Item
                      </label>

                      <input
                        type="text"
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        placeholder="e.g. Tandoori Paneer"
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                      />

                    </div>

                    {/* QUANTITY */}

                    <div>

                      <label className="mb-2 block text-sm font-bold">
                        Approximate Quantity
                      </label>

                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="e.g. 50 pizzas"
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                      />

                    </div>

                    {/* LOCATION */}

                    <div>

                      <label className="mb-2 block text-sm font-bold">
                        Delivery Location
                      </label>

                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter delivery address / area"
                        required
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                      />

                    </div>

                    {/* MESSAGE */}

                    <div>

                      <label className="mb-2 block text-sm font-bold">
                        Additional Requirements
                      </label>

                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your requirements, preferred menu, special instructions..."
                        className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                      />

                    </div>

                  </div>

                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-4 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
                >
                  Send Bulk Order Enquiry

                  <Send className="h-5 w-5 transition group-hover:translate-x-1" />
                </button>

                <p className="text-center text-xs leading-5 text-gray-400">
                  By submitting this form, you agree to be
                  contacted by the Pizzaloot team regarding your
                  enquiry.
                </p>

              </form>

            ) : (

              /* ==================================================
                 SUCCESS
              ================================================== */

              <div className="flex min-h-[600px] flex-col items-center justify-center text-center">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">

                  <CheckCircle2 className="h-10 w-10" />

                </div>

                <h3 className="mt-7 text-3xl font-black">
                  Enquiry received!
                </h3>

                <p className="mt-4 max-w-md leading-7 text-gray-600">
                  Thank you for contacting Pizzaloot.
                  Our team will review your requirements and
                  contact you soon.
                </p>

                {formData.product && (
                  <div className="mt-6 rounded-2xl bg-orange-50 px-6 py-4">

                    <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
                      Requested Product
                    </p>

                    <p className="mt-1 font-black">
                      {formData.product}
                    </p>

                  </div>
                )}

                <button
                  onClick={() => {
                    setSubmitted(false);
                  }}
                  className="mt-8 rounded-full border border-gray-200 px-6 py-3 font-bold transition hover:bg-gray-50"
                >
                  Submit Another Enquiry
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

      {/* ==================================================
          BOTTOM CTA
      ================================================== */}

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">

        <div className="mx-auto max-w-7xl rounded-[2rem] bg-orange-500 px-6 py-12 text-center text-white sm:rounded-[3rem] sm:px-10 lg:py-16">

          <h2 className="text-3xl font-black sm:text-4xl">
            Need help planning your order?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Give us a call or message us on WhatsApp and
            we'll help you choose the right quantity and menu.
          </p>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-orange-600 transition hover:bg-orange-50"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>

        </div>

      </section>

    </main>
  );
}

/* ======================================================
   INPUT COMPONENT
====================================================== */

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  required,
  onChange,
}: InputFieldProps) {
  return (
    <div>

      <label className="mb-2 block text-sm font-bold">
        {label}

        {required && (
          <span className="ml-1 text-orange-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
      />

    </div>
  );
}

/* ======================================================
   SELECT COMPONENT
====================================================== */

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  options: string[];
  required?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

function SelectField({
  label,
  name,
  value,
  options,
  required,
  onChange,
}: SelectFieldProps) {
  return (
    <div>

      <label className="mb-2 block text-sm font-bold">
        {label}

        {required && (
          <span className="ml-1 text-orange-500">
            *
          </span>
        )}
      </label>

      <select
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
      >
        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}

/* ======================================================
   INFO ITEM
====================================================== */

function InfoItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
        {icon}
      </div>

      <div>

        <h3 className="font-black">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          {description}
        </p>

      </div>

    </div>
  );
}