// Layouts
import OnlyHeaderLayout from '../layouts/OnlyHeaderLayout';
import CommentTemp from '../pages/CommentTemp';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SampleLogin from '../pages/SampleLogin';
import CreatePost from '../pages/CreatePost';
import DetailPost from '../pages/DetailPost';
import Verify from '../pages/Verify';

// Public routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/detailPost',
        component: DetailPost,
    },
    {
        path: '/comment',
        component: CommentTemp,
    },
    {
        path: '/login',
        component: Login,
        layout: OnlyHeaderLayout,
    },
    {
        path: '/signup',
        component: SignUp,
        layout: OnlyHeaderLayout,
    },
    {
        path: '/api/verification/:token',
        component: Verify,
        layout: OnlyHeaderLayout,
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
