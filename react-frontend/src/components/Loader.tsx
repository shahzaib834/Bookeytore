import { ColorRing } from 'react-loader-spinner';
import { FC } from 'react';

interface LoaderProps {
  visible: boolean;
}

const Loader: FC<LoaderProps> = ({ visible }) => {
  if (!visible) {
    return;
  }

  return (
    <div className='h-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
      {' '}
      <ColorRing
        visible={visible}
        height='80'
        width='80'
        ariaLabel='blocks-loading'
        wrapperStyle={{}}
        wrapperClass=''
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  );
};

export default Loader;
