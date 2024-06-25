import React from 'react';

const EditPostModal = ({ closeModal, handleInputChange, updatePost, editPost }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={editPost.title}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Enter post title..."
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="body" className="block text-gray-700 font-bold mb-2">Body</label>
                    <textarea
                        id="body"
                        name="body"
                        value={editPost.body}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 h-32 resize-none"
                        placeholder="Enter post content..."
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => updatePost(editPost.id, editPost)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPostModal;
