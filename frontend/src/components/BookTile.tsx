import React from 'react';
import { Book } from '../interfaces/Book';

interface BookTileProps {
  book: Book;
}
//default image - https://upittpress.org/wp-content/themes/pittspress/images/no_cover_available.png

const BookTile: React.FC<BookTileProps> = ({ book }) => {
  return (
    <div className='flex flex-col justify-center gap-2 border border-slate-500 p-2 rounded-md cursor-pointer'>
      <img
        src='https://upittpress.org/wp-content/themes/pittspress/images/no_cover_available.png'
        className='h-52 w-full rounded-lg '
      />
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
