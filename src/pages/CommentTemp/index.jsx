import FullPostCard from '../../components/FullPostCard';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
    const [comments, setComments] = useState([]);

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

    const { id } = useParams();
    const [post, setPost] = useState({});
    const user = useSelector(userSelector);
    useEffect(() => {
        getPost();
        getComments();
    }, []);

    function getPost() {
        fetch('http://localhost:8080/api/posts/' + id)
            .then((res) => res.json())
            .then((resJson) => {
                setPost(resJson.post);
            })
            .catch((error) => console.log('error', error));
    }

    function getComments() {
        fetch('http://localhost:8080/api/comment/' + id)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error) {
                    console.log(resJson.error);
                    setComments([]);
                    return;
                }
                setComments(resJson.comments);
            })
            .catch((error) => {
                console.log('error', error);
                setComments([]);
            });
    }

    return (
        <>
            <div className="">
                <div className="border-b border-gray-400 py-5">
                    <FullPostCard post={post} />
                </div>

                {/* COMMENT GROUP */}
                <div className="py-4">
                    {/* CREATE COMMENT */}
                    <CreateCommentInPost postId={id} onCreatedComment={getComments} />

                    {getCommentsJSX(comments)}
                </div>
            </div>
            {commentReplaying && (
                <ReplyDialog comment={commentReplaying} onClickOutside={() => setCommentReplaying(null)} />
            )}
        </>
    );
}

export default CommentTemp;
