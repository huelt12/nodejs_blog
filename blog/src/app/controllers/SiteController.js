const Course = require('../Models/Couserse')
const {mutipleMongooseToObject} = require('../../util/mongoose');
const paginate = require('mongoose-paginate-v2');
const Handlebars = require('handlebars');



class SiteController {
    //[get] /trangchu

    async home(req, res, next){
            // Đọc
        // let courses = await Course.find({});
        // courses = courses.map(course => course.toObject());
        // res.render('home', {courses});

            // Tạo mới
        // const courses = await Course.create({
        // name: "sachhay",
        // description: "Mo ta sach",
        // image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2019/12/truyen-dai-nguyen-nhat-anh-13-696x928.jpg?fit=700%2C20000&quality=95&ssl=1",
        // })

        
        // Đọc từ BD
         Course.find({})
             .then(courses => {         
                 res.render('home', {
                    courses: mutipleMongooseToObject(courses)
                 });
             })
             .catch(next);

    }
    //[get] /search
    search(req, res){
        res.render('search');
    }
    gioithieu(req, res){
        res.render('gioithieu');
    }

}


// Handlebars.registerHelper('paginate', function(items, options) {
//     var perPage = options.hash.itemsPerPage || 10;
//     var currentPage = options.data.root.currentPage || 1;

//     var totalPages = Math.ceil(items.length / perPage);
//     var pageRange = Math.min(totalPages, 5);
//     var startPage = Math.max(currentPage - Math.floor(pageRange / 2), 1);
//     var endPage = Math.min(startPage + pageRange - 1, totalPages);

//     var context = {
//         pages: []
//     };

//     for (var i = startPage; i <= endPage; i++) {
//         context.pages.push({
//             pageNumber: i,
//             isActive: i === currentPage,
//             pageLink: options.fn({pageNumber: i})
//         });
//     }

//     context.isFirstPage = currentPage === 1;
//     context.isLastPage = currentPage === totalPages;

//     if (context.isFirstPage) {
//         context.firstPageNum = 1;
//     }

//     if (context.isLastPage) {
//         context.lastPageNum = totalPages;
//     }

//     return options.fn(context);
// });

// Handlebars.registerHelper('pageLink', function(pageNum) {
//     // Xây dựng liên kết đúng cho trang có số pageNum
//     return '/trang/' + pageNum; // Thay thế bằng logic xây dựng liên kết của bạn
// });
// Handlebars.registerHelper('renderCourses', function(courses) {
//     return new Handlebars.SafeString(renderCourses(courses));
// });


let courses = []
let currentPage = 1
let perPage = 12
let totalpage = courses.length / 12
let percourses = []
let coursesFromDB = []; // Tên biến mới để lưu danh sách khóa học từ MongoDB


// Hàm lấy dữ liệu khóa học
async function getCourses(){
    try{
        // Lấy danh sách khóa học từ cơ sở dữ liệu MongoDB
        coursesFromDB = await Course.find({}); // Lưu vào biến coursesFromDB
        // Số khóa học hiển thị trên mỗi trang
        const perPage = 12;
        // Trang hiện tại
        const currentPage = 1;
        // Tính chỉ số bắt đầu và kết thúc của dữ liệu khóa học hiển thị trên trang hiện tại
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        // Lấy danh sách khóa học hiển thị trên trang hiện tại
        const coursesPerPage = coursesFromDB.slice(startIndex, endIndex);
        // Gọi hàm để render số trang và dữ liệu khóa học

        renderPageNumber();
        renderCourses(coursesPerPage);
    } catch (error) {
        console.error(error);
    }
}

// Hàm render số trang
function renderPageNumber() {
    totalpage = coursesFromDB.length / perpage;
    for (let i = 1; i <= totalpage; i++) {
        document.getElementById("pagination").innerHTML += `<li>${i}</li>`;
    }
}


function renderCourses(courses) {
    let element = '';

    courses.map(course => {
        element += `
            <div class="col-sm-6 col-lg-3 col-md-4 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="product-img position-relative overflow-hidden">
                        <a href="/courses/${course.slug}">
                            <img src="${course.image}" class="img-fluid w-100 pt-3" alt="${course.name}">
                            <div class="product-action">
                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                            </div>
                        </a> 
                    </div>
                    <div class="text-center py-1">
                        <div class="card-body">
                            <a class="h6 text-decoration-none text-truncate" href="/courses/${course.slug}">${course.name}</a>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                                <p class="card-text">${course.gia} đ</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                                <a href="/courses/${course._id}/add_cart" class="btn btn-primary">Mua ngay</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    });

    document.getElementById("courseContainer").innerHTML = element;
}





module.exports = new SiteController;