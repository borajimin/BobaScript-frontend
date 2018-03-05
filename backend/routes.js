const express = require('express');
const router = express.Router();
const compiler = require('../compiler/compiler.js');

// YOUR API ROUTES HERE

router.post('/parseBobaScript', (req, res)=>{
    res.send(compiler(req.body.bobaScript));
});

// SAMPLE ROUTE
router.use('/users', (req, res) => {
    res.json({ success: true });
});

module.exports = router;
