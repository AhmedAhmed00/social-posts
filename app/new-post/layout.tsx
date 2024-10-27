import { Metadata } from 'next';
import { ReactNode } from 'react';
export const metadata:Metadata ={ 
    title :"Add Post Page"
}

export default function layout({children} :{children:ReactNode}) {
  return (
    <div>{children}</div>
  )
}
