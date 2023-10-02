import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/redux/provider';
import store from '@/redux/store';
import { ToastContainer, toast } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    
      <html lang="en">
        <Providers>
        <body className={inter.className} style={{ backgroundColor:'#f0f0f0'}}>
            {children}
          <ToastContainer></ToastContainer>
          </body>
          
        </Providers>
      </html>
      
    
  )
}
