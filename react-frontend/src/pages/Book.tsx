// @ts-nocheck
import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData, getSingleData } from '../api/GET';
import { Book } from '../interfaces/Book';
import useUserAuth from '../hooks/useUserAuth';
import { postData } from '../api/POST';
import moment from 'moment';
import MemberTile from '../components/MemberTile';
import useLoader from '../hooks/useLoader';
import Select from 'react-select';
import useDebounce from '../hooks/useDebounce';
import Swal from 'sweetalert2';

interface Comment {
  id: number;
  comment: string;
  memberId: number;
  username: string;
  dateTime: string;
}

const Book = () => {
  let { id } = useParams();
  const userAuth = useUserAuth();
  const [comment, setComment] = useState('');
  const [bookComments, setBookComments] = useState([]);
  const [book, setBook] = useState<Book | undefined>();
  const [memberOptions, setMemberOptions] = useState([]);
  const [selectedMember, setSelectedMember] = useState({
    value: '',
    label: '',
  });
  const [filter, setFilter] = useState<string>('');
  const debouncedValue = useDebounce<string>(filter, 500);

  const loader = useLoader();

  const defaultImage =
    'https://elements-cover-images-0.imgix.net/43a0f94b-abc5-4bc9-98c1-92f72cf03ec0?auto=compress%2Cformat&fit=max&w=1370&s=dfeda277333cef334b9cdddc8d98bcc9';

  const fetchMembers = async () => {
    loader.onOpen();
    const members = await getData('members', 1, 5, filter);
    const modifiedMembers = members.map((member: Member) => {
      return { value: member.id, label: member.name };
    });
    setMemberOptions(modifiedMembers);
    loader.onClose();
  };

  useEffect(() => {
    const getMembers = async () => {
      await fetchMembers();
    };

    getMembers();
  }, [debouncedValue]);

  const serializeComments = (
    comments: [
      {
        id: string;
        comment: string;
        DateTime: string;
        User: { username: string };
      }
    ]
  ) => {
    // @ts-ignore
    let serializedComments = [];
    comments.map((comment) => {
      serializedComments.push({
        id: comment.id,
        comment: comment.comment,
        username: comment.User?.username,
        dateTime: moment(comment.DateTime).format('DD/MM/YYYY hh:mm:ss'),
      });
    });

    // @ts-ignore
    setBookComments(serializedComments);
  };

  const fetchData = async () => {
    loader.onOpen();
    const response = await getSingleData('books', id);
    setBook(response);
    serializeComments(response.comments);
    loader.onClose();
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  const addComment = async () => {
    try {
      loader.onOpen();
      // @ts-ignore
      const user = JSON.parse(localStorage.getItem('user'));
      const data = {
        // @ts-ignore
        username: userAuth.user.username || user.username,
        comment,
      };
      await postData(`books/${book?.id}/comment`, data);
      setComment('');
      fetchData();
      loader.onClose();
    } catch (err) {
      loader.onClose();
      console.log(err);
    }
  };

  const unRentBook = async (memberId: number) => {
    loader.onOpen();
    const response = await postData(
      `books/return-book/${id}/member/${memberId}`
    );

    if (response.success) {
      // book unrented
      console.log('success');
    }

    loader.onClose();

    fetchData();
  };

  const handleKeyDown = async (e: any) => {
    setFilter(e.target.value);
  };

  const handleSelectMember = async (selected: any) => {
    loader.onOpen();
    const data = {
      bookId: Number(id),
      memberId: selected.value,
    };
    const response = await postData('books/rent/add', data);

    if (response.success) {
      setSelectedMember({ value: '', label: '' });
      fetchData();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Book rented',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Book rent Failed',
        showConfirmButton: false,
        timer: 1000,
      });
    }
    loader.onClose();
  };

  return (
    <div className='p-6'>
      <div className='flex p-6 gap-6 w-full mt-5'>
        <img
          src={book?.image.url || defaultImage}
          className='h-96 rounded-lg w-6/12'
        />
        <div>
          <p className='text-4xl uppercase font-bold'>{book?.title}</p>
          <p className='text-3xl'>{book?.rentFee}$</p>
          <p className='text-2xl'>{book?.authorName}</p>
          <p className='text-2xl'>Total Stock: {book?.stock}</p>
          <p
            className={`text-2xl ${
              book?.status === 'AVAILABLE' ? 'bg-green-900' : 'bg-red-900'
            } px-6 p-2 flex justify-center uppercase rounded-md mt-4`}
          >
            {book?.status}
          </p>

          {book?.status === 'AVAILABLE' && (
            <div className='mt-3'>
              <Select
                options={memberOptions}
                onChange={(selected: any) => handleSelectMember(selected)}
                onKeyDown={(e: any) => handleKeyDown(e)}
                classNames={{
                  dropdownIndicator: () => 'text-black cursor-pointer',
                  input: () => 'h-12',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* RENT TO MEMBERS SECTION */}
      {book?.RentedBooks?.length ? (
        <div className='flex flex-col gap-3'>
          <p className='text-2xl mt-5'>This Book is rented to:</p>
          {book?.RentedBooks.map((member) => {
            return (
              <div className='flex justify-around mt-5'>
                {/* @ts-ignore */}
                <MemberTile
                  key={member.member.id}
                  member={member.member}
                  shortImage={true}
                />
                {/* @ts-ignore */}
                <button
                  className='p-2 h-11 bg-red-500 self-center rounded-md text-slate-100'
                  onClick={() => unRentBook(member.member.id)}
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

      {/* Comments section */}
      <div className='flex flex-col mt-4'>
        <p className='uppercase text-3xl'>Admin Comments</p>

        {bookComments.length ? (
          bookComments?.map((comment: Comment) => (
            <div className='flex gap-5 mt-4' key={comment.id}>
              <p className='text-xl'>{comment.username}</p>
              <p>-</p>
              <p className='text-lg'>{comment.comment}</p>
              <p>-</p>
              <p className='text-lg'>{comment.dateTime}</p>
            </div>
          ))
        ) : (
          <p className='p-2 text-xl'>No Comments</p>
        )}
      </div>

      {/* Add Comment Section */}
      <div className='flex flex-col mt-4 gap-4'>
        <p className='text-3xl'>Add your comments here</p>
        <textarea
          maxLength={50}
          rows={6}
          className='p-4 text-black rounded-md bg-slate-100'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
        <button
          className='self-end p-2 bg-purple-500 text-white rounded-md'
          onClick={addComment}
        >
          POST COMMENT
        </button>
      </div>
    </div>
  );
};

export default Book;
