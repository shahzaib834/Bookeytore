import { useEffect, useState } from 'react';
import RadioSection from '../components/RadioSection';
import { getData } from '../api/GET';
import { Book } from '../interfaces/Book';
import BookTile from '../components/BookTile';
import { Member } from '../interfaces/Member';
import MemberTile from '../components/MemberTile';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import useBookModal from '../hooks/useBookModal';
import useMemberModal from '../hooks/useMemberModal';
import BookModal from '../components/modals/BookModal';
import MemberModal from '../components/modals/MemberModal';
import Loader from '../components/Loader';
import useLoader from '../hooks/useLoader';

const Home = () => {
  const [data, setData] = useState([]);
  const [radioOption, setRadioOption] = useState('books');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const bookModal = useBookModal();
  const memberModal = useMemberModal();
  const loader = useLoader();

  const fetchData = async (type: string) => {
    loader.onOpen();
    const response = await getData(type, page);
    setData(response);

    if (response.length < 10) {
      setTotalPages(page);
    } else {
      setTotalPages(page + 1);
    }
    loader.onClose();
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
      <Loader visible={loader.isSpinning} />
      <BookModal refetchData={() => fetchData('books')} />
      <MemberModal refetchData={() => fetchData('members')} />
      <RadioSection radioOption={radioOption} onChange={onStateChange} />
      {/* Filters Here later */}

      <div className='flex gap-5 p-5 mt-5 rounded-md justify-center'>
        <button
          className='p-2 bg-purple-500 hover:bg-purple-700 text-white rounded-md'
          onClick={() => bookModal.onOpen()}
        >
          Create/Update Book
        </button>
        <button
          className='p-2 bg-purple-500 hover:bg-purple-700 text-white rounded-md'
          onClick={() => memberModal.onOpen()}
        >
          Create/Update Member
        </button>
      </div>

      {!data.length && (
        <div className='mt-5 flex justify-center items-center p-2 text-2xl w-full'>
          Nothing to show!
        </div>
      )}

      <div className='p-5 grid grid-col-1 sm:grip-col-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-4 gap-16'>
        {data.length &&
          (radioOption === 'books'
            ? data?.map((book: Book) => {
                return <BookTile key={book.id} book={book} />;
              })
            : data?.map((member: Member) => {
                return <MemberTile key={member.id} member={member} />;
              }))}
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
