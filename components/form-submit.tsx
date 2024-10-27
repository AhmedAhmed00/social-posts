'use client'

import { useFormStatus } from 'react-dom';

export default function FormSubmit(){ 
  const status = useFormStatus()
    return <>
    <button type="reset">Reset</button>
    <button disabled={status.pending}>{status.pending ? "Loaaaing ..." : "Create Post"}</button>
    </>
}