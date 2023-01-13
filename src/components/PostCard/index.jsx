import moment from 'moment';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import CategoryBadge from '../CategoryBadge/CategoryBadge';
import UserWithAvatarAndName from '../UserWithAvatarAndName/UserWithAvatarAndName';
const avatar = {
    avatar: 'https://picsum.photos/100/100',
};
function PostCard({ post }) {
    const [heart, setHeart] = useState(false);
    const [tags, setTags] = useState([post.tag]);

    return (
        <div className=" mt-4 flex h-full  cursor-pointer flex-col justify-between rounded-lg border border-gray-300 p-3 px-3 py-2 text-left transition  hover:shadow-md ">
            <div className="my-1 flex justify-between ">
                <div className="flex">
                    <button className="mr-2 mb-2 h-6 w-6 items-center justify-center overflow-hidden rounded-full ring-primary hover:ring-2">
                        <img
                            className="h-full w-full  items-center justify-center object-contain"
                            src={avatar.avatar}
                        />
                    </button>
                    <div className="mr-2 flex  cursor-pointer select-none  hover:underline  ">{post.creator.name}</div>
                </div>
                <div className="flex">
                    <div className="mr-2 flex cursor-pointer select-none  items-center justify-center ">
                        {moment.utc(post.createdAt).locale('vi').startOf('seconds').fromNow()}
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

            <h2 className="my-2 cursor-pointer select-none font-bold line-clamp-2 hover:line-clamp-none ">
                {post.title} Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề
                dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu
                đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài Tiêu đề dài
                Tiêu đề dài{' '}
            </h2>
            <p
                title="This is the description for this task"
                className="mt-1 h-full text-sm leading-5  text-gray-600 line-clamp-5 hover:line-clamp-none "
            >
                {post.content}
                Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài
                Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài
                Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài
                Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài
                Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài
                Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài
                Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài
                Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài Nội dung dài{' '}
            </p>

            <div className=" flex w-full items-center py-1   ">
                <div className=" cursor-pointer select-none ">
                    <span className="invisible absolute block select-none py-1 pr-3 sm:visible sm:static">
                        <CategoryBadge category={post?.category}></CategoryBadge>
                    </span>
                    <path d="M4.5 12.75l6 6 9-13.5"></path>
                </div>

                <div className="cursor-pointer  select-none items-center  justify-center text-center align-middle text-xs text-slate-500  hover:underline">
                    #{post.tag.name}
                </div>
            </div>
            <div className=" ml-2  flex w-full py-1">
                <div className="flex px-1 hover:bg-slate-100 hover:underline">
                    <button
                        title="unmark as important"
                        className={clsx('fa-sharp fa-solid fa-heart mr-1  ', {
                            '  text-red-500': heart,
                            '  text-gray-300': !heart,
                        })}
                        onClick={() => {
                            if (heart) {
                                console.log('doi');
                                setHeart(false);
                            } else setHeart(true);
                        }}
                    ></button>
                    <div className="">{post.likes.length}</div>
                </div>
                <div className="ml-4 flex px-1 hover:bg-slate-100 hover:underline">
                    <button
                        title="unmark as important"
                        className="fa-regular fa-message mr-1 "
                        onClick={() => {
                            if (heart) {
                                console.log('doi');
                                setHeart(false);
                            } else setHeart(true);
                        }}
                    ></button>
                    <div>{post.comments.length}</div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
