const COMMENTS = [
    {
        id: 1,
        content: 'This comment',
        createdAt: '2020-01-01',
        post: '',
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
                content: 'This comment',
                createdAt: '2020-01-01',
                post: '',
                parentComment: 1,
                likes: [],
                author: {
                    _id: '63bb9473e9456383e6c2f839',
                    name: 'Minh Chau',
                    avatar: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg',
                },
                replies: [],
            },
            {
                id: 12,
                content: 'This comment',
                createdAt: '2020-01-01',
                post: '',
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
        content: 'This comment',
        createdAt: '2020-01-01',
        post: '',
        parentComment: '',
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
