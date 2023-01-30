import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/slices/userSlice';

function FollowButton({ user, currentUser, isOwner }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    function isFollowing() {
        if (!user || !currentUser) {
            return false;
        }
        const indexFollowing = currentUser.following.findIndex((fl) => fl === user._id);
        if (indexFollowing !== -1) {
            return true;
        }
        return false;
    }

    function handleToggleFollow() {
        setLoading(true);
        fetch(`http://localhost:8080/api/users/${user._id}/follow`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + currentUser?.token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    return;
                }
                dispatch(
                    userActions.update({
                        following: data.user.following || [],
                    })
                );
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div
            className={clsx({
                '!hidden': isOwner || !currentUser,
            })}
        >
            <button
                className={clsx(
                    'flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark',
                    {
                        '!hidden': isFollowing(),
                        'pointer-events-none opacity-50': loading,
                    }
                )}
                onClick={handleToggleFollow}
            >
                Theo dõi
            </button>
            <button
                className={clsx(
                    'flex h-9 min-w-[120px] items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary/10',
                    {
                        '!hidden': !isFollowing(),
                        'pointer-events-none opacity-50': loading,
                    }
                )}
                onClick={handleToggleFollow}
            >
                Bỏ theo dõi
            </button>
        </div>
    );
}

export default FollowButton;
