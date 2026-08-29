import { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../api/profile";
import { fetchAddresses, deleteAddress} from "../api/addresses";
import { useAuth } from "../context/AuthContext";
import AddAddressForm from "../components/AddAddressForm";
import { Address } from "../api/types";

export default function AccountPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addressesLoading, setAddressesLoading] = useState(true);

  const { updateUser } = useAuth();

  useEffect(() => {
    fetchProfile().then((p) => {
      setFullName(p.fullName ?? "");
      setEmail(p.email ?? "");
    });
    loadAddresses();
  }, []);

  function loadAddresses() {
    setAddressesLoading(true);
    fetchAddresses()
      .then(setAddresses)
      .finally(() => setAddressesLoading(false));
  }

  async function handleSaveProfile() {
    setProfileError(null);
    setSavingProfile(true);
    try {
      const updated = await updateProfile({ fullName, email });
      updateUser({ fullName: updated.fullName ?? undefined });
    } catch (err: any) {
      setProfileError(err?.response?.data?.message || "Could not save profile. Please try again.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleDeleteAddress(id: number) {
    await deleteAddress(id);
    loadAddresses();
  }

  function handleAddressSaved() {
    setShowAddForm(false);
    loadAddresses();
  }

  return (
    <div className="container" style={{ maxWidth: 600, padding: "40px 24px" }}>
      <h1>My Account</h1>

      {/* --- Profile section --- */}
      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Profile</h2>

        <div className="auth-field">
          <label>Full name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" />
        </div>

        <div className="auth-field" style={{ marginTop: 12 }}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </div>

        {profileError && <p className="error-text">{profileError}</p>}

        <button className="btn-primary" style={{ marginTop: 12 }} onClick={handleSaveProfile} disabled={savingProfile}>
          {savingProfile ? "Saving…" : "Save profile"}
        </button>
      </section>

      <hr style={{ margin: "32px 0", border: "none", borderTop: "1px solid var(--color-border)" }} />

      {/* --- Addresses section --- */}
      <section>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>My Addresses</h2>

        {addressesLoading ? (
          <p className="home-status">Loading addresses…</p>
        ) : addresses.length === 0 ? (
          <p className="home-status">No saved addresses yet.</p>
        ) : (
          addresses.map((a) => (
            <div
              key={a.id}
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                padding: 14,
                marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  {a.label && <strong>{a.label}</strong>}
                  {a.isDefault && (
                    <span
                      style={{
                        marginLeft: 8,
                        fontSize: 11,
                        color: "var(--color-accent-dark)",
                        border: "1px dashed var(--color-accent)",
                        borderRadius: 20,
                        padding: "2px 8px",
                      }}
                    >
                      Default
                    </span>
                  )}
                  <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--color-ink-soft)" }}>
                    {a.addressLine1}, {a.area}, {a.city}, {a.state} — {a.pincode}
                  </p>
                </div>
                <button className="btn-secondary" onClick={() => handleDeleteAddress(a.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        {showAddForm ? (
          <div style={{ marginTop: 16 }}>
            <AddAddressForm onSaved={handleAddressSaved} />
            <button className="btn-secondary" style={{ marginTop: 12 }} onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn-primary" style={{ marginTop: 12 }} onClick={() => setShowAddForm(true)}>
            Add address
          </button>
        )}
      </section>
    </div>
  );
}
