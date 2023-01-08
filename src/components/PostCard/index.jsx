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

    function clickHeart() {}
    return (
        <div className=" mt-4 flex h-52 cursor-pointer flex-col rounded-lg border border-gray-300 p-3 px-3 py-2 text-left transition  hover:shadow-md  sm:h-64 sm:p-4 ">
            <div className="flex ">
                <div className="flex">
                    <button className="mr-2 mb-2 h-6 w-6 items-center justify-center overflow-hidden rounded-full ring-primary hover:ring-2">
                        <img
                            className="h-full w-full  items-center justify-center object-contain"
                            src={avatar.avatar}
                        />
                    </button>
                    <div className="mr-2 flex  cursor-pointer select-none  ">{post.creator.name}</div>
                </div>
                <div className="flex-grow select-none "></div>
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

            <span className="my-2 block cursor-pointer select-none  font-medium">{post.title}</span>
            <p
                title="This is the description for this task"
                className="description line-clamp-3 mb-2 h-full  text-slate-500 "
            >
                {post.content}
            </p>
            {/* <div className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 hover:shadow">
                <h2 className="font-bold">Tieu do bai post</h2>
                <p className="mt-1 text-sm leading-4 text-gray-600">
                    Fasdfasf dsaf sadf sadf dsaf sdfa sfdsa dfsa fas fsaf sa fsdf as fas fasfsaf as
                </p>
                <div className="mt-3 flex items-center justify-between">
                    <UserWithAvatarAndName avatar="https://picsum.photos/100/100" name="Nguyễn Vẫn A" />
                    <CategoryBadge>Lập trình</CategoryBadge>
                </div>
            </div> */}
            <div className="mb-2 flex w-full items-center    pt-4">
                <div className=" cursor-pointer select-none ">
                    <span className="invisible absolute block select-none py-1 pr-3 sm:visible sm:static">
                        <CategoryBadge>{post?.category.name}</CategoryBadge>
                    </span>
                    <path d="M4.5 12.75l6 6 9-13.5"></path>
                </div>

                {/* <div className="cursor-pointer items-center justify-center text-center align-middle text-xs  text-slate-500">
                    {post.map((tag) => (
                        <div key={tag._id}>#{tag.name}</div>
                    ))}
                </div>
                <div>{post.tag}</div> */}
                <div className="cursor-pointer select-none  items-center justify-center text-center align-middle text-xs  text-slate-500">
                    #{post.tag.name}
                </div>
            </div>
            <div className="mb-2 ml-2 flex w-full  select-none   pt-4">
                <button
                    title="unmark as important"
                    className={clsx('fa-sharp fa-solid fa-heart mr-1 text-gray-300 ', {
                        '  text-red-500': heart,
                    })}
                    onClick={() => {
                        if (heart) {
                            console.log('doi');
                            setHeart(false);
                        } else setHeart(true);
                    }}
                ></button>
                <div className="">{post.likes.length}</div>
                <button
                    title="unmark as important"
                    className="fa-regular fa-message mr-1 ml-6"
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
    );
}

export default PostCard;
