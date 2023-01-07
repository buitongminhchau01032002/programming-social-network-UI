function UserWithAvatarAndName({ avatar, name }) {
    return (
        <div className="flex items-center">
            <div className="h-6 w-6 overflow-hidden rounded-full">
                <img src={avatar} className="h-full w-full object-fill" />
            </div>
            <p className="ml-2 mb-0.5 text-sm font-medium">{name}</p>
        </div>
    );
}

export default UserWithAvatarAndName;
