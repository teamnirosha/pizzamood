"use client";
import type { FormEvent } from "react";
import { useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    Mail,
    MapPin,
    Phone,
    Store,
} from "lucide-react";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        const form = e.currentTarget;

        const formData = new FormData(form);

        const data = {
            name: formData.get("name")?.toString().trim(),
            phone: formData.get("phone")?.toString().trim(),
            city: formData.get("city")?.toString().trim(),
            shopType: formData.get("shopType")?.toString(),
            message: formData.get("message")?.toString().trim(),
        };

        try {
            const response = await fetch("/api/enquiries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result?.message || "Failed to submit enquiry."
                );
            }

            setSubmitted(true);
            form.reset();
        } catch (error) {
            console.error(error);
            alert("Failed to submit enquiry. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleNewEnquiry = () => {
        setSubmitted(false);
    };

    return (
        <main className="min-h-screen bg-[#fffaf5] text-slate-900">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
                <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-yellow-200/40 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
                    <div className="max-w-3xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">
                            <Store className="h-4 w-4" />
                            PizzaLoot Partnership
                        </div>

                        <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                            Let&apos;s Grow Your{" "}
                            <span className="text-orange-500">
                                Pizza Business
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                            Have a shop or planning to start one? Tell us about
                            your business and our team will get in touch to
                            discuss the PizzaLoot partnership opportunity.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact + Form */}
            <section
                id="enquiry"
                className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-12 lg:pb-28"
            >
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                    {/* Contact Info */}
                    <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl sm:p-10">
                        <div className="max-w-md">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
                                Get In Touch
                            </p>

                            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                                Let&apos;s talk about your shop.
                            </h2>

                            <p className="mt-5 leading-7 text-slate-300">
                                Whether you already run a food shop or are
                                planning a new outlet, we&apos;d love to
                                understand your plans and explain how the
                                PizzaLoot partnership works.
                            </p>

                            <div className="mt-10 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500">
                                        <Phone className="h-5 w-5 text-white" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-400">
                                            Phone
                                        </p>
                                        <p className="mt-1 font-semibold text-white">
                                            +91 98765 43210
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500">
                                        <Mail className="h-5 w-5 text-white" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-400">
                                            Email
                                        </p>
                                        <p className="mt-1 font-semibold text-white">
                                            hello@pizzaloot.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500">
                                        <MapPin className="h-5 w-5 text-white" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-400">
                                            Location
                                        </p>
                                        <p className="mt-1 font-semibold text-white">
                                            Maharashtra, India
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
                                <p className="text-sm font-semibold text-orange-400">
                                    Who can partner?
                                </p>

                                <p className="mt-2 text-sm leading-6 text-slate-300">
                                    Existing shopkeepers, food entrepreneurs,
                                    and new business owners looking to build a
                                    pizza-focused outlet with the PizzaLoot
                                    brand.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Enquiry Form */}
                    <div className="rounded-[2rem] border border-orange-100 bg-white p-8 shadow-xl sm:p-10">
                        {!submitted ? (
                            <>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
                                        Enquiry Form
                                    </p>

                                    <h2 className="mt-3 text-3xl font-black text-slate-900">
                                        Become a PizzaLoot Partner
                                    </h2>

                                    <p className="mt-3 text-slate-600">
                                        Fill in your details and tell us a
                                        little about your business.
                                    </p>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-8 space-y-5"
                                >
                                    {/* Name */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-bold text-slate-700"
                                        >
                                            Full Name
                                        </label>

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            placeholder="Enter your name"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="mb-2 block text-sm font-bold text-slate-700"
                                        >
                                            Phone Number
                                        </label>

                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            placeholder="Enter your phone number"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                                        />
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label
                                            htmlFor="city"
                                            className="mb-2 block text-sm font-bold text-slate-700"
                                        >
                                            City
                                        </label>

                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            required
                                            placeholder="Enter your city"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                                        />
                                    </div>

                                    {/* Shop Type */}
                                    <div>
                                        <label
                                            htmlFor="shopType"
                                            className="mb-2 block text-sm font-bold text-slate-700"
                                        >
                                            Business Type
                                        </label>

                                        <select
                                            id="shopType"
                                            name="shopType"
                                            required
                                            defaultValue=""
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                                        >
                                            <option value="" disabled>
                                                Select your business type
                                            </option>
                                            <option value="existing">
                                                I already have a shop
                                            </option>
                                            <option value="new">
                                                I want to start a new shop
                                            </option>
                                            <option value="food-business">
                                                I already run a food business
                                            </option>
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="mb-2 block text-sm font-bold text-slate-700"
                                        >
                                            Message
                                        </label>

                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            placeholder="Tell us about your shop, location, plans, or any questions..."
                                            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-4 text-sm font-bold text-white transition hover:bg-orange-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {loading
                                            ? "Sending..."
                                            : "Send Enquiry"}

                                        {!loading && (
                                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        )}
                                    </button>

                                    <p className="text-center text-xs leading-5 text-slate-400">
                                        By submitting this form, you&apos;re
                                        expressing interest in a PizzaLoot
                                        partnership. Our team will contact you
                                        to discuss the next steps.
                                    </p>
                                </form>
                            </>
                        ) : (
                            /* Success State */
                            <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                                </div>

                                <h2 className="mt-7 text-3xl font-black text-slate-900">
                                    Enquiry received!
                                </h2>

                                <p className="mt-4 max-w-md leading-7 text-slate-600">
                                    Thank you for your interest in PizzaLoot.
                                    Your enquiry has been submitted
                                    successfully. Our team will get in touch
                                    with you soon.
                                </p>

                                <button
                                    type="button"
                                    onClick={handleNewEnquiry}
                                    className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
                                >
                                    Send Another Enquiry

                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="border-t border-orange-100 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
                    <div className="rounded-[2rem] bg-orange-500 px-8 py-12 text-center sm:px-12">
                        <h2 className="text-3xl font-black text-white sm:text-4xl">
                            Ready to build with PizzaLoot?
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-orange-50">
                            Start a conversation with our team and explore how
                            the PizzaLoot partnership can fit your business.
                        </p>

                        <a
                            href="#enquiry"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-orange-600 transition hover:bg-orange-50"
                        >
                            Become a Partner

                            <ArrowRight className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}