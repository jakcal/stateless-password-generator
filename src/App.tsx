import { useState } from "react";
import { Eye, EyeOff, Copy, Key, Github, ExternalLink } from "lucide-react";
import { generatePassword } from "./pass_gen";

export default function PasswordGenerator() {
  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(16);
  const [showMasterPassword, setShowMasterPassword] = useState(false);
  const [showGeneratedPassword, setShowGeneratedPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatedPassword = generatePassword(
    host,
    username,
    masterPassword,
    passwordLength
  );

  const copyToClipboard = async () => {
    if (generatedPassword) {
      try {
        await navigator.clipboard.writeText(generatedPassword);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy password:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-950 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl mb-4 shadow-lg">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
            Password Generator
          </h1>
          <p className="text-gray-400 text-lg">
            Generate secure, deterministic passwords with style
          </p>

          {/* GitHub Button */}
          <div className="mt-6">
            <a
              href="https://github.com/jakcal/stateless-password-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 border border-slate-500 rounded-xl text-white font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <Github className="w-5 h-5" />
              View Source Code
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Form */}
          <div className="bg-gradient-to-br from-slate-800/50 to-gray-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Configuration
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="host"
                  className="block text-sm font-medium text-gray-300 mb-3"
                >
                  Host/Website
                </label>
                <input
                  id="host"
                  type="text"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  placeholder="example.com"
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-gray-400 hover:bg-slate-800/80"
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300 mb-3"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-gray-400 hover:bg-slate-800/80"
                />
              </div>

              <div>
                <label
                  htmlFor="masterPassword"
                  className="block text-sm font-medium text-gray-300 mb-3"
                >
                  Master Password
                </label>
                <div className="relative">
                  <input
                    id="masterPassword"
                    type={showMasterPassword ? "text" : "password"}
                    value={masterPassword}
                    onChange={(e) => setMasterPassword(e.target.value)}
                    placeholder="Your secure master password"
                    className="w-full px-4 py-3 pr-12 bg-slate-800/60 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-gray-400 hover:bg-slate-800/80"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMasterPassword(!showMasterPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors p-1 rounded-lg hover:bg-slate-700"
                  >
                    {showMasterPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="passwordLength"
                  className="block text-sm font-medium text-gray-300 mb-3"
                >
                  Password Length:{" "}
                  <span className="text-blue-400 font-semibold">
                    {passwordLength}
                  </span>
                </label>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500 font-mono">8</span>
                  <div className="flex-1 relative">
                    <input
                      id="passwordLength"
                      type="range"
                      min="8"
                      max="64"
                      value={passwordLength}
                      onChange={(e) =>
                        setPasswordLength(parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #06b6d4 ${
                          ((passwordLength - 8) / 56) * 100
                        }%, #475569 ${
                          ((passwordLength - 8) / 56) * 100
                        }%, #475569 100%)`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 font-mono">64</span>
                  <input
                    type="number"
                    min="8"
                    max="64"
                    value={passwordLength}
                    onChange={(e) =>
                      setPasswordLength(
                        Math.max(8, Math.min(64, parseInt(e.target.value) || 8))
                      )
                    }
                    className="w-16 px-2 py-1 text-sm bg-slate-800/60 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Generated Password & Info */}
          <div className="space-y-8">
            {/* Generated Password */}
            {generatedPassword && (
              <div className="bg-gradient-to-br from-slate-800/50 to-gray-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Generated Password
                </h2>
                <div className="relative">
                  <div className="bg-gradient-to-r from-slate-900/60 to-slate-800/60 border border-slate-600 rounded-xl p-4">
                    <input
                      type={showGeneratedPassword ? "text" : "password"}
                      value={generatedPassword}
                      readOnly
                      className="w-full bg-transparent text-white font-mono text-lg outline-none select-all"
                    />
                  </div>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setShowGeneratedPassword(!showGeneratedPassword)
                      }
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-700/50"
                    >
                      {showGeneratedPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="p-2 text-gray-400 hover:text-green-400 transition-colors rounded-lg hover:bg-slate-700/50"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {copied && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                    <p className="text-sm text-green-400 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Password copied to clipboard!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Info Card */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border border-blue-700/30 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                How it works
              </h3>
              <div className="space-y-3 text-blue-100/80">
                <p className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>
                    Generates the same password every time with identical inputs
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>All calculations happen locally in your browser</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>
                    No data ever leaves your device - completely private
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Cryptographically secure and deterministic</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800/50 to-gray-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl">
            <span className="text-gray-400 text-sm">Created by</span>
            <a
              href="https://jakcal.github.io?utm_source=stateless-password-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors hover:underline"
            >
              Yassine Chandid
            </a>
            <ExternalLink className="w-3 h-3 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
