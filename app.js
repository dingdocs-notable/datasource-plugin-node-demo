const express = require('express');
const { sheetMetaResult, recordsResult } = require('./mockData');
const app = express();

const result = { message: '收到请起', data: '固定JSON数据' };

app.get('/', (req, res) => {
  res.json(result);
});

app.post('/api/sheet_meta', (req, res) => {
  res.json(sheetMetaResult);
});

app.post('/api/records', (req, res) => {
  res.json(recordsResult);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
