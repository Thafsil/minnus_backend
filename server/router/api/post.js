const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

mongoose.connect('mongodb+srv://thafsil:test123456@thafsil-4zp3x.mongodb.net/Thafsil?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const postSchema = new mongoose.Schema({
    name: String,
    password: String
})

const PostModel = mongoose.model('PostModel', postSchema)

//Get
router.get('/',  (req, res) => {
PostModel.find({},(err,data)=>{
    res.send(data);
});
})

//post
router.post('/',(req, res) => {
    PostModel.create({
        name : req.body.name,
    password : req.body.password
    },(err,data)=>{
        res.send(data).status(200);
    })

})

//Delete
router.delete('/:id', (req, res) => {
    PostModel.deleteOne({_id: req.params.id},(err, data) => {
        res.send(data).status(200);
    })
})


module.exports = router;
