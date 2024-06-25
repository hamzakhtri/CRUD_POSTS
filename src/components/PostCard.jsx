import React from 'react';

const PostCard = ({ post, handleEdit, handleDelete }) => {
    return (
        <div className='border-2 border-gray-400 bg-gray-100 shadow-sm rounded-xl p-3'>
            <h3 className='text-[16px] font-medium my-3'>{post.title}</h3>
            <p className='text-[14px] my-3 leading-[1.4]'>{post.body}</p>
            <div className="flex gap-4">
                {post.userId && <button onClick={() => handleEdit(post)} className='px-2 py-1 bg-blue-500 text-white font-medium rounded-md shadow-md'>Edit</button>
                }
                <button onClick={() => handleDelete(post.id)} className='px-2 py-1 bg-red-500 text-white font-medium rounded-md shadow-md'>Delete</button>
            </div>
        </div>
    );
};

export default PostCard;
