import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
// localhost: 3000;
//iot-dashboard-ve7n.onrender.com

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  async function handleLogin() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error);
      login({ username: data.username, role: data.role }, data.token);
      if (data.role === "admin" && !data.hasPin) {
        navigate("/setup-pin");
      } else if (data.role === "operator") {
        navigate("/");
      } else if (data.role === "admin" && data.hasPin) {
        navigate("/");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1] flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white border border-[#E4E1D8] p-8">
        <p className="text-[#D62828] text-xs font-mono mb-1">
          Restricted access
        </p>
        <h1 className="text-[#17140F] text-2xl font-bold mb-1">Sign in</h1>
        <p className="text-[#6B675E] text-sm mb-8">
          Enter your operator or admin credentials to continue.
        </p>

        {error && (
          <div className="flex items-start gap-2 border-l-2 border-[#D62828] bg-[#FDF0F0] px-3 py-2.5 mb-6">
            <p className="text-[#D62828] text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-5">
          <div>
            <label className="text-[#6B675E] text-xs mb-1.5 block">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white text-[#17140F] text-sm px-3.5 py-2.5 border border-[#E4E1D8] outline-none transition-colors focus:border-[#1B7A43]"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="text-[#6B675E] text-xs mb-1.5 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-white text-[#17140F] text-sm px-3.5 py-2.5 border border-[#E4E1D8] outline-none transition-colors focus:border-[#1B7A43]"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#1B7A43] hover:bg-[#17693A] disabled:opacity-50 text-white text-sm font-semibold py-3 mt-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17140F] focus-visible:ring-offset-2"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-[#6B675E] text-sm text-center mt-1">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#1B7A43] hover:text-[#17693A] font-medium"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
