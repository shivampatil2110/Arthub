// backend/routes/commission.js
const express = require("express");
const router = express.Router();
const commissionController = require("../controllers/commissionController");

// GET /api/v1/commissions - Get commissions for an artist (expects a query parameter 'artistId')
router.get("/", commissionController.getCommissionsForArtist);

// PUT /api/v1/commissions/:id/complete - Mark a commission as completed (commission id provided in URL)
router.put("/:id/complete", commissionController.completeCommission);

module.exports = router;
