import { useEffect, useState } from 'react';
import RadioSection from '../components/RadioSection';
import { getData } from '../api/GET';
import { Book } from '../interfaces/Book';
import BookTile from '../components/BookTile';
import { Member } from '../interfaces/Member';
import MemberTile from '../components/MemberTile';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

const Home = () => {
  const [data, setData] = useState([]);
  const [radioOption, setRadioOption] = useState('books');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (type: string) => {
    const response = await getData(type, page);
    setData(response);

    if (response.length < 10) {
      setTotalPages(page);
    } else {
      setTotalPages(page + 1);
    }
  };

  useEffect(() => {
    fetchData(radioOption);
  }, [page]);

  const onStateChange = (e: any) => {
    setRadioOption(e.target.value);
    fetchData(e.target.value);
  };

  const onNextClick = () => {
    setPage(page + 1);
  };

  const onPrevClick = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <RadioSection radioOption={radioOption} onChange={onStateChange} />
      {/* Filters Here later */}

      <div className='p-5 grid grid-col-1 sm:grip-col-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-4 gap-16'>
        {radioOption === 'books'
          ? data &&
            data.map((book: Book) => {
              return <BookTile key={book.id} book={book} />;
            })
          : data.map((member: Member) => {
              return <MemberTile key={member.id} member={member} />;
            })}
      </div>

      <div className='flex justify-end gap-6 mt-2 p-6'>
        <div
          className={`flex justify-center items-center gap-1 ${
            page === 1 ? 'pointer-events-none opacity-60' : 'cursor-pointer'
          }`}
          onClick={onPrevClick}
        >
          <AiOutlineArrowLeft className='text-red-500' size={25} /> <p>Prev</p>
        </div>
        <div
          className={`flex justify-center items-center gap-1 cursor-pointer ${
            page >= totalPages
              ? 'pointer-events-none opacity-60'
              : 'cursor-pointer'
          }`}
          onClick={onNextClick}
        >
          <p>Next</p>
          <AiOutlineArrowRight className='text-red-500' size={25} />
        </div>
      </div>
    </div>
  );
};

export default Home;
