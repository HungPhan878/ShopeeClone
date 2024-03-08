// components
import { Fragment } from 'react'
import { useDispatch } from 'react-redux'

// components
import PostItem from '../PostItem'
import SkeletonPost from '../SkeletonPost'
import { useDeletePostMutation, useGetPostsQuery } from 'pages/blog/blog.service'
import { startEditPost } from 'pages/blog/blog.slice'

export default function PostList() {
  const { data, isFetching } = useGetPostsQuery()
  const [deletePost, deletePostResult] = useDeletePostMutation()
  const dispatch = useDispatch()

  // handler function
  const handleStartEditPost = (id: string) => {
    dispatch(startEditPost(id))
  }

  const handleDeletePost = (id: string) => {
    deletePost(id)
  }

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Rich Blog</h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            I never give up, i will do it to the end and succeed.
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {isFetching && (
            <Fragment>
              <SkeletonPost />
              <SkeletonPost />
            </Fragment>
          )}
          {!isFetching &&
            data?.map((post) => <PostItem key={post.id} data={post} handleStartEditPost={handleStartEditPost} handleDeletePost={handleDeletePost}/>)}
        </div>
      </div>
    </div>
  )
}
