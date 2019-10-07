
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Images = require('./images');
const multer = require('multer');
const path = require('path');

const storageEngine = multer.diskStorage({
  destination: './images/',
  filename: function (req, file, fn) {
    fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 200000 },
});

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute =
  'mongodb://fullstackUser:FIlNTkuWAPcNxufo@fullstack-challenge-shard-00-00-cxpxz.mongodb.net:27017,fullstack-challenge-shard-00-01-cxpxz.mongodb.net:27017,fullstack-challenge-shard-00-02-cxpxz.mongodb.net:27017/fullstack-challenge?ssl=true&replicaSet=fullstack-challenge-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/getallimages', (req, res) => {
  Images.find((err, images) => {
    if (err) { return res.json({ success: false, error: err }); }
    return res.send(images);
  });
});

router.post('/upload', upload.single('imagedata'), (req, res) => {

  let newImage = new Images();

  const { userid } = req.body;
  const { path } = req.file;

  newImage.userId = userid;
  newImage.imagePath = path;

  newImage.save((err) => {
    if (err) { return res.json({ success: false, error: err }); }
    return res.json({ success: true });
  });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));


