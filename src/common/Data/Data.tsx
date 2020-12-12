export type passwordType = {
  id: number;
  title: string;
  username: string;
  password: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type DataType = {
  id: number;
  title: string;
  passwordList: passwordType[] | [];
};

export const Data: DataType[] = [
  {
    id: 1,
    title: 'Suhag',
    passwordList: [
      {
        id: 1,
        title: 'Github',
        username: 'suhag.lapani@gmail.com',
        password: 'suhag@123',
        description: "It's my github account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
      {
        id: 2,
        title: 'Google',
        username: 'suhag.lapani@gmail.com',
        password: 'suhag@123',
        description: "It's my Google account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
    ],
  },
  {
    id: 2,
    title: 'Hiren',
    passwordList: [
      {
        id: 3,
        title: 'Facebook',
        username: 'hiren.tariwala@gmail.com',
        password: 'hiren@123',
        description: "It's my github account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
      {
        id: 4,
        title: 'Github',
        username: 'hiren.github@gmail.com',
        password: 'hiren@1234',
        description: "It's my github account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
      {
        id: 5,
        title: 'Google',
        username: 'hiru.tari@gmail.com',
        password: 'hiru@123',
        description: "It's my google account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
    ],
  },
  {
    id: 3,
    title: 'Vaibhav',
    passwordList: [
      {
        id: 6,
        title: 'Github',
        username: 'vaibhu.patel@gmail.com',
        password: 'vaibhu@123',
        description: "It's my github account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
      {
        id: 7,
        title: 'Google',
        username: 'vaibhu.p@gmail.com',
        password: 'vaibhu@143',
        description: "It's my google account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
    ],
  },
  {
    id: 4,
    title: 'Dhruvin',
    passwordList: [
      {
        id: 8,
        title: 'Github',
        username: 'dhruvin.p@gmail.com',
        password: 'dhruvin@123456',
        description: "It's my github account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
    ],
  },
  {
    id: 5,
    title: 'Rutuj',
    passwordList: [
      {
        id: 9,
        title: 'Github',
        username: 'rutuj.tailor@gmail.com',
        password: 'rutuj@123',
        description: "It's my github account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
    ],
  },
  {
    id: 6,
    title: 'Pratik',
    passwordList: [
      {
        id: 10,
        title: 'Upwork',
        username: 'pratik.dabhi@gmail.com',
        password: 'pratik@123',
        description: "It's my upwork account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
    ],
  },
  {
    id: 7,
    title: 'Chirag',
    passwordList: [
      {
        id: 11,
        title: 'upwork',
        username: 'chirag.khant@gmail.com',
        password: 'chirag@123',
        description: "It's my upwork account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
    ],
  },
  {
    id: 8,
    title: 'ABC',
    passwordList: [
      {
        id: 12,
        title: 'upwork',
        username: 'chirag.khant@gmail.com',
        password: 'chirag@123',
        description: "It's my upwork account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
    ],
  },
  {
    id: 9,
    title: 'XYZ',
    passwordList: [
      {
        id: 13,
        title: 'upwork',
        username: 'chirag.khant@gmail.com',
        password: 'chirag@123',
        description: "It's my upwork account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
    ],
  },
  {
    id: 10,
    title: 'ABCD',
    passwordList: [
      {
        id: 14,
        title: 'upwork',
        username: 'chirag.khant@gmail.com',
        password: 'chirag@123',
        description: "It's my upwork account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
    ],
  },
  {
    id: 11,
    title: 'ABCDEF',
    passwordList: [
      {
        id: 15,
        title: 'upwork',
        username: 'chirag.khant@gmail.com',
        password: 'chirag@123',
        description: "It's my upwork account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
    ],
  },
  {
    id: 12,
    title: 'ABCDEFG',
    passwordList: [
      {
        id: 16,
        title: 'upwork',
        username: 'chirag.khant@gmail.com',
        password: 'chirag@123',
        description: "It's my upwork account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
    ],
  },
  {
    id: 13,
    title: 'ABCDEFGHI',
    passwordList: [
      {
        id: 17,
        title: 'upwork',
        username: 'chirag.khant@gmail.com',
        password: 'chirag@123',
        description: "It's my upwork account details.",
        created_at: '13/03/2020',
        updated_at: '15/03/2020',
      },
    ],
  },
];
