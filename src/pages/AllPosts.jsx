import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/conf'
import { Container, PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        
    }, [])
    appwriteService.getPosts([]).then((posts)=> {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className='py-8 w-full'>
      <Container>
        <div>
            {posts.map((post)=>(
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
