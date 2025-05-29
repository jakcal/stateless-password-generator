import { useState } from "react";
import { Eye, EyeOff, Copy, Key } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Key className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Password Generator
            </h1>
            <p className="text-gray-600">
              Generate secure, deterministic passwords
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="host"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Host/Website
              </label>
              <input
                id="host"
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder="example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="masterPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowMasterPassword(!showMasterPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password Length: {passwordLength}
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">8</span>
                <input
                  id="passwordLength"
                  type="range"
                  min="8"
                  max="64"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-sm text-gray-500">64</span>
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
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            {generatedPassword && (
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generated Password
                </label>
                <div className="relative">
                  <input
                    type={showGeneratedPassword ? "text" : "password"}
                    value={generatedPassword}
                    readOnly
                    className="w-full px-4 py-3 pr-20 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setShowGeneratedPassword(!showGeneratedPassword)
                      }
                      className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded"
                    >
                      {showGeneratedPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {copied && (
                  <p className="text-sm text-green-600 mt-2">
                    Password copied to clipboard!
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              How it works
            </h3>
            <p className="text-sm text-blue-700">
              This generator creates the same password every time you enter the
              same host, username, and master password. Your inputs never leave
              your browser - everything is calculated locally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
//ofc generated by claude, soo do whatver you want with it