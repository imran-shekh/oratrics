const prisma = require("../prisma");


/**
 * Schedule a demo
 */
exports.scheduleDemo = async (req, res) => {
  try {
    console.log("📥 Schedule demo payload:", req.body);
    const { lead_id, scheduled_at, teacher_name } = req.body;

    if (!lead_id || !scheduled_at || !teacher_name) {
      return res.status(400).json({
        message: "lead_id, scheduled_at and teacher_name are required",
      });
    }

    const demo = await prisma.demo.create({
      data: {
        scheduled_datetime: new Date(scheduled_at),
        teacher_name,
        lead: {
          connect: { id: lead_id },
        },
      },
    });

    res.status(201).json(demo);
  } catch (error) {
    console.error("🔥 Demo schedule error:", error);
    res.status(500).json({
      message: "Failed to schedule demo",
      error: error.message,
    });
  }
};


/**
 * Update demo outcome
 */
const VALID_OUTCOMES = ["COMPLETED", "NO_SHOW", "CONVERTED"];

exports.updateDemoOutcome = async (req, res) => {
  try {
    const { demo_id, outcome } = req.body;

    if (!demo_id || !outcome) {
      return res.status(400).json({ message: "demo_id and outcome are required" });
    }

    if (!VALID_OUTCOMES.includes(outcome)) {
      return res.status(400).json({ message: "Invalid outcome value" });
    }

    const demo = await prisma.demo.findUnique({
      where: { id: demo_id },
    });

    if (!demo) {
      return res.status(404).json({ message: "Demo not found" });
    }

    await prisma.demo.update({
      where: { id: demo_id },
      data: { outcome },
    });

    let newLeadStatus = "DEMO_COMPLETED";
    if (outcome === "CONVERTED") newLeadStatus = "CONVERTED";

    await prisma.lead.update({
      where: { id: demo.lead_id },
      data: { status: newLeadStatus },
    });

    res.json({ message: "Demo outcome updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update outcome" });
  }
};


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     await api.post("/demos", {
//       lead_id: Number(form.lead_id),
//       teacher_name: form.teacher_name,
//       scheduled_at: form.scheduled_at,
//     });

//     alert("Demo scheduled successfully");
//     setForm({ lead_id: "", teacher_name: "", scheduled_at: "" });
//     onDemoScheduled();
//   } catch (err) {
//     alert("Failed to schedule demo");
//     console.error(err.response?.data || err);
//   }
// };


exports.getDemos = async (req, res) => {
  try {
    const demos = await prisma.demo.findMany({
      include: {
        lead: true,
      },
    });
    res.json(demos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch demos" });
  }
};


