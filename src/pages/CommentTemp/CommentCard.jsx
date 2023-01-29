import moment from 'moment';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import UserWithAvatarAndName from '../../components/UserWithAvatarAndName/UserWithAvatarAndName';
import { userSelector } from '../../redux/selectors';
import translateTime from '../../utils/translateTime';
import Like from './Like';

/*
commnent = {
    _id: id,
    content: String,
    post: id,
    parentComment: id,
    author: user,
    likes: [user] 
}

 */

function CommentCard({ comment, onReplayClick }) {
    translateTime(moment);
    const user = useSelector(userSelector);
    const [isOwner, isLiked] = useMemo(() => {
        let isOwner = false;
        let isLiked = false;
        if (!user) {
            return [isOwner, isLiked];
        }
        if (comment.author._id === user._id) {
            isOwner = true;
        }
        if (comment.likes.includes(user._id)) {
            isLiked = true;
        }
        return [isOwner, isLiked];
    }, [user]);

    function handleToggleLike(isLike) {
        console.log('isLike: ', isLike);
        // handle call api like or unlike comment
    }
    return (
        <div className="group">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <UserWithAvatarAndName user={comment.author} />
                    <div className="ml-4 text-xs text-gray-600">{moment(comment.createdAt).fromNow()}</div>
                </div>
                <div className="flex items-center space-x-2">
                    {isOwner && (
                        <button className="text-gray-600 hover:text-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
                            </svg>
                        </button>
                    )}
                    <button className="text-gray-600 hover:text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="text-editor mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: comment.content }}></div>
            <div className="mt-1 flex items-center space-x-4">
                <Like isLiked={isLiked} numberOfLike={comment.like?.length || 0} onToggle={handleToggleLike} />
                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                    </svg>
                    <p className="ml-1">{comment.replies?.length || 0}</p>
                </div>

                <button
                    className="invisible flex h-6 items-center rounded-md bg-gray-100 px-3 text-sm hover:bg-gray-200 group-hover:visible"
                    onClick={() => onReplayClick(comment)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                        />
                    </svg>
                    <p className="ml-1">Trả lời</p>
                </button>
            </div>
        </div>
    );
}

export default CommentCard;
