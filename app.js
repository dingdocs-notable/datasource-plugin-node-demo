const express = require('express');
const { sheetMetaResult, recordsResult, generateRecordsByGradeAndGender } = require('./mockData');
const app = express();

const result = { message: '收到请起', data: '固定JSON数据' };

// 添加中间件来解析请求体（必须在路由定义之前）
app.use(express.json({ limit: '10mb' })); // 解析JSON格式的请求体
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // 解析URL编码的请求体
app.use(express.text()); // 解析纯文本格式的请求体

app.get('/', (req, res) => {
  res.json(result);
});

app.post('/api/sheet_meta', (req, res) => {
  res.json(sheetMetaResult);
});

app.post('/api/records', (req, res) => {
  const body = req.body;
  const { grade, gender } = body;
  const records = generateRecordsByGradeAndGender(grade, gender);

  res.json({
    ...recordsResult,
    data: {
      hasMore: false, // 是否还有更多数据
      total: 2, // 字段总数，可选，用于计算当前数据同步进度
      records,
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
