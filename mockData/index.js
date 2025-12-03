let uuidv4;
async function init(){
  const {v4} = await import('uuid');
  uuidv4 = v4;
}
init();

const nameKey = 'wxyf3c29m511396aa9dxi';
const gradeKey = 'mw8kt145wvmgxxpmzu61o';
const ageKey = 's6kp2d9471uiv1jsln86o';
const genderKey = 'wbgm4xjs2y5s0e1kn9z7q';
const birthDataKey = '378n13mugiq87gyo2w91g';
const ethnicityKey = '0f9iaa6uxw2tp65qw9d30';

// 从JS文件中读取学生数据
const allStudents = require('./studentInfo');

// 年级映射表
const gradeMap = {
  1: '一年级',
  2: '二年级',
  3: '三年级',
  4: '四年级',
  5: '五年级',
  6: '六年级'
};

// 性别映射表
const genderMap = {
  1: '男',
  2: '女'
};

// 根据年级和性别筛选学生数据的方法
function generateRecordsByGradeAndGender(grade, gender) {
  // 筛选符合条件的学生数据
  const filteredStudents = allStudents.filter(student => {
    // 处理年级筛选条件
    let gradeMatch = true;
    if (grade !== 0) {
      // grade为0表示全部年级，不为0时表示特定年级
      const targetGrade = gradeMap[grade];
      if (targetGrade) {
        gradeMatch = student.grade === targetGrade;
      } else {
        gradeMatch = false; // 无效的年级参数
      }
    }

    // 处理性别筛选条件
    let genderMatch = true;
    if (gender !== 0) {
      // gender为0表示全部性别，不为0时表示特定性别
      const targetGender = genderMap[gender];
      if (targetGender) {
        genderMatch = student.gender === targetGender;
      } else {
        genderMatch = false; // 无效的性别参数
      }
    }

    return gradeMatch && genderMatch;
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
              },
              {
                name: '四年级',
                id: 'fourth-grade-id'
              },
              {
                name: '五年级',
                id: 'fifth-grade-id'
              },
              {
                name: '六年级',
                id: 'sixth-grade-id'
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
      hasMore: false,
      records: [],
      total: 0
    }
  },
  generateRecordsByGradeAndGender // 导出新方法
};
