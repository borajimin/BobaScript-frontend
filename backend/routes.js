const express = require('express');
const router = express.Router();
const compiler = require('../compiler/compiler.js');


router.post('/parseBobaScript', (req, res)=>{
  res.send(compiler(req.body.bobaScript));
});

router.use('/users', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
