//!                                           mm                              
//!                                           MM                              
//!          `7Mb,od8  ,pW"Wq.  `7MM  `7MM  mmMMmm   .gP"Ya  `7Mb,od8 ,pP"Ybd 
//!            MM' "' 6W'   `Wb   MM    MM    MM    ,M'   Yb   MM' "' 8I   `" 
//!            MM     8M     M8   MM    MM    MM    8M""""""   MM     `YMMMa. 
//!            MM     YA.   ,A9   MM    MM    MM    YM.    ,   MM     L.   I8 
//!          .JMML.    `Ybmd9'    `Mbod"YML.  `Mbmo  `Mbmmd' .JMML.   M9mmmP' 

let express = require('express');
let router = express.Router();

const todoCtrl = require('../controllers/todos');

/* GET users listing. */
router.get('/', todoCtrl.index);
router.get('/new', todoCtrl.new);
router.get('/:id', todoCtrl.show);
router.get('/:id/edit', todoCtrl.edit);
router.post('/', todoCtrl.create);
router.delete('/:id', todoCtrl.delete);
router.put('/:id', todoCtrl.update);

module.exports = router;
