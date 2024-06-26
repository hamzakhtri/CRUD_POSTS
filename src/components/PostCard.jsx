import React from 'react';

const PostCard = ({ post, handleEdit, handleDelete }) => {
    return (
        <div className='border-2 border-gray-200 bg-gray-50  shadow-lg rounded-xl p-3 flex flex-col justify-between'>
            <div>
                <h3 className='text-[16px] font-medium my-3'>{post.title}</h3>
                <p className='text-[14px] my-3 leading-[1.4]'>{post.body}</p>
            </div>
            <div className="flex gap-4">
                {post.userId && <button onClick={() => handleEdit(post)} className='px-2 py-1 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 duration-300'>Edit</button>
                }
                <button onClick={() => handleDelete(post.id)} className='px-2 py-1 bg-red-500 text-white font-medium rounded-md shadow-md hover:bg-red-600 duration-300'>Delete</button>
            </div>
        </div>
    );
};

export default PostCard;
