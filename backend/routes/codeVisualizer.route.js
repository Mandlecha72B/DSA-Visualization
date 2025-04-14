const router = require('express').Router();
const { instrumentUserCode } = require('../controllers/instrumentCode');
router.post("/instrument", (req, res) => {
    try {
        const { code } = req.body;
        const instrumentedCode = instrumentUserCode(code);
        res.json({ instrumentedCode });
    } catch (err) {
        res.status(500).json({ error: "Instrumentation failed", details: err.message });
    }
});

module.exports = router;
