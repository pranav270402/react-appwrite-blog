import React from 'react';
import appwriteService from '../appwrite/conf';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  // Use a default image if featuredImage is not provided
  const fileUrl = featuredImage 
    ? appwriteService.getFilePreview(featuredImage) 
    : 'https://via.placeholder.com/150'; // Placeholder URL

  return (
    <Link to={`/post/${$id}`}>
      <div className='bg-gray-200 w-full rounded-xl p-4'>
        <div className='w-full mb-4 justify-center'>
          <img 
            src={fileUrl} 
            alt={title} 
            className='rounded-lg' 
            onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Fallback if image fails to load
          />
        </div>
        <h2 className='text-xl font-bold'>
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
