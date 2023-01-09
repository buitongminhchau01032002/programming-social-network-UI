function UserWithAvatarAndName({ user }) {
    return (
        <div className="group flex items-center">
            <div className="h-6 w-6 overflow-hidden rounded-full">
                <img src={user?.avatar || 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg'} className="h-full w-full object-fill" />
            </div>
            <p className="ml-2 mb-0.5 text-sm font-medium group-hover:underline">{user?.name}</p>
        </div>
    );
}

export default UserWithAvatarAndName;
