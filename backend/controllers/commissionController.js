// backend/controllers/commissionController.js
const Commission = require("../models/Commission");

exports.getCommissionsForArtist = async (req, res) => {
  try {
    const { artistId } = req.query;
    if (!artistId) {
      return res.status(400).json({ error: "Artist ID is required." });
    }

    const commissions = await Commission.find({ artistId }).sort({
      requestDate: -1,
    });
    res.status(200).json({ commissions });
  } catch (error) {
    console.error("Get commissions error:", error);
    res.status(500).json({ error: "Server error while fetching commissions." });
  }
};

exports.completeCommission = async (req, res) => {
  try {
    const commissionId = req.params.id;
    const commission = await Commission.findById(commissionId);

    if (!commission) {
      return res.status(404).json({ error: "Commission not found." });
    }

    if (commission.status === "Completed") {
      return res
        .status(400)
        .json({ error: "Commission is already completed." });
    }

    commission.status = "Completed";
    commission.completionDate = new Date();
    await commission.save();

    res
      .status(200)
      .json({ message: "Commission marked as completed successfully." });
  } catch (error) {
    console.error("Complete commission error:", error);
    res.status(500).json({ error: "Server error while updating commission." });
  }
};
