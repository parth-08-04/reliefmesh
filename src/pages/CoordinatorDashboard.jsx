
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  LogOut,
  RefreshCw,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  LoaderCircle,
  ClipboardList,
} from "lucide-react";
import { supabase } from "../supabase";

const statuses = ["Pending", "Verified", "Rejected", "Resolved"];

const statusStyles = {
  Pending: "bg-amber-100 text-amber-800",
  Verified: "bg-blue-100 text-blue-800",
  Rejected: "bg-red-100 text-red-800",
  Resolved: "bg-green-100 text-green-800",
};

export default function CoordinatorDashboard({ onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadReports() {
    setError("");

    const { data: roleData, error: roleError } =
      await supabase.rpc("is_coordinator");

    if (roleError) {
      setError(roleError.message);
      return;
    }

    if (!roleData) {
      setIsCoordinator(false);
      setReports([]);
      return;
    }

    setIsCoordinator(true);

    const { data, error: reportError } = await supabase
      .from("emergency_reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (reportError) {
      setError(reportError.message);
      return;
    }

    setReports(data || []);
  }

  useEffect(() => {
    let active = true;

    async function initialize() {
      setLoading(true);

      const { data, error: sessionError } =
        await supabase.auth.getSession();

      if (!active) return;

      if (sessionError) {
        setError(sessionError.message);
        setLoading(false);
        return;
      }

      const currentUser = data.session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        await loadReports();
      }

      if (active) setLoading(false);
    }

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setIsCoordinator(false);
      setReports([]);
      setError("");
      setMessage("");
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      let active = true;

      async function refresh() {
        setLoading(true);
        await loadReports();
        if (active) setLoading(false);
      }

      refresh();

      return () => {
        active = false;
      };
    }
  }, [user]);

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    setPassword("");
    setMessage("Login successful. Loading your dashboard...");
    setLoading(false);
  }

  async function handleLogout() {
    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      setError(logoutError.message);
      return;
    }

    setUser(null);
    setIsCoordinator(false);
    setReports([]);
    setMessage("You have been logged out.");
  }

  async function updateStatus(reportId, newStatus) {
    setUpdatingId(reportId);
    setError("");
    setMessage("");

    const { error: updateError } = await supabase
      .from("emergency_reports")
      .update({ status: newStatus })
      .eq("id", reportId);

    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage(`Report status changed to ${newStatus}.`);
      await loadReports();
    }

    setUpdatingId(null);
  }

  const visibleReports =
    filter === "All"
      ? reports
      : reports.filter((report) => report.status === filter);

  const countByStatus = (status) =>
    reports.filter((report) => report.status === status).length;

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <LoaderCircle className="animate-spin" size={32} />
        <span className="ml-3">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
          <button
            onClick={onBack}
            className="mb-6 text-sm text-slate-400 hover:text-white"
          >
            ← Back to homepage
          </button>

          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">
            <ShieldCheck size={30} />
          </div>

          <h1 className="text-3xl font-bold">Coordinator Login</h1>
          <p className="mt-2 text-slate-400">
            Sign in to manage emergency reports.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="coordinator@example.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-950 p-3 text-sm text-red-300">
                {error}
              </p>
            )}

            {message && (
              <p className="rounded-lg bg-green-950 p-3 text-sm text-green-300">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Restricted access for authorised coordinators only.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <LoaderCircle className="animate-spin" size={32} />
        <span className="ml-3">Loading emergency reports...</span>
      </div>
    );
  }

  if (!isCoordinator) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-8 text-center">
          <ShieldCheck size={42} className="mx-auto text-amber-400" />
          <h1 className="mt-4 text-2xl font-bold">Access Denied</h1>
          <p className="mt-3 text-slate-400">
            This account does not have Coordinator permissions.
          </p>
          <button
            onClick={handleLogout}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900 px-5 py-4 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-600 p-2">
              <ShieldCheck size={25} />
            </div>
            <div>
              <h1 className="text-xl font-bold">RELIEFMESH</h1>
              <p className="text-xs text-slate-400">Coordinator Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-400 sm:block">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 md:px-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Emergency Overview</h2>
            <p className="mt-2 text-slate-400">
              Review and manage citizen emergency reports.
            </p>
          </div>

          <button
            onClick={async () => {
              setLoading(true);
              await loadReports();
              setLoading(false);
            }}
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-800 bg-red-950 p-4 text-red-200">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-5 rounded-lg border border-green-800 bg-green-950 p-4 text-green-200">
            {message}
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Reports" value={reports.length} icon={<ClipboardList />} />
          <StatCard title="Pending" value={countByStatus("Pending")} icon={<Clock />} />
          <StatCard title="Verified" value={countByStatus("Verified")} icon={<CheckCircle2 />} />
          <StatCard title="Resolved" value={countByStatus("Resolved")} icon={<ShieldCheck />} />
        </div>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 md:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-xl font-bold">Emergency Reports</h3>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white"
            >
              <option value="All">All Reports</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {visibleReports.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <ClipboardList size={40} className="mx-auto mb-3 opacity-50" />
              No emergency reports found.
            </div>
          ) : (
            <div className="space-y-4">
              {visibleReports.map((report) => (
                <article
                  key={report.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold">{report.name}</h4>
                      <p className="mt-1 text-sm text-slate-400">
                        {report.phone}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[report.status] || "bg-slate-700 text-white"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                    <p>
                      <AlertTriangle size={15} className="mr-2 inline text-amber-400" />
                      <strong>Disaster:</strong> {report.disaster}
                    </p>
                    <p>
                      <MapPin size={15} className="mr-2 inline text-blue-400" />
                      <strong>Location:</strong> {report.location}
                    </p>
                    <p>
                      <strong>Urgency:</strong> {report.urgency}
                    </p>
                    <p>
                      <strong>Submitted:</strong>{" "}
                      {new Date(report.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-semibold text-slate-300">
                      Description
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-slate-400">
                      {report.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-semibold text-slate-300">
                      Assistance Required
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(report.assistance || []).map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-800 pt-4">
                    <label className="text-sm text-slate-400">
                      Update status:
                    </label>

                    <select
                      value={report.status}
                      disabled={updatingId === report.id}
                      onChange={(e) =>
                        updateStatus(report.id, e.target.value)
                      }
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white disabled:opacity-50"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    {updatingId === report.id && (
                      <LoaderCircle size={17} className="animate-spin" />
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <p className="mt-6 text-center text-xs text-slate-500">
          RELIEFMESH • Emergency coordination prototype
        </p>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-3 flex items-center justify-between text-slate-400">
        <span className="text-sm">{title}</span>
        {icon}
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
