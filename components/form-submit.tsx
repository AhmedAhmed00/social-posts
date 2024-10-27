'use client'

import { useFormStatus } from 'react-dom';

export default function FormSubmit(){ 
  const status = useFormStatus()
  
  if(status.pending){ 
    return <div>create</div>
  }
    
    return <>
    <button type="reset">Reset</button>
    <button disabled={status.pending}>{status.pending ? "loaad" : "Create Post"}</button>
    </>
}