const {connect} = require('mongoose');


const connectToDB = async(url)=>{
    await connect(url);
}


module.exports = connectToDB;