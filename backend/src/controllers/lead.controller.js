const prisma = require("../prisma");

exports.createLead = async (req, res) => {
  try {
    const { parent_name, child_grade, program_interest } = req.body;

    if (!parent_name || !child_grade || !program_interest) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const allowedPrograms = ["MATH", "PERSONALITY"];
    if (!allowedPrograms.includes(program_interest)) {
      return res.status(400).json({
        message: `program_interest must be one of ${allowedPrograms.join(", ")}`
      });
    }

    const lead = await prisma.lead.create({
      data: { parent_name, child_grade, program_interest },
    });

    res.status(201).json(lead);
  } catch (error) {
    console.error("🔥 Create lead error:", error);
    res.status(500).json({ message: "Failed to create lead" });
  }
};


exports.getLeads = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { id: "desc" }
    });

    res.json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch leads" });
  }
};

