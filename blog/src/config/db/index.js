const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb+srv://huelt:huelucthi123@cluster0.uzxyzme.mongodb.net/data_book?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            // useUnifiendTopology: true
        });
        console.log('Connect successfully !!!');
    } catch (error) {
        console.log(error)
        console.log('Connect failure !!!');
    }
}

module.exports = { connect }; 