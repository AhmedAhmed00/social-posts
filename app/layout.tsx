import Header from '@/components/header';
import './globals.css';
import { ReactNode } from 'react';



type LayoutProps ={ 
  children:ReactNode
}

export default function RootLayout({ children }:LayoutProps) {  
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
