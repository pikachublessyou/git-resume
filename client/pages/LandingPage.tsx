import React from 'react';
import { AuthComp } from '../components/AuthComp';
import { VerifyTestComp } from '../components/VerifyTestComp';
import { GetDataComp } from '../components/GetDataComp';

const LandingPage: React.FC = () => {
  return (
    // <div className="bg-black h-screen flex justify-center items-center">
    //   <h1 className="text-white">Hello, World!</h1>
    // </div>
    <div className="text-white" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <span style={{ fontSize: '3rem', marginLeft: '.5rem' }}>get</span><br />
        {/* <button className="btn">Authenticate with GitHub</button> */}
        <AuthComp />
        <span style={{ fontSize: '3rem', marginLeft: '.5rem', }}>get your résumé from</span>
        <br />
        <span style={{ fontSize: '3rem', marginLeft: '.5rem', display: 'block' }}>git</span>
        <br />
        <hr />
        <br />
        <VerifyTestComp />
        <br />
        < hr />
        <br />
        <GetDataComp />
      </div>
    </div>
  );
};

export default LandingPage;
