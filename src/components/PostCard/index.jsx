import moment from 'moment';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
const avatar = {
    avatar: 'https://picsum.photos/100/100',
};
function PostCard({ post }) {
    const [heart, setHeart] = useState(false);
    function clickHeart() {}
    return (
        <div className=" mt-4 flex h-52 flex-col rounded-lg bg-slate-200 p-3 text-left transition hover:shadow-lg hover:shadow-slate-300  sm:h-64 sm:p-4 ">
            <div className="flex ">
                <button className="mr-2 mb-2 h-6 w-6 items-center justify-center overflow-hidden rounded-full ring-primary hover:ring-2">
                    <img className="h-full w-full items-center justify-center object-contain" src={avatar.avatar} />
                </button>
                <div className="mr-2 flex flex-grow">{post.creator.name}</div>
                <div className="mr-2 flex items-center justify-center ">
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

            <span className="block font-medium">{post.title}</span>
            <p
                title="This is the description for this task"
                className="description line-clamp-3 mb-2 h-full  text-slate-500 "
            >
                {post.content}
            </p>
            <div className="mb-2 ml-2 flex w-full border-t-2 border-dashed border-slate-200   pt-4">
                <div className="order-0 mr-4  rounded-full bg-emerald-200 font-medium text-emerald-800">
                    <span className="invisible absolute block select-none py-1 px-3 sm:visible sm:static">
                        {post?.category.name}
                    </span>
                    <path d="M4.5 12.75l6 6 9-13.5"></path>
                </div>
            </div>
            <div className="mb-2 ml-2 flex w-full border-t-2 border-dashed border-slate-200   pt-4">
                <button
                    title="unmark as important"
                    className={clsx('fa-sharp fa-solid fa-heart mr-1  ', {
                        '  text-red-500': heart,
                    })}
                    onClick={() => {
                        if (heart) {
                            console.log('doi');
                            setHeart(false);
                        } else setHeart(true);
                    }}
                ></button>
                <div>{post.content}</div>
                <button
                    title="unmark as important"
                    className={clsx(' fa-regular fa-message mr-1 ml-6 ', {
                        '  text-red-500': heart,
                    })}
                    onClick={() => {
                        if (heart) {
                            console.log('doi');
                            setHeart(false);
                        } else setHeart(true);
                    }}
                ></button>
                <div>{post.content}</div>
            </div>
        </div>
    );
}

export default PostCard;
