var express = require('express')
var mongoose = require('mongoose')

var app = express();
var bodyParser = require('body-parser')
var fs = require('fs');
mongoose.connect("mongodb://swanandnoticeb:swanand123@ds161459.mlab.com:61459/noticebox");

app.use(bodyParser.json())

var multer = require('multer');
var upload = multer({ dest: './uploads' });
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))

//SCHEMA SETUP
var noticeschema = new mongoose.Schema({


    department: String,
    name: String,
    message: String,

    file: ({
        name: String,
        data: Buffer,
        content_type: String,
        size: String
    })


})

//naming model on schema
//var InfoTech = mongoose.model('InfoTech', noticeboxschema)
var etc = mongoose.model("Electronics and Telecommunication", noticeschema)
var it = mongoose.model("Information Technology", noticeschema)
var comp = mongoose.model("Computer Science", noticeschema)




app.post("/upload", upload.single('file'), function(req, res) {

    var department = req.body.department;
    var name = req.body.name;
    var message = req.body.message;
    var file = req.file
    file.data = fs.readFileSync(req.file.path)
    console.log(req.body)
    console.log(req.file)

    var newnotice = {

        department: department,
        name: name,
        message: message,

        file: file

    }


    //Classification of notices as per department selected

    if (department == 'it') {

        it.create(newnotice, function(err, newlcreated) {

            if (err) {

                console.log("error");
            } else {

                console.log("added to it db")

            }

        })
    } else if (department == 'etc') {

        etc.create(newnotice, function(err, newlcreated) {

            if (err) {

                console.log("error");
            } else {

                console.log("added to etc db")

            }

        })
    } else if (department == 'computerscience') {

        comp.create(newnotice, function(err, newlcreated) {

            if (err) {

                console.log("error");
            } else {

                console.log("added to computerscience db")

            }

        })


    }


})



app.get("/getdata", function(req, res) {


    noticebox.find({}, function(err, allnoticeboards) {

        if (err) {
            console.log("error")
        } else {
            res.render("getdata.ejs", { noticeboxes: allnoticeboards })

        }

    })
})

app.get("/", function(req, res) {

    res.render("index.ejs")
})

app.listen(process.env.PORT || 5000, function() {
    console.log('Example app listening on port 8000!');

});