const chalk = require('chalk');
const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.session);

    console.log('ID', chalk.red(req.session.id));

    if (req.session.viewsCount) {
        req.session.viewsCount += 1;
    } else {
        req.session.viewsCount = 1;
    }

    res.json(`session views: ${req.session.viewsCount}`);
});

module.exports = router;
