// @ts-nocheck
import { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleData } from '../api/GET';
import { Member } from '../interfaces/Member';
import { postData } from '../api/POST';
import BookTile from '../components/BookTile';

const Member = () => {
  let { id } = useParams();
  const [member, setMember] = useState<Member | undefined>();
  const defaultImage =
    'https://elements-cover-images-0.imgix.net/43a0f94b-abc5-4bc9-98c1-92f72cf03ec0?auto=compress%2Cformat&fit=max&w=1370&s=dfeda277333cef334b9cdddc8d98bcc9';

  const fetchData = async () => {
    const response = await getSingleData('members', id);
    setMember(response);
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  const unRentBook = async (bookId: number) => {
    const response = await postData(`books/return-book/${bookId}/member/${id}`);

    if (response.success) {
      console.log('success');
    }

    fetchData();
  };

  return (
    <div className='p-6'>
      <div className='flex p-6 gap-6 w-full mt-5'>
        <img src={defaultImage} className='h-96 rounded-lg w-6/12' />
        <div>
          <p className='text-4xl uppercase font-bold'>{member?.name}</p>
          <p className='text-xl font-thin mt-5'>
            IS DEFAULTER - {member?.isDefaulter ? 'True' : 'False'}
          </p>
          <p className='text-xl font-thin'>
            MONTHLY SUBSCRIBED -{' '}
            {member?.isMonthlySubscribed ? 'True' : 'False'}
          </p>
        </div>
      </div>

      {/* RENT TO MEMBERS SECTION */}
      {member?.RentedBooks?.length ? (
        <div className='flex flex-col gap-3'>
          <p className='text-2xl mt-5'>This Member has the following books:</p>
          {member?.RentedBooks.map((book) => {
            return (
              <div className='flex justify-around mt-5'>
                <BookTile key={book.book.id} book={book.book} />
                <button
                  className='p-2 h-11 bg-red-500 self-center rounded-md text-slate-100'
                  onClick={() => unRentBook(book.book.id)}
                >
                  Cancel
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Member;
