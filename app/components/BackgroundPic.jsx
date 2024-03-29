import Image from 'next/image';
import React from 'react';

const BackgroundPic = () => (
  <div className="container">
    <div className="row">
      <div className="col">
        <div className="d-flex justify-content-center align-items-center" style={{
          height: '310px', 
          overflow: 'hidden', 
          backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v3/ye/r/YVr3E4VYzmE.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          }}>
          <Image src="https://static.cdninstagram.com/rsrc.php/v3/ye/r/YVr3E4VYzmE.png" layout="fill" alt='Threads background' objectFit="contain" />
        </div>
      </div>
    </div>
  </div>
);

export default BackgroundPic;
