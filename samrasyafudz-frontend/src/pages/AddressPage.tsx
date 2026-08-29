import { useEffect, useState } from "react";
import { fetchAddresses, deleteAddress} from "../api/addresses";
import AddAddressForm from "../components/AddAddressForm";
import { Address } from "../api/types";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);

  function reload() {
    fetchAddresses().then(setAddresses);
    setShowForm(false);
  }

  useEffect(reload, []);

  return (
    <div className="container">
      <h1>My Addresses</h1>
      {addresses.map((a) => (
        <div key={a.id}>
          <p>{a.addressLine1}, {a.area}, {a.city} — {a.pincode} {a.isDefault && "(Default)"}</p>
          <button onClick={() => deleteAddress(a.id).then(reload)}>Delete</button>
        </div>
      ))}
      {showForm ? (
        <AddAddressForm onSaved={reload} />
      ) : (
        <button className="btn-primary" onClick={() => setShowForm(true)}>Add address</button>
      )}
    </div>
  );
}