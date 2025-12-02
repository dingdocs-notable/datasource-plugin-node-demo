const { v4: uuidv4 } = require('uuid');
const nameKey = 'wxyf3c29m511396aa9dxi';
const gradeKey = 'mw8kt145wvmgxxpmzu61o';
const ageKey = 's6kp2d9471uiv1jsln86o';
const genderKey = 'wbgm4xjs2y5s0e1kn9z7q';
const birthDataKey = '378n13mugiq87gyo2w91g';
const ethnicityKey = '0f9iaa6uxw2tp65qw9d30';

// 从JS文件中读取学生数据
const allStudents = require('./studentInfo');

// 根据年级和性别筛选学生数据的方法
function generateRecordsByGradeAndGender(grade, gender) {
  // 筛选符合条件的学生数据
  const filteredStudents = allStudents.filter(student => {
    return student.年级 === grade && student.性别 === gender;
  });

  // 将学生数据转换为records格式
  const records = filteredStudents.map((student, index) => {
    // 生成10位随机数字+字母的字符串
    const uniqueId = uuidv4().replace(/-/g, '').substring(0, 10);

    return {
      fields: {
        [nameKey]: student.name,
        [gradeKey]: student.grade,
        [ageKey]: student.age,
        [genderKey]: student.gender,
        [birthDataKey]: student.birthData,
        [ethnicityKey]: student.ethnicity
      },
      id: uniqueId // 使用UUID生成的10位随机字符串作为ID
    };
  });

  return records;
}

module.exports = {
  sheetMetaResult: {
    code: 0,
    msg: '',
    data: {
      name: 'students-学生信息',
      fields: [
        {
          name: '姓名',
          property: null,
          id: nameKey,
          type: 'text'
        },
        {
          name: '年级',
          property: {
            choices: [
              {
                name: '二年级',
                id: 'spix22630crc8144hf3ug'
              },
              {
                name: '三年级',
                id: '8vhbbqynh0ayb5a77fvgi'
              },
              {
                name: '一年级',
                id: 'of2ect1dchxkq8a0g1yhd'
              }
            ]
          },
          id: gradeKey,
          type: 'singleSelect'
        },
        {
          name: '年龄',
          property: {
            formatter: 'INT'
          },
          id: ageKey,
          type: 'number'
        },
        {
          name: '性别',
          property: {
            choices: [
              {
                name: '男',
                id: 'x9vccmlgsvz3nkos4a0sj'
              },
              {
                name: '女',
                id: '5a0pzsggzt8ma1lfgammp'
              }
            ]
          },
          id: genderKey,
          type: 'singleSelect'
        },
        {
          name: '出生年月',
          property: {
            formatter: 'YYYY-MM-DD'
          },
          id: birthDataKey,
          type: 'date'
        },
        {
          name: '民族',
          property: null,
          id: ethnicityKey,
          type: 'text'
        }
      ]
    }
  },
  recordsResult: {
    code: 0,
    msg: '',
    data: {
      hasMore: false, // 是否还有更多数据
      records: [
        {
          fields: {
            [gradeKey]: '男',
            [birthDataKey]: '2000-09-13',
            [nameKey]: '尤娜',
            [gradeKey]: '一年级',
            [ageKey]: '25',
            [ethnicityKey]: '维吾尔族'
          },
          id: '5qVNqRQKh1'
        }
      ],
      total: 2 // 字段总数，可选，用于计算当前数据同步进度
    }
  },
  generateRecordsByGradeAndGender // 导出新方法
};
