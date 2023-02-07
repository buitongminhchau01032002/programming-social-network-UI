import clsx from 'clsx';
import { useState } from 'react';

function Save({ isSaved = false, onToggle }) {
    let save = isSaved;

    function handleToggle() {
        if (onToggle) {
            if (onToggle(!save) == true) save = !save;
        }
    }

    return (
        <div className="flex items-center">
            <div
                className={clsx('h-5 w-5 cursor-pointer pt-[1px] hover:text-primary', {
                    'text-primary': save,
                })}
                onClick={handleToggle}
            >
                {save ? (
                    <button
                        title=""
                        className="mr-2 grid place-items-center items-center justify-center text-red-400 transition"
                    >
                        <i className="fa-regular fa-bookmark to-red-500"></i>
                    </button>
                ) : (
                    <button title="" className="mr-2  grid place-items-center items-center justify-center  transition">
                        <i className="fa-regular fa-bookmark"></i>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Save;
