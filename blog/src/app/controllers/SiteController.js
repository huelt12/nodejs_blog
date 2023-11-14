const Course = require('../Models/Couserse')
const {mutipleMongooseToObject} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');

const paginate = require('mongoose-paginate-v2');

const Handlebars = require('handlebars');

class SiteController {
  async home(req, res) {
      try {
          // Truy vấn cơ sở dữ liệu để lấy danh sách khóa học
          const page = req.query.page || 1; // Lấy trang hiện tại từ query string, mặc định là trang 1
          const options = {
              page: page, // Trang hiện tại
              limit: 12, // Số lượng khóa học trên mỗi trang
          };
            // Tạo biến isFirstPage dựa trên giá trị của page
            const isFirstPage = page === 1;

          const courses = await Course.paginate({}, options);

          // 1. Tạo một bản sao dự phòng cho dữ liệu khóa học
          const coursesCopy = mutipleMongooseToObject(courses.docs);

          res.render('home', {
              courses: coursesCopy, 
              pages: courses.totalPages, 
              currentPage: page, 
              hasNextPage: courses.hasNextPage,
              hasPrevPage: courses.hasPrevPage,
              nextPage: courses.nextPage,
              prevPage: courses.prevPage,
              isFirstPage: isFirstPage, 
              authenticated: req.session.authenticated || false
          });
      } catch (error) {
          console.error(error);
          res.status(500).send('Đã xảy ra lỗi trong quá trình xử lý yêu cầu.');
      }
  }

    //[get] /search
    search(req, res) {
        const query = req.query.q || '';
        // Thực hiện tìm kiếm sách theo từ khóa query
        Course.find({
          $or: [
            { name: { $regex: query, $options: 'i' } }, 
            { author: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } },
          ],
        })
          .then(searchResults => {
            const courses = mutipleMongooseToObject(searchResults);
            if (courses === 0) {
              // Nếu không có kết quả tìm kiếm, trả về thông báo
              res.render('search', {
                message: 'Không tìm thấy kết quả tìm kiếm',
                authenticated: req.session.authenticated || false,
              });
            } else {
              // Nếu có kết quả tìm kiếm, hiển thị dữ liệu
              res.render('search', { courses, authenticated: req.session.authenticated || false });
            }
          })

          .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });
    }

    gioithieu(req, res){
        res.render('gioithieu', {
            authenticated: req.session.authenticated || false
        });
    }
    
}

module.exports = new SiteController;