const COMMENTS = [
    {
        id: 1,
        content: 'Đây là một cái comment bất kì. Bên trong có thể có 1 comment bất kì khác',
        createdAt: '2023-01-23',
        parentComment: '',
        likes: [],
        author: {
            _id: '63bb9473e9456383e6c2f839',
            name: 'Minh Chau',
            avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
        },
        replies: [
            {
                id: 11,
                content: 'Đây là một cái comment bất kì. Bên trong có thể có 1 comment bất kì khác',
                createdAt: '2023-01-23',
                parentComment: 1,
                likes: [],
                author: {
                    _id: '63bb9473e9456383e6c2f839',
                    name: 'Minh Chau',
                    avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
                },
                replies: [
                    {
                        id: 111,
                        content: 'Đây là một cái comment bất kì. Bên trong có thể có 1 comment bất kì khác',
                        createdAt: '2023-01-23',
                        parentComment: '',
                        likes: [],
                        author: {
                            _id: '63bb9473e9456383e6c2f839',
                            name: 'Minh Chau',
                            avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
                        },
                        replies: [
                            {
                                id: 1111,
                                content: 'Đây là một cái comment bất kì. Bên trong có thể có 1 comment bất kì khác',
                                createdAt: '2023-01-23',
                                parentComment: 1,
                                likes: [],
                                author: {
                                    _id: '63bb9473e9456383e6c2f839',
                                    name: 'Minh Chau',
                                    avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
                                },
                                replies: [
                                    {
                                        id: 11111,
                                        content:
                                            'Đây là một cái comment bất kì. Bên trong có thể có 1 comment bất kì khác',
                                        createdAt: '2023-01-23',
                                        parentComment: 1,
                                        likes: [],
                                        author: {
                                            _id: '63bb9473e9456383e6c2f839',
                                            name: 'Minh Chau',
                                            avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
                                        },
                                        replies: [
                                            {
                                                id: 111111,
                                                content:
                                                    'Đây là một cái comment bất kì. Bên trong có thể có 1 comment bất kì khác',
                                                createdAt: '2023-01-23',
                                                parentComment: 1,
                                                likes: [],
                                                author: {
                                                    _id: '63bb9473e9456383e6c2f839',
                                                    name: 'Minh Chau',
                                                    avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
                                                },
                                                replies: [
                                                    {
                                                        id: 1111111,
                                                        content:
                                                            'Đây là một cái comment bất kì. Bên trong có thể có 1 comment bất kì khác',
                                                        createdAt: '2023-01-23',
                                                        parentComment: 1,
                                                        likes: [],
                                                        author: {
                                                            _id: '63bb9473e9456383e6c2f839',
                                                            name: 'Minh Chau',
                                                            avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
                                                        },
                                                        replies: [],
                                                    },
                                                ],
                                            },
                                            {
                                                id: 111112,
                                                content:
                                                    'Đây là một cái comment bất kì. Bên trong có thể có 1 comment bất kì khác',
                                                createdAt: '2023-01-23',
                                                parentComment: 1,
                                                likes: [],
                                                author: {
                                                    _id: '63bb9473e9456383e6c2f839',
                                                    name: 'Minh Chau',
                                                    avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
                                                },
                                                replies: [],
                                            },
                                        ],
                                    },
                                    {
                                        id: 11112,
                                        content:
                                            'Đây là một cái comment bất kì. Bên trong có thể có 1 comment bất kì khác',
                                        createdAt: '2023-01-23',
                                        parentComment: 1,
                                        likes: [],
                                        author: {
                                            _id: '63bb9473e9456383e6c2f839',
                                            name: 'Minh Chau',
                                            avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
                                        },
                                        replies: [],
                                    },
                                ],
                            },
                            {
                                id: 1112,
                                content: 'Đây là một cái comment bất kì. Bên trong có thể có 1 comment bất kì khác',
                                createdAt: '2023-01-23',
                                parentComment: 1,
                                likes: [],
                                author: {
                                    _id: '63bb9473e9456383e6c2f839',
                                    name: 'Minh Chau',
                                    avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
                                },
                                replies: [],
                            },
                        ],
                    },
                    {
                        id: 112,
                        content: 'Đây là một cái comment bất kì. Bên trong có thể có 1 comment bất kì khác',
                        createdAt: '2023-01-23',
                        parentComment: 1,
                        likes: [],
                        author: {
                            _id: '63bb9473e9456383e6c2f839',
                            name: 'Minh Chau',
                            avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
                        },
                        replies: [],
                    },
                ],
            },
            {
                id: 12,
                content: 'Đây là một cái comment bất kì. Bên trong có thể có 1 comment bất kì khác',
                createdAt: '2023-01-23',
                parentComment: 1,
                likes: [],
                author: {
                    _id: '63bb9473e9456383e6c2f839',
                    name: 'Minh Chau',
                    avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
                },
                replies: [],
            },
        ],
    },
    {
        id: 2,
        content: 'Đây là một cái comment bất kì. Bên trong có thể có 1 comment bất kì khác',
        createdAt: '2023-01-23',
        parentComment: 1,
        likes: [],
        author: {
            _id: '63bb9473e9456383e6c2f839',
            name: 'Minh Chau',
            avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
        },
        replies: [],
    },
];
export default COMMENTS;
