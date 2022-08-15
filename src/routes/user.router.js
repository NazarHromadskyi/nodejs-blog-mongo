const router = require('express').Router();

const { userController } = require('../controllers');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);

router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
