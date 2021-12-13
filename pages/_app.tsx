import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav className='border-b p-6'>
        <p className='text-4xl font-bold'>Metaverse Marketplace</p>
        <div className='flex mt-4'>
          <Link href='/'>
            <a href='' className='mr-4 text-pink-500'>
              Sell Digital Asset
            </a>
          </Link>
          <Link href='/create-item'>
            <a href='' className='mr-6 text-pink-500'>
              Create Digital Asset
            </a>
          </Link>
          <Link href='/my-assets'>
            <a href='' className='mr-4 text-pink-500'>
              View Digital Asset
            </a>
          </Link>
          <Link href='/creator-dashboard'>
            <a href='' className='mr-4 text-pink-500'>
              Creator Dashboard
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
