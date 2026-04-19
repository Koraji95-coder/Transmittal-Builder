/**
 * UpdateModal.jsx — Blocking update-available modal.
 *
 * Shown when `check_for_update` returns `{ updateAvailable: true }`.
 * The modal covers the main app and presents two choices:
 *   • Install Now  — invokes `apply_update` and shows a brief installing
 *                    message (~2.5 s) before the app exits.
 *   • Remind Me Later — session-only dismiss (no persistence).
 *                       The modal will reappear on the next launch.
 */

import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

// ── Design tokens (match App.jsx) ────────────────────────────────────────
const T = {
  bg:     "#15110E",
  bgCard: "#241D18",
  bgIn:   "#2A2218",
  bd:     "#3A2D22",
  t1:     "#F0ECE4",
  t2:     "#A39E93",
  t3:     "#736E64",
  acc:    "#C8823A",
  fB:     "'DM Sans',system-ui,sans-serif",
  fM:     "'JetBrains Mono','SF Mono',monospace",
  r:      "6px",
  rL:     "10px",
};

/**
 * @param {object}   props
 * @param {string}   props.currentVersion   — running version, e.g. "6.0.3"
 * @param {string}   props.availableVersion — remote version, e.g. "6.0.4"
 * @param {string}   props.installerPath    — absolute path to the installer exe
 * @param {string|null} props.notes         — release notes from latest.json
 * @param {function} props.onDismiss        — called when "Remind Me Later" clicked
 */
export default function UpdateModal({
  currentVersion,
  availableVersion,
  installerPath,
  notes,
  onDismiss,
}) {
  const [installing, setInstalling] = useState(false);

  async function handleInstallNow() {
    setInstalling(true);
    // Brief visible delay so the "Installing update…" message is readable
    // before the process exits.  Without this pause the transition to the
    // NSIS installer can look like a crash.
    await new Promise((resolve) => setTimeout(resolve, 2500));
    try {
      await invoke("apply_update", { installerPath });
    } catch (e) {
      console.error("[updater] apply_update failed:", e);
      setInstalling(false);
    }
  }

  return (
    /* Full-screen backdrop */
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        fontFamily: T.fB,
      }}
    >
      {/* Card */}
      <div
        style={{
          background: T.bgCard,
          border: `1px solid ${T.bd}`,
          borderRadius: T.rL,
          padding: "32px",
          maxWidth: "440px",
          width: "calc(100% - 48px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        {installing ? (
          /* Installing state */
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: T.t1,
                marginBottom: "12px",
              }}
            >
              Installing update…
            </div>
            <div style={{ fontSize: "13px", color: T.t2, lineHeight: 1.6 }}>
              The application will close and install v{availableVersion}.
              <br />
              This takes about 30 seconds.
            </div>
          </div>
        ) : (
          /* Update available state */
          <>
            <div
              style={{
                fontSize: "17px",
                fontWeight: 700,
                color: T.t1,
                marginBottom: "8px",
              }}
            >
              Update Available
            </div>
            <div
              style={{
                fontSize: "13px",
                color: T.t2,
                marginBottom: "20px",
                lineHeight: 1.6,
              }}
            >
              A new version of Transmittal Builder is available.
            </div>

            {/* Version comparison */}
            <div
              style={{
                background: T.bgIn,
                borderRadius: T.r,
                padding: "12px 16px",
                marginBottom: "20px",
                fontSize: "13px",
                fontFamily: T.fM,
              }}
            >
              <div style={{ color: T.t3, marginBottom: "4px" }}>
                Current:&nbsp;
                <span style={{ color: T.t2 }}>v{currentVersion}</span>
              </div>
              <div style={{ color: T.t3 }}>
                Available:&nbsp;
                <span style={{ color: T.acc, fontWeight: 600 }}>
                  v{availableVersion}
                </span>
              </div>
            </div>

            {/* Release notes (optional) */}
            {notes && (
              <div
                style={{
                  fontSize: "12px",
                  color: T.t3,
                  marginBottom: "20px",
                  lineHeight: 1.6,
                  maxHeight: "80px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                {notes}
              </div>
            )}

            <div
              style={{
                fontSize: "12px",
                color: T.t3,
                marginBottom: "24px",
                lineHeight: 1.6,
              }}
            >
              The application will close and the update will install
              automatically. This takes about 30 seconds.
            </div>

            {/* Action buttons */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={onDismiss}
                style={{
                  padding: "8px 16px",
                  borderRadius: T.r,
                  border: `1px solid ${T.bd}`,
                  background: "transparent",
                  color: T.t2,
                  fontSize: "13px",
                  cursor: "pointer",
                  fontFamily: T.fB,
                }}
              >
                Remind Me Later
              </button>
              <button
                onClick={handleInstallNow}
                style={{
                  padding: "8px 20px",
                  borderRadius: T.r,
                  border: "none",
                  background: T.acc,
                  color: T.bg,
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: T.fB,
                }}
              >
                Install Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
