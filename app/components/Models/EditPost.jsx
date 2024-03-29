import React, { useState } from 'react';
import Image from 'next/image'; // Import the Image component

const EditPost = ({ post, onSave, onClose }) => {
  const [editedPost, setEditedPost] = useState(post);

  const handleChange = (e) => {
    setEditedPost({
      ...editedPost,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onSave(editedPost);
  };

  return (
    <div className="fixed z-1 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 flex mb-11 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-fit h-fit rounded-xl p-3">
                
                  <Image
                    className="rounded-xl w-full h-full"
                    src={post.image}
                    alt="...."
                    width={300} 
                    height={200} 
                  />
                </div>
                <div className='mt-72'>
                  <textarea
                    className="w-full h-20 border border-gray-700 rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                    placeholder="Enter your post text..."
                    name="text"
                    value={editedPost.text}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSave}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-400 text-black font-medium text-blackfocus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Done
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
