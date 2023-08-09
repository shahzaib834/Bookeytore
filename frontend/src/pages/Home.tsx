import { useEffect, useState } from 'react';
import RadioSection from '../components/RadioSection';
import { getData } from '../api/GET';
import { Book } from '../interfaces/Book';
import BookTile from '../components/BookTile';
import { Member } from '../interfaces/Member';
import MemberTile from '../components/MemberTile';

const Home = () => {
  const [data, setData] = useState([]);
  const [radioOption, setRadioOption] = useState('books');
  const fetchData = async (type: string) => {
    const response = await getData(type);
    setData(response);
    console.log(response)
  };

  useEffect(() => {
    fetchData('books');
  }, []);

  const onStateChange = (e: any) => {
    setRadioOption(e.target.value);
    fetchData(e.target.value);
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
    </div>
  );
};

export default Home;
