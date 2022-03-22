export const data = [
  {
    words: [
      {
        english: 'airtight',
        russian: 'герметичный',
      },
      {
        english: 'essential',
        russian: 'важный, нужный, существенный',
      },
      {
        english: 'impression',
        russian: 'впечатление',
      },
      {
        english: 'prepare',
        russian: 'подготавливать',
      },
      {
        english: 'apportion',
        russian: 'распределять',
      },
      {
        english: 'provide',
        russian: 'предоставлять',
      },
      {
        english: 'tenant',
        russian: 'жилец, арендатор',
      },
      {
        english: 'as per',
        russian: 'согласно',
      },
      {
        english: 'reside',
        russian: 'проживать',
      }
    ],
    id: 1,
  },
  {
    words: [
      {
        english: 'venture',
        russian: 'предприятие',
      },
      {
        english: 'shift',
        russian: 'сдвиг',
      },
      {
        english: 'void',
        russian: 'пустота',
      },
      {
        english: 'share',
        russian: 'доля',
      },
      {
        english: 'obviously',
        russian: 'очевидно',
      },
      {
        english: 'mismanage',
        russian: 'плохо управлять',
      },
      {
        english: 'neither',
        russian: 'никто, ни один',
      },
      {
        english: 'summary',
        russian: 'резюме',
      },
      {
        english: 'to venture',
        russian: 'рисковать',
      },
      {
        english: 'implement',
        russian: 'осуществлять, выполнять',
      }
    ],
    id: 2,
  },
];

export const general = {
  words: [].concat(...data.map((item) => [...item.words])),
  id: 0,
};
