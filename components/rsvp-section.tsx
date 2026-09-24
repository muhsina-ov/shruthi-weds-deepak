"use client";

import { useId, useMemo, useState } from "react";

type AttendanceOption = "both" | "morning" | "evening" | "decline";

const PHONE_NUMBER_DISPLAY = "+1 (419) 576-8631";
const PHONE_NUMBER_RAW = "14195768631"; // Clean international number for WhatsApp and SMS

export function RsvpSection() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceOption>("both");
  const [guestsCount, setGuestsCount] = useState("2");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState("");

  const nameInputId = useId();
  const guestsSelectId = useId();
  const noteInputId = useId();

  const attendanceLabel = useMemo(() => {
    switch (attendance) {
      case "both":
        return "Both Celebrations (Morning Muhurtham & Evening Reception)";
      case "morning":
        return "Only Morning (Muhurtham Ceremony · 8:30 AM)";
      case "evening":
        return "Only Evening (Reception & Party · 7:00 PM)";
      case "decline":
        return "Regretfully Unable to Attend";
    }
  }, [attendance]);

  const prefilledMessage = useMemo(() => {
    const trimmedName = name.trim() || "[Guest Name]";
    if (attendance === "decline") {
      const parts = [
        `✨ Wedding RSVP for Shruthi & Deepak ✨`,
        ``,
        `Guest: ${trimmedName}`,
        `Response: Regretfully cannot attend, but sending our warmest blessings and love!`,
      ];
      if (note.trim()) {
        parts.push(`Note: ${note.trim()}`);
      }
      return parts.join("\n");
    }

    const parts = [
      `✨ Wedding RSVP for Shruthi & Deepak ✨`,
      ``,
      `Guest Name: ${trimmedName}`,
      `Attending: ${attendanceLabel}`,
      `Number of Guests: ${guestsCount}`,
    ];

    if (note.trim()) {
      parts.push(`Wishes / Note: ${note.trim()}`);
    }

    parts.push(``, `Looking forward to celebrating together!`);
    return parts.join("\n");
  }, [name, attendance, attendanceLabel, guestsCount, note]);

  const whatsappUrl = useMemo(() => {
    return `https://wa.me/${PHONE_NUMBER_RAW}?text=${encodeURIComponent(prefilledMessage)}`;
  }, [prefilledMessage]);

  const smsUrl = useMemo(() => {
    return `sms:+${PHONE_NUMBER_RAW}?&body=${encodeURIComponent(prefilledMessage)}`;
  }, [prefilledMessage]);

  function handleSend(type: "whatsapp" | "sms") {
    if (!name.trim()) {
      setValidationError("Please enter your name before sending your RSVP.");
      const el = document.getElementById(nameInputId);
      if (el) el.focus();
      return;
    }
    setValidationError("");
    if (type === "whatsapp") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = smsUrl;
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(prefilledMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <section id="rsvp" className="rsvp-section" aria-labelledby="rsvp-heading">
      <div className="rsvp-container">
        <div className="rsvp-card">
          <div className="rsvp-ornament-top" aria-hidden="true">
            <span className="rsvp-tamil-tag" lang="ta">ஒலி × ஒளி</span>
            <span className="rsvp-flourish">✦</span>
          </div>

          <div className="rsvp-header">
            <p className="section-kicker">RSVP · Kindly Reply</p>
            <h2 id="rsvp-heading">
              Will you celebrate<br />
              <em>with us?</em>
            </h2>
            <p className="rsvp-intro">
              Please choose your celebration plans below. Your confirmation will be prefilled and sent directly to{" "}
              <strong className="rsvp-phone-highlight">{PHONE_NUMBER_DISPLAY}</strong>.
            </p>
          </div>

          <form
            className="rsvp-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend("whatsapp");
            }}
          >
            {/* Attendance Options */}
            <div className="rsvp-group">
              <label className="rsvp-group-label">Select Your Attendance</label>
              <div className="rsvp-options-grid" role="radiogroup" aria-label="Attendance options">
                <button
                  type="button"
                  role="radio"
                  aria-checked={attendance === "both"}
                  className={`rsvp-choice-card ${attendance === "both" ? "is-selected" : ""}`}
                  onClick={() => setAttendance("both")}
                >
                  <div className="choice-indicator" aria-hidden="true">
                    {attendance === "both" && <span className="choice-check">✓</span>}
                  </div>
                  <div className="choice-details">
                    <span className="choice-badge">Recommended</span>
                    <strong className="choice-title">Both Celebrations</strong>
                    <span className="choice-description">
                      Morning Muhurtham (8:30 AM) &amp; Evening Party (7:00 PM)
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={attendance === "morning"}
                  className={`rsvp-choice-card ${attendance === "morning" ? "is-selected" : ""}`}
                  onClick={() => setAttendance("morning")}
                >
                  <div className="choice-indicator" aria-hidden="true">
                    {attendance === "morning" && <span className="choice-check">✓</span>}
                  </div>
                  <div className="choice-details">
                    <strong className="choice-title">Only Morning</strong>
                    <span className="choice-description">
                      Muhurtham Ceremony · Sri Venkateswara Temple, Bridgewater (8:30 AM – 1:00 PM)
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={attendance === "evening"}
                  className={`rsvp-choice-card ${attendance === "evening" ? "is-selected" : ""}`}
                  onClick={() => setAttendance("evening")}
                >
                  <div className="choice-indicator" aria-hidden="true">
                    {attendance === "evening" && <span className="choice-check">✓</span>}
                  </div>
                  <div className="choice-details">
                    <strong className="choice-title">Only Evening</strong>
                    <span className="choice-description">
                      Black Tie Celebration · The Meadow Wood, Randolph (7:00 PM – Midnight)
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={attendance === "decline"}
                  className={`rsvp-choice-card choice-decline ${attendance === "decline" ? "is-selected" : ""}`}
                  onClick={() => setAttendance("decline")}
                >
                  <div className="choice-indicator" aria-hidden="true">
                    {attendance === "decline" && <span className="choice-check">✓</span>}
                  </div>
                  <div className="choice-details">
                    <strong className="choice-title">Regretfully Cannot Attend</strong>
                    <span className="choice-description">
                      Will be there in heart &amp; sending warm blessings from afar
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Guest Name & Party Size */}
            <div className="rsvp-fields-row">
              <div className="rsvp-field rsvp-field-grow">
                <label htmlFor={nameInputId} className="rsvp-field-label">
                  Your Full Name(s) <span className="required-mark">*</span>
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  required
                  placeholder="e.g. Priya &amp; Karthik"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (validationError) setValidationError("");
                  }}
                  className={`rsvp-input ${validationError ? "input-error" : ""}`}
                />
                {validationError && <p className="field-error-msg">{validationError}</p>}
              </div>

              {attendance !== "decline" && (
                <div className="rsvp-field rsvp-field-narrow">
                  <label htmlFor={guestsSelectId} className="rsvp-field-label">
                    Party Size
                  </label>
                  <div className="rsvp-select-wrapper">
                    <select
                      id={guestsSelectId}
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                      className="rsvp-select"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="5+ Guests">5+ Guests</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Note / Wishes */}
            <div className="rsvp-field">
              <label htmlFor={noteInputId} className="rsvp-field-label">
                Wishes or Dietary Notes <span className="optional-tag">(Optional)</span>
              </label>
              <textarea
                id={noteInputId}
                rows={2}
                placeholder="Share your warm wishes or any dietary preferences..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="rsvp-textarea"
              />
            </div>

            {/* Live Message Preview Card */}
            <div className="rsvp-preview-box">
              <div className="rsvp-preview-header">
                <span className="preview-label">Prefilled Message Preview</span>
                <span className="preview-recipient">Recipient: {PHONE_NUMBER_DISPLAY}</span>
              </div>
              <pre className="preview-content">{prefilledMessage}</pre>
            </div>

            {/* Action Buttons */}
            <div className="rsvp-actions-container">
              <button
                type="button"
                className="rsvp-submit-btn rsvp-whatsapp-btn"
                onClick={() => handleSend("whatsapp")}
              >
                <svg
                  className="whatsapp-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Send RSVP via WhatsApp</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </button>

              <div className="rsvp-secondary-actions">
                <button
                  type="button"
                  className="rsvp-alt-btn"
                  onClick={() => handleSend("sms")}
                >
                  <span>Send via SMS / Text</span>
                </button>

                <button
                  type="button"
                  className="rsvp-alt-btn"
                  onClick={handleCopy}
                >
                  <span>{copied ? "Copied! ✓" : "Copy Message"}</span>
                </button>
              </div>
            </div>

            <p className="rsvp-privacy-note">
              Clicking will open WhatsApp or your messaging app with the text above prefilled to{" "}
              <strong>{PHONE_NUMBER_DISPLAY}</strong>. You can review or edit before hitting send.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
