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

function CommentTemp() {
    const user = useSelector(userSelector);

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
                            <CommentCard comment={comment} />
                            {comment.replies && comment.replies.length > 0 && getCommentsJSX(comment.replies, false)}
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="">
            <div className="border-b py-3">Thanh tab</div>
            <div className="border-b border-gray-400 py-5">POST CONTENT</div>

            {/* COMMENT GROUP */}
            <div className="py-4">
                {/* CREATE COMMENT */}
                {user ? (
                    <div className="flex items-center">
                        <div className="h-9 w-9 overflow-hidden rounded-full">
                            <img src={user?.avatar} className="h-full w-full object-cover" />
                        </div>
                        <input
                            type="text"
                            className="ml-4 h-9 flex-1 rounded-md border border-gray-400 px-3 hover:border-gray-500 focus:!border-primary"
                            placeholder="Viết bình luận ..."
                        />
                    </div>
                ) : (
                    <div>Đăng nhập để viêt bình luận</div>
                )}

                {/* LIST COMMENT */}
                <div className="mt-6 hidden">
                    {/* GROUP 1 */}
                    <div className="mt-1 pt-4">
                        {/* MAIN 1 */}
                        <div>
                            <div className="flex items-center">
                                <UserWithAvatarAndName user={{ name: 'Trần Văn B' }} />
                                <div className="ml-4 text-xs text-gray-600">1 giờ trước</div>
                            </div>
                            <p className="mt-2 text-gray-600">
                                Chú thích (comment) trong mã nguồn giúp cho các đoạn code của bạn chở nên dễ hiểu hơn.
                            </p>
                            <div className="mt-2">
                                <Like />
                            </div>
                        </div>

                        {/* REPLIES 1 */}
                        <div className="border-l border-primary pl-6">
                            {/* GROUP 1.1 */}
                            <div className="mt-1 pt-4">
                                {/* MAIN 1.1 */}
                                <div>
                                    <div className="flex items-center">
                                        <UserWithAvatarAndName user={{ name: 'Trần Văn B' }} />
                                        <div className="ml-4 text-xs text-gray-600">1 giờ trước</div>
                                    </div>
                                    <p className="mt-2 text-gray-600">
                                        Chú thích (comment) trong mã nguồn giúp cho các đoạn code của bạn chở nên dễ
                                        hiểu hơn.
                                    </p>
                                </div>

                                {/* REPLIES 1.1 */}
                                <div className="border-l border-primary pl-6">
                                    {/* GROUP 1.1.1 */}
                                    <div className="mt-1 pt-4">
                                        {/* MAIN 1.1.1 */}
                                        <div>
                                            <div className="flex items-center">
                                                <UserWithAvatarAndName user={{ name: 'Trần Văn B' }} />
                                                <div className="ml-4 text-xs text-gray-600">1 giờ trước</div>
                                            </div>
                                            <p className="mt-2 text-gray-600">
                                                Chú thích (comment) trong mã nguồn giúp cho các đoạn code của bạn chở
                                                nên dễ hiểu hơn.
                                            </p>
                                        </div>

                                        {/* REPLIES 1.1.1 */}
                                    </div>
                                </div>
                            </div>

                            {/* GROUP 1.2 */}
                            <div className="mt-1 pt-4">
                                {/* MAIN 1.2 */}
                                <div>
                                    <div className="flex items-center">
                                        <UserWithAvatarAndName user={{ name: 'Trần Văn B' }} />
                                        <div className="ml-4 text-xs text-gray-600">1 giờ trước</div>
                                    </div>
                                    <p className="mt-2 text-gray-600">
                                        Chú thích (comment) trong mã nguồn giúp cho các đoạn code của bạn chở nên dễ
                                        hiểu hơn.
                                    </p>
                                </div>

                                {/* REPLIES 1.2 */}
                            </div>
                        </div>
                    </div>

                    {/* GROUP 2 */}
                    <div className="mt-1 pt-4">
                        {/* MAIN 2 */}
                        <div>
                            <div className="flex items-center">
                                <UserWithAvatarAndName user={{ name: 'Trần Văn B' }} />
                                <div className="ml-4 text-xs text-gray-600">1 giờ trước</div>
                            </div>
                            <p className="mt-2 text-gray-600">
                                Chú thích (comment) trong mã nguồn giúp cho các đoạn code của bạn chở nên dễ hiểu hơn.
                            </p>
                        </div>

                        {/* REPLIES 2 */}
                    </div>

                    {/* GROUP 3 */}
                    <div className="mt-1 pt-4">
                        {/* MAIN 2 */}
                        <div>
                            <div className="flex items-center">
                                <UserWithAvatarAndName user={{ name: 'Trần Văn B' }} />
                                <div className="ml-4 text-xs text-gray-600">1 giờ trước</div>
                            </div>
                            <p className="mt-2 text-gray-600">
                                Chú thích (comment) trong mã nguồn giúp cho các đoạn code của bạn chở nên dễ hiểu hơn.
                            </p>
                        </div>

                        {/* REPLIES 3 */}
                    </div>
                </div>

                {getCommentsJSX(COMMENTS)}
            </div>
        </div>
    );
}

export default CommentTemp;
