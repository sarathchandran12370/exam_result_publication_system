var express = require('express');
var router = express.Router();

const TeacherRoutes = require('./teacher.routes');
const StudentrecordRoutes = require('./studentrecord.routes');

router.get('/', function (req, res) {
  res.json({
      status: 'API Its Working  ',
      message: 'Welcome to RESTHub crafted with love!',
  });
});

router.use('/teacher', TeacherRoutes);
router.use('/studentrecord', StudentrecordRoutes);

module.exports = router;
