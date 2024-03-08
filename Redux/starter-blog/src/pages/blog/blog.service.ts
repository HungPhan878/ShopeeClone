/* eslint-disable no-unreachable */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// components
import { Post } from 'types/blog.type'
import { CustomError } from 'utils/helper'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => 'posts',

      providesTags(result) {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
            {
              type: 'Posts' as const,
              id: 'LIST'
            }
          ]
          return final
        }

        return [{ type: 'Posts', id: 'LIST' }]
      }
    }),
    addPost: build.mutation<Post, Omit<Post, 'id'>>({
      query(body) {
        try {
          // throw Error('Hello! This Error')

          return {
            url: 'posts',
            method: 'POST',
            body
          }
        } catch (error: any) {
          throw new CustomError(error.message)
        }
      },

      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Posts', id: 'LIST' }])
    }),
    getPost: build.query<Post, string>({
      query: (id) => `posts/${id}`
    }),
    updatePost: build.mutation<Post, { id: string; body: Post }>({
      query: (data) => ({
        url: `posts/${data.id}`,
        method: 'PUT',
        body: data.body
      }),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts', id: data.id }])
    }),
    deletePost: build.mutation<{}, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => (error ? [] : [{ type: 'Posts', id }])
    })
  })
})

export const { useGetPostsQuery, useAddPostMutation, useGetPostQuery, useUpdatePostMutation, useDeletePostMutation } =
  blogApi
