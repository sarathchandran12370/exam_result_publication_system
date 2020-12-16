  
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/exam-result-publication-system',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){
        console.log('MongoDB Connection Succeeded.');
    }else{
        console.log('MongoDB Connection err.'+err);
    }
})