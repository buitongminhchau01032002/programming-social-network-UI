// Layouts
import OnlyHeaderLayout from '../layouts/OnlyHeaderLayout';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import CreatePost from '../pages/CreatePost';
import Verify from '../pages/Verify';
import EditPost from '../pages/EditPost';
import CommentTemp from '../pages/CommentTemp';
import Profile from '../pages/Profile';

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
];

export { publicRoutes, privateRoutes };
