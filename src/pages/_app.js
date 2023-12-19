import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <div className='max-w-[800px] mx-auto p-4'>
      <Component {...pageProps} />
    </div>
  )
}
