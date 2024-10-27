 'use client'
import { createPost } from "../actions";
import FormSubmit from "@/components/form-submit";
import { useFormState } from "react-dom";






export default function NewPostPage() {
  const [state, craetePostActoin]   = useFormState(createPost,{
    content:'',
    title:''
  })
  
  return (
    <>
      <h1>Create a new post</h1>
      <form action={craetePostActoin}>
   
        <p className="form-control">
          <p>{state?.title && state.title}</p>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          {state.content && state.content}
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
      </form>
    </>
  );
}
