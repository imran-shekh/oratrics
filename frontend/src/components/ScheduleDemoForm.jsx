import { useEffect, useState } from "react";
import api from "../api";

export default function ScheduleDemoForm({ onDemoScheduled }) {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    lead_id: "",
    teacher_name: "",
    scheduled_at: "",
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await api.get("/leads");
      // Only allow scheduling for NEW leads
      const newLeads = res.data.filter((l) => l.status === "NEW");
      setLeads(newLeads);
    } catch (err) {
      console.error("Failed to fetch leads", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/demos", {
        lead_id: Number(form.lead_id),
        teacher_name: form.teacher_name,
        scheduled_at: form.scheduled_at,
      });

      alert("Demo scheduled successfully");
      setForm({ lead_id: "", teacher_name: "", scheduled_at: "" });
      onDemoScheduled();
      fetchLeads();
    } catch (err) {
      alert("Failed to schedule demo");
      console.error(err.response?.data || err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={form.lead_id}
        onChange={(e) => setForm({ ...form, lead_id: e.target.value })}
        required
      >
        <option value="">Select Lead</option>
        {leads.map((lead) => (
          <option key={lead.id} value={lead.id}>
            {lead.parent_name} (Grade {lead.child_grade})
          </option>
        ))}
      </select>

      <input
        placeholder="Teacher Name"
        value={form.teacher_name}
        onChange={(e) =>
          setForm({ ...form, teacher_name: e.target.value })
        } required/>

      <input
        type="datetime-local"
        value={form.scheduled_at}
        onChange={(e) =>
          setForm({ ...form, scheduled_at: e.target.value })
        } required/>

      <button type="submit">Schedule Demo</button>
    </form>
  );
}
