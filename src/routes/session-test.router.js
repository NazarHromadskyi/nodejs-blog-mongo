const chalk = require('chalk');
const router = require('express').Router();

router.get('/', (req, res) => {
    // console.log(req.session);
    //
    // console.log('ID', chalk.red(req.session.id));
    //
    // res.json(JSON.stringify(req.session));
});

module.exports = router;
