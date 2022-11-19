import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import multer from 'multer';

dotenv.config();
const app = express();
const upload = multer();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

/**
 * 应用首页
 */
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/**
 * 单文件上传
 */
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const name = req.file.originalName;
  const type = req.file.clientReportedMimeType;
  const size = req.file.size;

  if (name === '') return res.json({ error: '未选择文件！' });

  res.json({ name, type, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
