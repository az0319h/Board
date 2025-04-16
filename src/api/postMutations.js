import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewPost } from "./firebase";

export const useAddNewPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : addNewPost,
        onSuccess : (result) => {
            queryClient.invalidateQueries(['posts'])
        }
    })
}

