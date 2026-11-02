
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Siren,
  Send,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

import { supabase } from "../supabase";

function EmergencyReport({ onBack }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    disaster: "",
    location: "",
    description: "",
    urgency: "High",
  });

  const [assistance, setAssistance] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const assistanceOptions = [
    "Food and Water",
    "Medical Help",
    "Rescue Assistance",
    "Temporary Shelter",
    "Clothing",
    "Other",
  ];

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleAssistance(option) {
    setAssistance((previous) =>
      previous.includes(option)
        ? previous.filter((item) => item !== option)
        : [...previous, option]
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (assistance.length === 0) {
      setError("Please select at least one assistance requirement.");
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from("emergency_reports")
        .insert([
          {
            name: form.name.trim(),
            phone: form.phone.trim(),
            disaster: form.disaster,
            location: form.location.trim(),
            description: form.description.trim(),
            assistance: assistance,
            urgency: form.urgency,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      setSubmitted(true);

    } catch (err) {
      console.error("Emergency report error:", err);

      setError(
        err.message || "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  // SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-8 text-center">

          <CheckCircle2
            className="mx-auto mb-5 text-green-400"
            size={65}
          />

          <h1 className="text-3xl font-bold">
            Report Submitted!
          </h1>

          <p className="mt-4 leading-7 text-slate-400">
            Your emergency report has been successfully saved.
            The information is now stored in the RELIEFMESH database.
          </p>

          <div className="mt-6 rounded-lg bg-slate-800 p-4 text-left">
            <p className="text-sm text-slate-400">
              Disaster Type
            </p>
            <p className="mt-1 font-semibold">
              {form.disaster}
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Reported Location
            </p>
            <p className="mt-1 font-semibold">
              {form.location}
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Current Status
            </p>
            <p className="mt-1 font-semibold text-yellow-400">
              Pending Review
            </p>
          </div>

          <button
            onClick={onBack}
            className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
          >
            Back to Homepage
          </button>

          <p className="mt-5 text-xs text-slate-500">
            RELIEFMESH Hackathon Prototype
          </p>

        </div>
      </div>
    );
  }

  // EMERGENCY REPORT FORM
  return (
    <div className="min-h-screen bg-slate-950 px-5 py-10 text-white">

      <div className="mx-auto max-w-3xl">

        <button
          onClick={onBack}
          disabled={loading}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Homepage
        </button>

        {/* PAGE HEADER */}
        <div className="mb-8">

          <div className="mb-4 inline-flex rounded-xl bg-red-500/10 p-3 text-red-400">
            <Siren size={30} />
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            Emergency Report
          </h1>

          <p className="mt-3 leading-7 text-slate-400">
            Provide accurate information about the emergency
            so response teams can review your situation.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-2xl border border-white/10 bg-slate-900 p-6 md:p-9"
        >

          {/* PERSONAL INFORMATION */}
          <div>

            <h2 className="mb-5 text-xl font-bold">
              Personal Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                  className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Contact Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  pattern="[0-9+() -]{7,20}"
                  required
                  disabled={loading}
                  className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>

          </div>

          <div className="border-t border-white/10" />

          {/* DISASTER INFORMATION */}
          <div>

            <h2 className="mb-5 text-xl font-bold">
              Disaster Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Disaster Type *
                </label>

                <select
                  name="disaster"
                  value={form.disaster}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select disaster type</option>
                  <option value="Flood">Flood</option>
                  <option value="Earthquake">Earthquake</option>
                  <option value="Cyclone">Cyclone</option>
                  <option value="Fire">Fire</option>
                  <option value="Landslide">Landslide</option>
                  <option value="Extreme Heat">Extreme Heat</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                  <MapPin size={16} />
                  Emergency Location *
                </label>

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter area, city, district or landmark"
                  required
                  disabled={loading}
                  className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm text-slate-300">
                  Describe the Situation *
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Explain what happened and how many people may need help..."
                  rows={5}
                  required
                  disabled={loading}
                  className="w-full resize-y rounded-lg border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>

            </div>

          </div>

          <div className="border-t border-white/10" />

          {/* ASSISTANCE REQUIRED */}
          <div>

            <h2 className="mb-2 text-xl font-bold">
              Assistance Required
            </h2>

            <p className="mb-5 text-sm text-slate-400">
              Select all types of assistance you need.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">

              {assistanceOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-slate-950 p-4 hover:border-blue-500"
                >

                  <input
                    type="checkbox"
                    checked={assistance.includes(option)}
                    onChange={() => handleAssistance(option)}
                    disabled={loading}
                    className="h-4 w-4 accent-blue-500"
                  />

                  <span className="text-sm">
                    {option}
                  </span>

                </label>
              ))}

            </div>

          </div>

          <div className="border-t border-white/10" />

          {/* URGENCY */}
          <div>

            <h2 className="mb-4 text-xl font-bold">
              Emergency Urgency
            </h2>

            <select
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="Critical">
                Critical - Immediate danger
              </option>

              <option value="High">
                High - Urgent assistance needed
              </option>

              <option value="Medium">
                Medium - Assistance required
              </option>

              <option value="Low">
                Low - Non-urgent assistance
              </option>
            </select>

          </div>

          {/* SAFETY NOTICE */}
          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">

            <div className="flex items-start gap-3">

              <ShieldAlert
                className="mt-1 shrink-0 text-yellow-400"
                size={20}
              />

              <p className="text-sm leading-6 text-slate-400">
                Please provide accurate information. Submitting
                this prototype report does not contact emergency
                services or dispatch rescue teams. For immediate
                danger, contact local emergency services.
              </p>

            </div>

          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-4 font-semibold hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >

            <Send size={19} />

            {loading ? "Submitting..." : "Submit Emergency Report"}

          </button>

        </form>

      </div>

    </div>
  );
}

export default EmergencyReport;
