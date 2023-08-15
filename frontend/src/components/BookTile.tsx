import React from 'react';
import { Book } from '../interfaces/Book';
import { useNavigate } from 'react-router-dom';

interface BookTileProps {
  book: Book;
}

const BookTile: React.FC<BookTileProps> = ({ book }) => {
  const defaultImage =
    'https://elements-cover-images-0.imgix.net/43a0f94b-abc5-4bc9-98c1-92f72cf03ec0?auto=compress%2Cformat&fit=max&w=1370&s=dfeda277333cef334b9cdddc8d98bcc9';

  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div
      className='flex flex-col justify-center gap-2 border border-slate-500 p-2 rounded-md cursor-pointer'
      onClick={handleBookClick}
    >
      <img src={defaultImage} className='h-52 w-full rounded-lg ' />
      <div className='flex flex-col gap-1'>
        <p>
          Title: <span>{book.title}</span>
        </p>
        <p>
          Author: <span>author later</span>
        </p>
        <p>
          Rent: <span>{book.rentFee}$</span>
        </p>
      </div>
    </div>
  );
};

export default BookTile;
