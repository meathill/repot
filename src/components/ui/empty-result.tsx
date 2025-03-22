import React from 'react';
import empty from '@/assets/images/empty.svg';
import Image from 'next/image';

const EmptySearchResult: React.FC = () => {
  return (
    <div className='flex justify-center items-center my-16'>
      <Image src={empty} alt="empty" width={51} height={48} />
      <p className='ml-6 font-nunito font-bold text-4xl leading-6 tracking-normal text-center capitalize'>Nothing Here</p>
    </div>
  );
};

export default EmptySearchResult;
