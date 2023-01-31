// Layouts
import OnlyHeaderLayout from '../layouts/OnlyHeaderLayout';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPass from '../pages/ResetPass';
import SignUp from '../pages/SignUp';
import CreatePost from '../pages/CreatePost';
import Verify from '../pages/Verify';
import EditPost from '../pages/EditPost';
import CommentTemp from '../pages/CommentTemp';
import Profile from '../pages/Profile';
import ManageMember from '../pages/ManageMember';

// Public routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
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
        path: '/forgot-password',
        component: ForgotPassword,
        layout: OnlyHeaderLayout,
    },
    {
        path: '/reset-password/:token',
        component: ResetPass,
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
        path: '/profile/:id',
        component: Profile,
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
    {
        path: '/manage-member',
        component: ManageMember,
        layout: OnlyHeaderLayout,
    },
];

export { publicRoutes, privateRoutes };
