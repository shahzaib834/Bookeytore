import { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleData } from '../api/GET';
import { Book } from '../interfaces/Book';
import useUserAuth from '../hooks/useUserAuth';
import { postData } from '../api/POST';
import moment from 'moment';

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
  const [book, setBook] = useState<Book>({
    id: 0,
    title: '',
    authorName: '',
    description: '',
    rentFee: 0,
    status: '',
    comments: [
      { id: 0, comment: '', memberId: 0, User: { username: '' }, DateTime: '' },
    ],
  });
  const defaultImage =
    'https://elements-cover-images-0.imgix.net/43a0f94b-abc5-4bc9-98c1-92f72cf03ec0?auto=compress%2Cformat&fit=max&w=1370&s=dfeda277333cef334b9cdddc8d98bcc9';

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
    const response = await getSingleData('books', id);
    setBook(response);
    console.log(response);
    serializeComments(response.comments);
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  const addComment = async () => {
    try {
      // @ts-ignore
      const user = JSON.parse(localStorage.getItem('user'));
      const data = {
        // @ts-ignore
        username: userAuth.user.username || user.username,
        comment,
      };
      await postData(`books/${book.id}/comment`, data);
      setComment('');
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='p-6'>
      <div className='flex p-6 gap-6 w-full mt-5'>
        <img src={defaultImage} className='h-96 rounded-lg ' />
        <div>
          <p className='text-4xl uppercase font-bold'>{book.title}</p>
          <p className='text-xl font-thin'>{book.description}</p>
          <p className='text-3xl'>{book.rentFee}$</p>
          <p className='text-2xl'>{book.authorName}</p>
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
