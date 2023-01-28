import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import translateTime from '../../utils/translateTime';
import Like from './Like';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import CategoryBadge from '../CategoryBadge/CategoryBadge';
import UserWithAvatarAndName from '../UserWithAvatarAndName/UserWithAvatarAndName';
import { toast } from 'react-toastify';
import { Markup } from 'interweave';
const avatar = {
    avatar: 'https://picsum.photos/100/100',
};
function FullPostCard({ post }) {
    translateTime(moment);
    const user = useSelector(userSelector);
    const showNonLogin = () => toast.error('Hãy đăng nhập để thực hiện thao tác!');
    const showLikePost = () => toast.success('Bạn đã thả tim bài viết!');
    const showUnLikePost = () => toast.success('Bạn đã thả tim bài viết!');
    const showSuccessNoti = () => toast.success('Chỉnh sửa bài đăng thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');
    const [isOwner, isLiked] = useMemo(() => {
        let isOwner = false;
        let isLiked = false;
        if (!user) {
            return [isOwner, isLiked];
        }
        if (post._id === user._id) {
            isOwner = true;
        }
        if (post.likes?.includes(user._id)) {
            isLiked = true;
        }
        return [isOwner, isLiked];
    }, [user]);
    const [liked, setLiked] = useState(isLiked);

    const [numberLike, setNumberLike] = useState(post.likes?.length || 20);
    useEffect(() => {
        setNumberLike(post.likes?.length);
        console.log('a');
    }, [post.likes?.length]);
    function handleToggleLike(isLike) {
        console.log('isLike: ', isLike);
        if (!user) {
            showNonLogin();
            return false;
        } else if (isLike) {
            handleLike();
            return true;
        } else {
            handleUnLike();
            showUnLikePost();
            return true;
        }
    }

    function handleLike() {
        fetch(' http://localhost:8080/api/posts/' + post._id + '/like', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + user?.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                showLikePost();

                setLiked(!liked);
                setNumberLike(numberLike + 1);
            })
            .catch((error) => {
                console.log('deo Like');
                console.log(error);
            });
    }
    function handleUnLike() {
        fetch(' http://localhost:8080/api/posts/' + post._id + '/unlike', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + user?.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log('UnLike thanh cong');
                setLiked(!liked);
                setNumberLike(numberLike - 1);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className=" mt-4 flex h-full  cursor-pointer flex-col justify-between rounded-lg border border-gray-300 p-3 px-3 py-2 text-left transition  hover:shadow-md ">
            <div className="my-1 flex justify-between ">
                <div className="flex">
                    <button className="mr-2 mb-2 h-6 w-6 items-center justify-center overflow-hidden rounded-full ring-primary hover:ring-2">
                        <img
                            className="h-full w-full  items-center justify-center object-contain"
                            src={avatar?.avatar}
                        />
                    </button>
                    <div className="mr-2 flex  cursor-pointer select-none  hover:underline  ">
                        {post?.creator?.name}
                    </div>
                </div>
                <div className="flex">
                    <div className="mr-2 flex cursor-pointer select-none  items-center justify-center ">
                        {moment(post?.createdAt).startOf('seconds').fromNow()}
                    </div>
                    <button
                        title=""
                        className="mr-2 grid place-items-center items-center justify-center transition hover:text-slate-600"
                    >
                        <i className="fa-regular fa-bookmark"></i>
                    </button>
                    <button
                        title=""
                        className="mr-2 grid place-items-center items-center justify-center transition hover:text-slate-600"
                    >
                        <i className="fa fa-ellipsis-vertical"></i>
                    </button>
                </div>
            </div>
            <Link to={'/detailPost/' + post._id}>
                <h2 className="my-2 cursor-pointer select-none font-bold  ">
                    <Markup content={post?.title}></Markup>
                </h2>
            </Link>
            <p title="This is the description for this task" className="mt-1 h-full text-sm leading-5  text-gray-600  ">
                <Markup content={post?.content}></Markup>
            </p>

            <div className=" flex w-full items-center py-1   ">
                <div className=" cursor-pointer select-none ">
                    <span className="invisible absolute block select-none py-1 pr-3 sm:visible sm:static">
                        <CategoryBadge category={post?.category}></CategoryBadge>
                    </span>
                    <path d="M4.5 12.75l6 6 9-13.5"></path>
                </div>

                <div className="cursor-pointer  select-none items-center  justify-center text-center align-middle text-xs text-slate-500  hover:underline">
                    #{post?.tag?.name}
                </div>
            </div>
            <div className=" ml-2  flex w-full py-1">
                <Like like={liked} isLiked={isLiked} numberOfLike={numberLike || 0} onToggle={handleToggleLike} />
                <Link to={'/detailPost/' + post._id}>
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="ml-2 h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                            />
                        </svg>
                        <p className="ml-1">{post.comments?.length || 0}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default FullPostCard;
