export default [
  {
    _id: Math.round(Math.random() * 1000000),
    text:'',    createdAt: new Date(Date.UTC(2019, 9, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer',
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: ' ',
    createdAt: new Date(Date.UTC(2019, 9, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer',
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: '',
    createdAt: new Date(Date.UTC(2019, 9, 30, 17, 20, 0)),
    system: true,
  },
];
