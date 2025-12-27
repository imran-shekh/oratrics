const prisma = require("../prisma");

exports.getMetrics = async (req, res) => {
  try {
    const totalDemos = await prisma.demo.count();

    const converted = await prisma.demo.count({
      where: { outcome: "CONVERTED" },
    });

    const noShows = await prisma.demo.count({
      where: { outcome: "NO_SHOW" },
    });

    res.json({
      totalDemos,
      converted,
      noShows,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch metrics" });
  }
};
