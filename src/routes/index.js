// Layouts
import OnlyHeaderLayout from '../layouts/OnlyHeaderLayout';
import CommentTemp from '../pages/CommentTemp';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import SampleLogin from '../pages/SampleLogin';
import CreatePost from '../pages/CreatePost';

// Public routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/comment',
        component: CommentTemp,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/sample-login',
        component: SampleLogin,
        layout: OnlyHeaderLayout,
    },
];

const privateRoutes = [
    {
        path: '/create-post',
        component: CreatePost,
        layout: OnlyHeaderLayout,
    },
];

export { publicRoutes, privateRoutes };
