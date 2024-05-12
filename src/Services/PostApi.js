import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { errorToast } from '../shared/components/toast'
import { TagType } from '../shared/tagFile';

const errorModal = (error, arg) => {
    let errorMessage = "";
    switch (error.status) {
        case 404:
            errorMessage = "Error 404 not found";
            break;
        case 500:
            errorMessage = "Error 500 internal server error";
            break;
        case 401:
            errorMessage = "Error 401 unauthorized";
            break;
        case 400:
            errorMessage = "Error 400 bad request";
            break;
        case 417:
            errorMessage = error.data.value;
            break;
        default:
            errorMessage = `Something went wrong calling`;
            break;
    }
    errorToast(errorMessage);
}

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: TagType,
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => {
                return ({
                    url: "posts",
                    method: 'GET'
                })
            },
            providesTags: (result, error, arg) => {
                if (error) {
                    errorModal(error, arg);
                }
                return (arg.tag ? [arg.tag] : [])
            },
        }),
        getAllPostsById: builder.query({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'GET'
            }),
        }),
        getAllPostsByLimit: builder.query({
            query: (number) => ({
                url: `posts?_limit=${number}`,
                method: 'GET'
            }),
        }),
        addRecord: builder.mutation({
            query: (data) => {
                return ({
                    url: `posts`,
                    body: data.data,
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
            },
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    errorModal(error, arg);
                }
                return (arg.tag ? [arg.tag] : [])
            },
        }),
        updateRecord: builder.mutation({
            query: (data) => {
                return ({
                    url: `posts/${data.id}`,
                    body: data,
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
            },
        }),
        deleteRecord: builder.mutation({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE'
            }),
        }),
    }),
})


export const { useLazyGetAllPostsQuery, useGetAllPostsByIdQuery, useGetAllPostsByLimitQuery, useAddRecordMutation, useUpdateRecordMutation, useDeleteRecordMutation } = postApi


