import React, { useState, useEffect } from 'react';

import { NavigationMenu } from '../components/ui/NavBar';
import { Button } from '../components/ui/get-started-button';
import { WobbleCard } from '../components/ui/wobble-card';
import { WobbleCardDemo } from '../components/ui/key-features';

const ghClientId = process.env.REACT_APP_GH_CLIENT_ID;

// import { HoverBorderGradientButton } from '../components/ui/get-started-button-v2';

const LandingPage: React.FC = () => {
  let authWindow: Window | null;
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const authVerify = async (): Promise<boolean> => {
    const response = await fetch('/api/auth/verify');
    const data = await response.json();

    setAuthorized(data.success);

    if (!data.success) {
      console.log('authorization: ❌');
      return false;
    }
    console.log('authorization: ✅');

    return true;

  };


  useEffect(() => {
    const verifyAuth = async () => {
      await authVerify();
      setLoading(false);
    };

    verifyAuth();
  }, []);

  const handleClickTopRightButton = async (): Promise<void> => {
    const authorized = await authVerify();
    console.log('LandingPage: authorized', authorized);
    if (authorized) {
      window.location.href = '/RepoDisplay';
      return;
    }

    const response = await fetch('/api/auth/signin');
    const data = await response.json();

    setAuthorized(data.success);

    if (!data.success) {
      console.log('authC: No token present. Redirecting to github signin...');
      const redirectURI = `https://github.com/login/oauth/authorize?client_id=${ghClientId}&scope=repo`;
      // now always opens in a new tab
      authWindow = window.open(redirectURI, '_blank');

      return;
    }

    console.log('Token exists');
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleMessage = (event: MessageEvent) => {
    if (typeof event.data === 'string') {
      console.log('LandingPage: message', event);
      // Could be 'success' or 'failure'
      if (event.data === 'success') {
        console.log('LandingPage: success');
        setTimeout(() => {
          // momentarily delaying the redirect so the user can see the homepage again after the auth window is closed
          window.location.href = '/RepoDisplay';

        }, 250);

      } else {
        console.error('LandingPage: An error occurred in listening to the message event', event.data);
      }
    }
  };


  return (
    <div className="bg-blackGR min-h-screen flex flex-col">
      {/* Fixed header section */}
      <header className='py-8 px-14 w-full flex items-center justify-between absolute top-0 left-0 z-10'>
        <a href='/'><img src='/assets/images/gitResume.png' alt='logo' className="h-auto" /></a>
        {/* centering the nav bar */}
        <div className='flex-grow flex justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <NavigationMenu />
        </div>
        <Button
          variant='default'
          onClick={handleClickTopRightButton}>
          {authorized ? 'Your Repos' : 'Sign Up / Sign In'}
        </Button>
      </header>

      {/* Main content section */}
      {/* <main className='flex-grow flex flex-col items-center justify-center w-full pt-32 px-4'>

      </main> */}
      <main className='flex-grow flex flex-col items-center w-full pt-40 px-4 font-sans'>
        <div className='flex flex-col items-start justify-start'>
          <h1 className="text-greenGR z-20 relative text-6xl py-3">get</h1>
          <div className='z-20 relative py-3'>
            <button className="btn" style={{ fontSize: '6rem'}}>
              gitResume
            </button>
            <span className='ml-3 text-blueGR z-20 relative text-6xl py-3'>to</span>
          </div>
          <div>
            <span className='text-greenGR z-20 relative text-6xl py-3'>get </span>
            <span className='text-blueGR z-20 relative text-6xl py-3'>your resume from</span>
          </div>
          <h4 className='text-greenGR z-20 relative text-6xl py-3'>git</h4>
        </div>
        <br/>
        <br/>
        <img src='/assets/images/Asterisk.png' alt='asterisk' className='w-auto h-auto' />
        <h1 className="text-blueGR z-20 relative text-5xl py-1 text-center font-sans">Generate resume bullet points</h1>
        <h2 className='text-blueGR z-20 relative text-5xl py-1 text-center font-sans'>from your git commit history,</h2>
        <h3 className='text-greenGR z-20 relative text-5xl py-1 text-center font-sans'>in just a few clicks.</h3>
        <p className='text-white z-20 relative text-lg py-6 text-center font-sans'>
          No more wading back through your code or sparsely worded <br className="hidden md:block" />
          commit messages trying to rediscover the specifics of what you <br className="hidden md:block" />
          accomplished - that's done for you, with any authorized repo.
        </p>
      </main>

      {/* Secondary content section */}
      <section className='w-full flex flex-col items-center mt-10 px-4'>
        <h1 className='text-lavenderGR z-20 relative top-0 right-1/3 pb-12 pr-20 text-4xl py-1 text-center font-grotesk'> Key Features</h1>
        <div className='w-full max-w-6xl pb-12'>
          <WobbleCardDemo />
        </div>
      </section>

      {/* Footer section */}
      <footer className='w-full flex flex-col md:flex-row justify-between items-center p-6 bg-blackGR mt-auto'>
        <div className='flex flex-col items-center md:items-start mb-4 md:mb-0'>
          <img src='/assets/images/gitResume.png' alt='logo' className='mb-2 h-auto' />
          <h1 className='text-white text-lg text-center md:text-left'>© 2024 gitResume. All Rights Reserved.</h1>
        </div>
        <div className='text-greenGR text-md text-center md:text-left'>
          <h1 className="py-1">About Us</h1>
          <h1 className="py-1">Application</h1>
          <h1 className="py-1">Pricing</h1>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
