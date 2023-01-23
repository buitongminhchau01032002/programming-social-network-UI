import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import UserWithAvatarAndName from '../../components/UserWithAvatarAndName/UserWithAvatarAndName';
import { userSelector } from '../../redux/selectors';
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

function CommentCard({ comment }) {
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
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <UserWithAvatarAndName user={comment.author} />
                    <div className="ml-4 text-xs text-gray-600">1 giờ trước</div>
                </div>
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
            </div>
            <p className="mt-2 text-gray-600">{comment.content}</p>
            <Like isLiked={isLiked} numberOfLike={comment.like?.length || 0} onToggle={handleToggleLike} />
        </div>
    );
}

export default CommentCard;
