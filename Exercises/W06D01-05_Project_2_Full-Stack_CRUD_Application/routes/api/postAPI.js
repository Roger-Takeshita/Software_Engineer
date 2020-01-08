const express = require('express');
const router = express.Router();
const postAPICtrl = require('../../controllers/api/postsAPI');

router.get('/',    postAPICtrl.index);
router.get('/:id', postAPICtrl.showOnePost);

module.exports = router;