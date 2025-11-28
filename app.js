const express = require('express');
const app = express();

const result = { message: '收到请起', data: '固定JSON数据' };

app.get('/', (req, res) => {
  res.json(result);
});

// 添加新的路由处理
app.get('/api/sheet_meta', (req, res) => {
  res.json(sheetMetaResult);
});

app.get('/api/records', (req, res) => {
  res.json(recordsResult);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

const sheetMetaResult = {
  code: 0,
  msg: '',
  data: {
    sheetName: '测试表',
    fields: [
      {
        id: 'fid_1', // 字段唯一标识
        name: 'id', // 字段名称
        type: 'text', // 字段类型,
        isPrimary: true, // 是否主键字段
        property: {},
        description: 'description'
      },
      {
        id: 'fid_2', // 字段唯一标识
        name: 'name', // 字段名称
        type: 'number', // 字段类型, 枚举值见附录
        isPrimary: false, // 是否主键字段
        property: {
          formatter: 'INT'
        },
        description: 'description'
      }
    ]
  }
};

const recordsResult = {
  code: 0,
  msg: '',
  data: {
    nextToken: 'xxx', // 下次分页的起始令牌
    hasMore: false, // 是否还有更多数据
    records: [
      {
        id: '1', // 行记录id
        fields: {
          fid_1: 'xxx', // 字段id：字段值
          fid_2: 1222
        }
      },
      {
        id: '2',
        fields: {
          fid_1: 'xxx',
          fid_2: 334.33
        }
      }
    ],
    total: 2 // 字段总数，可选，用于计算当前数据同步进度
  }
};
