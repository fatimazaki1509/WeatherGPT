export default function EmergencyContacts() {

  const contacts = [
    {
      name: "National Emergency",
      number: "112"
    },
    {
      name: "Disaster Management",
      number: "1078"
    },
    {
      name: "Ambulance",
      number: "108"
    }
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-6">

      <h3 className="text-xl font-bold text-white mb-4">
        Emergency Contacts
      </h3>

      <div className="space-y-3">

        {contacts.map((c) => (
          <div
            key={c.number}
            className="bg-slate-800 rounded-xl p-4 flex justify-between"
          >
            <span>{c.name}</span>
            <span className="text-emerald-400 font-bold">
              {c.number}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}