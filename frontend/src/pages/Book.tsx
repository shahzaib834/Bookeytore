import { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleData } from '../api/GET';
import { Book } from '../interfaces/Book';

const Book = () => {
  let { id } = useParams();
  const [book, setBook] = useState<Book>({
    id: 0,
    title: '',
    description: '',
    rentFee: 0,
    status: '',
  });
  const defaultImage =
    'https://elements-cover-images-0.imgix.net/43a0f94b-abc5-4bc9-98c1-92f72cf03ec0?auto=compress%2Cformat&fit=max&w=1370&s=dfeda277333cef334b9cdddc8d98bcc9';

  const fetchData = async () => {
    const response = await getSingleData('books', id);
    setBook(response);
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='p-6'>
      <div className='flex p-6 gap-6 w-full mt-5'>
        <img src={defaultImage} className='h-96 rounded-lg ' />
        <div>
          <p className='text-4xl uppercase font-bold'>{book.title}</p>
          <p className='text-xl font-thin'>{book.description}</p>
          <p className='text-3xl'>{book.rentFee}$</p>
          <p className='text-2xl'>author later</p>
          <p
            className={`text-2xl ${
              book.status === 'AVAILABLE' ? 'bg-green-900' : 'bg-red-900'
            } px-6 p-2 flex justify-center uppercase rounded-md mt-4`}
          >
            {book.status}
          </p>
        </div>
      </div>

      {/* Comments section */}
      <div className='flex flex-col mt-4'>
        <p className='uppercase text-3xl'>Comments</p>
        <div className='flex gap-5 mt-4'>
          <p className='text-xl'>Commenter</p>
          <p>-</p>
          <p className='text-lg'>This is the comment for testing</p>
        </div>
      </div>

      {/* Add Comment Section */}
      <div className='flex flex-col mt-4 gap-4'>
        <p className='text-3xl'>Add your comments here</p>
        <textarea
          maxLength={50}
          rows={6}
          className='p-4 text-black rounded-md bg-slate-100'
        ></textarea>
        <button className='self-end p-2 bg-purple-500 text-white rounded-md'>
          POST COMMENT
        </button>
      </div>
    </div>
  );
};

export default Book;
