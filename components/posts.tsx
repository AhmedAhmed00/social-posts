'use client'
import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { useOptimistic } from 'react';
import { triggerLikePost } from '@/app/actions';
import Image from 'next/image';

export interface Ipost { 
  title:string
  id:number;
  userFirstName:string
  image:string;
  createdAt:string
  content:string
  isLiked:boolean
  likes:number
}






type PostProps = { 
  post : Ipost
  updatePost:(id:number) => void
}

type ImageLoaderProps = {
  src: string;        // The path of the image
  width: number;      // Desired width of the image
  quality?: number;   // Quality of the image (optional)
}
 


// image loader funciton to create an effect on the images before display it 
// image loader accept config whic is object contains src and quality and width 
// we return a new string from this image loader and this src will contains the new image 


function imageLoader(config: ImageLoaderProps ):string{ 
  const urlS = config.src.split('upload/')[0] // url before upload
  const transformation = `c_thumb,g_face,h_200,w_200/r_max/f_auto` // the transformation between them
  const urlE  = config.src.split('upload/')[1] // url after upload 
  return `${urlS}upload/${transformation}/${urlE}`
}


function Post({ post , updatePost }:PostProps ) {
  return (
    <article className="post">
      <div className="post-image">
        <Image loader={imageLoader} quality={30} width={50} height={50} src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>

            <form className= {post.isLiked ? "liked" :""}  action={updatePost.bind(null,post.id )}>
            <LikeButton />              
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

interface Iposts {
  posts : Ipost[]
}

export default function Posts({ posts }:Iposts) {
  // Like post works as action
  
  
  
  
   const [optimisticPosts , optlikePost] = useOptimistic(posts ,(prevState , id) => {
    const updatadPostIndex = prevState.findIndex(post => post.id === id) 
    const updatedPost = {...prevState[updatadPostIndex] }
  updatedPost.likes = updatedPost.isLiked ? updatedPost.likes - 1 : updatedPost.likes + 1;
 updatedPost.isLiked = !updatedPost.isLiked;
    const newPosts = [...prevState]
    newPosts[updatadPostIndex] = updatedPost;
    return newPosts
   } )
   
   
  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  
  async function updatePost(id:number){ 
    optlikePost(id)
    await triggerLikePost(id)
  }
  
  
  
  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post updatePost={updatePost}  post={post} />
        </li>
      ))}
    </ul>
  );
}
