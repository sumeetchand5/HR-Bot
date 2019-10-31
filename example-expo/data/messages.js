export default [
 
  {
    _id: 10,
    text: 'Hi, how can i help you today',
    createdAt: new Date(),
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: true,
      values: [
        {
          title: 'Apply',
          value: 'Apply',
        },
        {
          title: 'Approved',
          value: 'Approved',
        },
        {
          title: 'Pending Leaves',
          value: 'Pending Leaves',
        },
        {
          title: 'view History',
          value: 'View History',
        },
        {
          title: 'Extend',
          value: 'Extend',
        },
        {
          title: 'Cancel',
          value: 'Cancel',
        },
      ],
    },
    user: {
      _id: 2,
      name: 'React Native',
    },
  },
]
