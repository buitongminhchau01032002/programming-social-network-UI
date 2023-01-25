// Layouts
import OnlyHeaderLayout from '../layouts/OnlyHeaderLayout';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SampleLogin from '../pages/SampleLogin';
import CreatePost from '../pages/CreatePost';
import DetailPost from '../pages/DetailPost';
import Verify from '../pages/Verify';
import EditPost from '../pages/EditPost';
import CommentTemp from '../pages/CommentTemp';

// Public routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/detailPost/:id',
        component: DetailPost,
    },
    {
        path: '/comment/:id',
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
    {
        path: '/edit-post/:postId',
        component: EditPost,
        layout: OnlyHeaderLayout,
    },
];

export { publicRoutes, privateRoutes };
