import { useEffect, useState } from "react";
import api from "../api";

export default function LeadsTable() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await api.get("/leads");
      setLeads(res.data);
    } catch (err) {
      console.error("Failed to fetch leads", err);
    }
  };

  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Parent Name</th>
          <th>Child Grade</th>
          <th>Program</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {leads.length === 0 ? (
          <tr>
            <td colSpan="5">No leads found</td>
          </tr>
        ) : (
          leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.parent_name}</td>
              <td>{lead.child_grade}</td>
              <td>{lead.program_interest}</td>
              <td>{lead.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
