
import {
  ShieldCheck,
  MapPin,
  Users,
  Package,
  Activity,
  ArrowRight,
  Menu,
  X,
  Radio,
  HeartHandshake,
  Truck,
  Siren,
  CheckCircle2,
} from "lucide-react";

import { useState } from "react";
import EmergencyReport from "./pages/EmergencyReport";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showCoordinator, setShowCoordinator] = useState(false);

  // Open Coordinator Dashboard
  if (showCoordinator) {
    return (
      <CoordinatorDashboard
        onBack={() => setShowCoordinator(false)}
      />
    );
  }

  // Open Emergency Report Page
  if (showReport) {
    return (
      <EmergencyReport
        onBack={() => setShowReport(false)}
      />
    );
  }

  const roles = [
    {
      icon: Users,
      title: "Citizen",
      description:
        "Report emergencies and request food, shelter, medical or other assistance.",
    },
    {
      icon: HeartHandshake,
      title: "Volunteer",
      description:
        "Register your skills, receive assignments and help affected communities.",
    },
    {
      icon: Package,
      title: "NGO",
      description:
        "Manage resources, coordinate supplies and track distributions.",
    },
    {
      icon: ShieldCheck,
      title: "Coordinator",
      description:
        "Verify reports, manage emergency operations and monitor response activities.",
    },
  ];

  const features = [
    {
      icon: Radio,
      title: "Emergency Reporting",
      description:
        "Submit disaster reports with location, assistance requirements and supporting information.",
    },
    {
      icon: Activity,
      title: "AI-Assisted Verification",
      description:
        "Help coordinators classify reports, identify possible duplicates and summarize information.",
    },
    {
      icon: MapPin,
      title: "Live Disaster Map",
      description:
        "Visualize reported incidents, affected areas and available response resources.",
    },
    {
      icon: Package,
      title: "Resource Coordination",
      description:
        "Connect available food, water, medicines and shelter resources with reported needs.",
    },
    {
      icon: Users,
      title: "Volunteer Management",
      description:
        "Coordinate volunteers based on their skills, availability and service locations.",
    },
    {
      icon: Truck,
      title: "Delivery Tracking",
      description:
        "Monitor resource assignments and update delivery progress.",
    },
  ];

  const steps = [
    "Report an emergency",
    "Review and verify reports",
    "Match resources and volunteers",
    "Track response and delivery",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <a href="#home" className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2">
              <ShieldCheck size={25} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">
                RELIEFMESH
              </h1>
              <p className="text-xs text-slate-400">
                Disaster Response Platform
              </p>
            </div>
          </a>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-6 lg:flex">
            <a href="#home" className="text-sm text-slate-300 hover:text-white">
              Home
            </a>
            <a href="#features" className="text-sm text-slate-300 hover:text-white">
              Features
            </a>
            <a href="#roles" className="text-sm text-slate-300 hover:text-white">
              User Roles
            </a>
            <a href="#how-it-works" className="text-sm text-slate-300 hover:text-white">
              How It Works
            </a>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => setShowCoordinator(true)}
              className="rounded-lg border border-blue-500 px-4 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-600 hover:text-white"
            >
              Coordinator Login
            </button>

            <a
              href="#report"
              className="rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold hover:bg-red-700"
            >
              <span className="inline-flex items-center gap-2">
                <Siren size={17} />
                Report Emergency
              </span>
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {menuOpen && (
          <div className="space-y-4 border-t border-white/10 px-6 py-5 md:hidden">

            <a
              onClick={() => setMenuOpen(false)}
              href="#home"
              className="block"
            >
              Home
            </a>

            <a
              onClick={() => setMenuOpen(false)}
              href="#features"
              className="block"
            >
              Features
            </a>

            <a
              onClick={() => setMenuOpen(false)}
              href="#roles"
              className="block"
            >
              User Roles
            </a>

            <a
              onClick={() => setMenuOpen(false)}
              href="#how-it-works"
              className="block"
            >
              How It Works
            </a>

            <button
              onClick={() => {
                setMenuOpen(false);
                setShowCoordinator(true);
              }}
              className="block w-full rounded-lg border border-blue-500 px-4 py-3 text-left font-semibold text-blue-300"
            >
              Coordinator Login
            </button>

            <a
              onClick={() => setMenuOpen(false)}
              href="#report"
              className="block font-semibold text-red-400"
            >
              Report Emergency
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:py-32">

          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Technology for a safer tomorrow
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Faster Response.
              <span className="block text-blue-400">
                Stronger Communities.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              RELIEFMESH brings citizens, volunteers, NGOs and emergency
              coordinators together through AI-assisted disaster reporting,
              resource coordination and response tracking.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#report"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-4 font-semibold hover:bg-red-700"
              >
                Report Emergency
                <ArrowRight size={18} />
              </a>

              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-4 font-semibold hover:bg-white/10"
              >
                Explore Platform
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-400" />
                AI-assisted analysis
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-400" />
                Resource coordination
              </span>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-blue-950/40">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-slate-400">PLATFORM OVERVIEW</p>
                <h2 className="mt-1 text-xl font-bold">Response Network</h2>
              </div>

              <div className="rounded-lg bg-green-500/10 px-3 py-2 text-xs text-green-400">
                System Ready
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-800 p-5">
                <MapPin className="mb-4 text-blue-400" size={27} />
                <p className="text-2xl font-bold">Reports</p>
                <p className="mt-1 text-sm text-slate-400">Incident management</p>
              </div>

              <div className="rounded-xl bg-slate-800 p-5">
                <Users className="mb-4 text-green-400" size={27} />
                <p className="text-2xl font-bold">Volunteers</p>
                <p className="mt-1 text-sm text-slate-400">People coordination</p>
              </div>

              <div className="rounded-xl bg-slate-800 p-5">
                <Package className="mb-4 text-orange-400" size={27} />
                <p className="text-2xl font-bold">Resources</p>
                <p className="mt-1 text-sm text-slate-400">Supply management</p>
              </div>

              <div className="rounded-xl bg-slate-800 p-5">
                <Activity className="mb-4 text-purple-400" size={27} />
                <p className="text-2xl font-bold">Tracking</p>
                <p className="mt-1 text-sm text-slate-400">Response progress</p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-blue-400/20 bg-blue-500/10 p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-blue-400" size={25} />
                <div>
                  <p className="font-semibold">One Connected Network</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Bringing response teams together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USER ROLES */}
      <section id="roles" className="bg-slate-900/70 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="font-semibold uppercase tracking-widest text-blue-400">
              Who Can Use RELIEFMESH?
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              One Platform. Four Key Roles.
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Every participant has a role in building a faster and more
              coordinated disaster response network.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((role) => {
              const Icon = role.icon;

              return (
                <div
                  key={role.title}
                  className="rounded-2xl border border-white/10 bg-slate-950 p-7 transition hover:-translate-y-1 hover:border-blue-400/50"
                >
                  <div className="mb-6 inline-flex rounded-xl bg-blue-500/10 p-4 text-blue-400">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-xl font-bold">{role.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="font-semibold uppercase tracking-widest text-blue-400">
              Our Capabilities
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Everything Connected in One Place
            </h2>

            <p className="mt-4 text-slate-400">
              Tools designed to improve disaster response coordination.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-7 transition hover:border-blue-400/50"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-400">
                    <Icon size={27} />
                  </div>

                  <h3 className="text-lg font-bold">{feature.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-slate-900/70 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="font-semibold uppercase tracking-widest text-blue-400">
              Simple Workflow
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              How RELIEFMESH Works
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-xl border border-white/10 bg-slate-950 p-6 text-center"
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold">
                  {index + 1}
                </div>

                <p className="font-semibold leading-6">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REPORT CTA */}
      <section id="report" className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-3xl border border-red-400/20 bg-gradient-to-r from-red-950/60 to-slate-900 p-10 text-center md:p-16">
          <Siren className="mx-auto mb-6 text-red-400" size={45} />

          <h2 className="text-3xl font-bold md:text-4xl">
            Every Second Matters.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
            A connected response network can help communities communicate
            their needs and coordinate assistance more effectively.
          </p>

          <button
            onClick={() => setShowReport(true)}
            className="mt-8 rounded-lg bg-red-600 px-7 py-4 font-semibold hover:bg-red-700"
          >
            Report an Emergency
          </button>

          <p className="mt-5 text-xs text-slate-500">
            Prototype demonstration only. For immediate emergencies, contact
            your local emergency services.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-slate-950 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
          <div>
            <h2 className="text-xl font-bold">RELIEFMESH</h2>

            <p className="mt-1 text-sm text-slate-500">
              Connecting people. Coordinating relief.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 RELIEFMESH. Hackathon Prototype.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
