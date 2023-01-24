import PostCard from '../../components/PostCard';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import { userActions } from '../../redux/slices/userSlice';
import clsx from 'clsx';
import UserWithAvatarAndName from '../../components/UserWithAvatarAndName/UserWithAvatarAndName';
import Like from './Like';
import COMMENTS from './temp';
import CommentCard from './CommentCard';
import ReplyDialog from './ReplyDialog';
import CreateCommentInPost from './CreateCommentInPost';

function CommentTemp() {
    const [commentReplaying, setCommentReplaying] = useState(null);

    function getCommentsJSX(comments, isRoots = true) {
        return (
            <div
                className={clsx({
                    'border-l border-primary pl-6': !isRoots,
                    'mt-6': isRoots,
                })}
            >
                {comments.map((comment, index) => {
                    return (
                        <div key={index} className="mt-1 pt-4">
                            <CommentCard comment={comment} onReplayClick={handleReplayClick} />
                            {comment.replies && comment.replies.length > 0 && getCommentsJSX(comment.replies, false)}
                        </div>
                    );
                })}
            </div>
        );
    }

    function handleReplayClick(comment) {
        setCommentReplaying(comment);
    }

    return (
        <>
            <div className="">
                <div className="border-b border-gray-400 py-5">POST CONTENT</div>

                {/* COMMENT GROUP */}
                <div className="py-4">
                    {/* CREATE COMMENT */}
                    <CreateCommentInPost />

                    {getCommentsJSX(COMMENTS)}
                </div>
            </div>
            {commentReplaying && (
                <ReplyDialog comment={commentReplaying} onClickOutside={() => setCommentReplaying(null)} />
            )}
        </>
    );
}

export default CommentTemp;
