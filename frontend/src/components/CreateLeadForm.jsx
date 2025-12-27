import { useState } from "react";
import api from "../api";

export default function CreateLeadForm({ onLeadCreated }) {
  const [form, setForm] = useState({
    parent_name: "",
    child_grade: "",
    program_interest: "MATH",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/leads", form);
      alert("Lead created");
      setForm({ parent_name: "", child_grade: "", program_interest: "MATH" });
      onLeadCreated();
    } catch (err) {
      alert("Failed to create lead");
      console.error(err);
    }
  };

  return (
    <div className="form-row">
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Parent Name"
        value={form.parent_name}
        onChange={(e) => setForm({ ...form, parent_name: e.target.value })}
        required/>

      <input placeholder="Child Grade"
        value={form.child_grade}
        onChange={(e) => setForm({ ...form, child_grade: e.target.value })}
        required/>

      <select
        value={form.program_interest}
        onChange={(e) =>
          setForm({ ...form, program_interest: e.target.value })
        }>
        <option value="MATH">Math</option>
        <option value="PERSONALITY">Personality</option>
        <option value="SCIENCE">Science</option>
        <option value="PUBLIC SPEAKING">public Speaking</option>
        <option value="COMMUNICATION SKILLS">Communication Skills</option>
      </select>

      <button type="submit">Create Lead</button>
    </form>
    </div>
  );
}
