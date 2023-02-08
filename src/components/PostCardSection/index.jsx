import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import { userActions } from '../../redux/slices/userSlice';
import translateTime from '../../utils/translateTime';
import Like from './Like';
import Save from './Save';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import CategoryBadge from '../CategoryBadge/CategoryBadge';
import UserWithAvatarAndName from '../UserWithAvatarAndName/UserWithAvatarAndName';
import { toast } from 'react-toastify';
import { Markup } from 'interweave';
const avatar = {
    avatar: 'https://picsum.photos/100/100',
};
function PostCartSection({ postInit, postId, full }) {
    translateTime(moment);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = useSelector(userSelector);

    const showNonLogin = () => toast.error('Hãy đăng nhập để thực hiện thao tác!');
    const showLikePost = () => toast.success('Bạn đã thả tim bài viết!');
    const showUnLikePost = () => toast.success('Bạn đã hủy thả tim bài viết!');
    const showSuccessNoti = () => toast.success('Chỉnh sửa bài đăng thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');

    const showSavePost = () => toast.success('Bạn đã lưu bài viết!');
    const showUnSavePost = () => toast.success('Bạn đã hủy lưu bài viết!');

    const showFollowCreator = () => toast.success('Bạn đã theo dõi người đăng viết!');
    const showUnFollowCreator = () => toast.success('Bạn đã  hủy theo dõi người đăng bài viết!');
    const [post, setPost] = useState([]);
    const [time, setTime] = useState(0);
    useEffect(() => {
        const timerID = setInterval(() => {
            setTime((time) => time + 1);
        }, 1000);
        return () => clearInterval(timerID);
    }, []);

    const [isOwner, isLiked, isSaved] = useMemo(() => {
        let isOwner = false;
        let isLiked = false;
        let isSaved = false;
        if (!user) {
            return [isOwner, isLiked, isSaved];
        }
        if (post.creator?._id === user?._id) {
            isOwner = true;
        }
        if (post.likes?.includes(user?._id)) {
            isLiked = true;
        }
        if (user.savedPosts?.includes(post?._id)) {
            isSaved = true;
        }

        return [isOwner, isLiked, isSaved];
    }, [post?.likes, user?.savedPosts]);
    const [numberLike, setNumberLike] = useState(post.likes?.length || 0);
    // const [liked, setLiked] = useState(isLiked);
    var liked = isLiked;
    // const [saved, setSaved] = useState(isSaved);
    var saved = isSaved;
    // console.log('re-render');

    useEffect(() => {
        if (postInit) {
            fetch(' http://localhost:8080/api/posts/' + postInit._id + '/view', {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + user?.token,
                },
            })
                .then((res) => res.json())
                .then((resJson) => {})
                .catch((error) => {
                    console.log(error);
                });
            console.log('view');

            setPost(postInit);
        } else getPost();
        setNumberLike(post.likes?.length);
    }, [post]);
    useEffect(() => {
        dispatch(
            userActions.update({
                savedPosts: user?.savedPosts || [],
            })
        );
    }, [post]);

    function getPost() {
        fetch('http://localhost:8080/api/posts/' + postId)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error) {
                    console.log(resJson.error);
                    setPost([]);
                    return;
                }
                setPost(resJson.post);
            })
            .catch((error) => {
                console.log('error', error);
                setPost([]);
            });
    }

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
            return true;
        }
    }

    function handleLike() {
        fetch(' http://localhost:8080/api/posts/' + post?._id + '/like', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + user?.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                showLikePost();
                liked = !liked;
            })
            .catch((error) => {
                console.log('deo Like');
                console.log(error);
            });
    }
    function handleUnLike() {
        fetch(' http://localhost:8080/api/posts/' + post?._id + '/unlike', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + user?.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                showUnLikePost();
                liked = !liked;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function handleToggleSave(isSaved) {
        console.log('isSaved: ', isSaved);
        if (!user) {
            showNonLogin();
            return false;
        } else if (isSaved) {
            handleSave();
            console.log('save');
            return true;
        } else {
            handleUnSave();
            return true;
        }
    }

    function handleSave() {
        fetch(' http://localhost:8080/api/posts/' + post?._id + '/save', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + user?.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                showSavePost();

                dispatch(
                    userActions.update({
                        savedPosts: resJson.updatedUser?.savedPosts || [],
                    })
                );
                saved = !saved;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function handleUnSave() {
        fetch(' http://localhost:8080/api/posts/' + post?._id + '/unsave', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + user?.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                showUnSavePost();
                saved = !saved;

                dispatch(
                    userActions.update({
                        savedPosts: resJson.updatedUser.savedPosts || [],
                    })
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className=" mt-4 flex h-full  cursor-pointer flex-col justify-between rounded-lg border border-gray-300 p-3 px-3 py-2 text-left transition  hover:shadow-md ">
            <div className="my-1 flex justify-between ">
                <div className="flex">
                    <UserWithAvatarAndName user={post?.creator} />
                </div>
                <div className="flex">
                    <div className="mr-2 flex cursor-pointer select-none  items-center justify-center ">
                        {moment(post?.createdAt).startOf('seconds').fromNow()}
                    </div>
                    <button
                        title=""
                        className="mr-2 grid place-items-center items-center justify-center transition hover:text-slate-600"
                    >
                        <Save isSaved={isSaved} onToggle={handleToggleSave} />
                    </button>
                    {isOwner ? (
                        <button
                            title=""
                            className="mr-2 grid place-items-center items-center justify-center transition hover:text-slate-600"
                            onClick={() => {
                                navigate('/edit-post/' + post._id);
                            }}
                        >
                            <i class=" fa-solid fa-pencil"></i>
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <Link to={'/comment/' + post?._id}>
                <h2
                    className={clsx('my-2 cursor-pointer select-none font-bold', {
                        'line-clamp-2 hover:line-clamp-none': full,
                    })}
                >
                    <Markup content={post?.title}></Markup>
                </h2>

                <p
                    title="This is the description for this task"
                    className={clsx('t-1 h-full text-sm leading-5  text-gray-600 ', {
                        'line-clamp-2 hover:line-clamp-none   ': full,
                    })}
                >
                    <Markup content={post?.content}></Markup>
                </p>
                {post.image ? (
                    <div className=" overflow-hidden ">
                        <img src={post.image} className="h-full w-full object-cover" />
                    </div>
                ) : (
                    <></>
                )}
            </Link>

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
                <Like isLiked={isLiked} numberOfLike={post.likes?.length || 0} onToggle={handleToggleLike} />
                <Link to={'/comment/' + post?._id}>
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
                        <p className="ml-1">{post.numComments || 0}</p>
                    </div>
                </Link>
                <div className="flex items-center">
                    <div>
                        <i class="fa-regular fa-eye ml-2"></i>
                    </div>
                    <p className="ml-1">{post.views?.length || 0}</p>
                </div>
            </div>
        </div>
    );
}

export default PostCartSection;
