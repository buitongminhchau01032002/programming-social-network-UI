import clsx from 'clsx';
import { useState } from 'react';

function Follow({ isFollowed = false, onToggle }) {
    let follow = isFollowed;

    function handleToggle() {
        if (onToggle) {
            if (onToggle(!follow) == true) follow = !follow;
        }
    }

    return (
        <div className="flex items-center">
            <div
                className={clsx('ml-2 h-5 w-24 cursor-pointer pt-[1px] hover:text-primary', {
                    'text-primary': follow,
                })}
                onClick={handleToggle}
            >
                {follow ? (
                    <span className="text-xs text-blue-400">Đang theo dõi</span>
                ) : (
                    <span className="text-xs text-blue-700">Theo dõi</span>
                )}
            </div>
        </div>
    );
}

export default Follow;
