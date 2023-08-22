const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const conn = mongoose.connection;

const detailController = require('../app/controllers/DetailController');

// Cái đoạn này là nôí tiếp của đoạn app.use('/bookfree/detail', detailRouter);
// nếu dùng là router.get("/hello") thì đường dẫn tuyệt đối nó sẽ là /bookfree/detail/hello
router.get('/:slug', detailController.book_frees);
router.get('/', detailController.detail);

// Định nghĩa endpoint để truy xuất tập tin PDF
router.get('/getpdf/:filename', (req, res) => {
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); // Tên collection lưu trữ tập tin
  
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'File not found'
        });
      }
  
      // Mở luồng để đọc tập tin từ GridFS
      const readstream = gfs.createReadStream({
        filename: file.filename
      });
      readstream.pipe(res);
    });
  });
  

module.exports = router;