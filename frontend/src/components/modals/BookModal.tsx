'use client';

import { useCallback, useEffect, useState } from 'react';
import useBookModal from '../../hooks/useBookModal';
import { IoMdClose } from 'react-icons/io';
import { FieldValues, useForm } from 'react-hook-form';
import Input from '../Input';
import { BACKEND_PORT } from '../../api/constants';
import { postData } from '../../api/POST';
import { FC } from 'react';
import Select from 'react-select';
import { getData, getSingleData } from '../../api/GET';
import useDebounce from '../../hooks/useDebounce';
import { Book } from '../../interfaces/Book';
import { updateDataById } from '../../api/PUT';
import Swal from 'sweetalert2';
import useLoader from '../../hooks/useLoader';

interface BookModalProps {
  refetchData: () => void;
}

const statusOptions = [
  { value: 'AVAILABLE', label: 'AVAILABLE' },
  { value: 'RENTED', label: 'RENTED' },
  { value: 'NOT_AVAILABLE', label: 'NOT_AVAILABLE' },
];

const BookModal: FC<BookModalProps> = ({ refetchData }) => {
  const bookModal = useBookModal();
  const loader = useLoader();
  const [showModal, setShowModal] = useState(bookModal.isOpen);
  const [cloudinaryImage, setCloudinaryImage] = useState({
    preview: '',
    raw: '',
  });
  const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState('');
  const [bookStatus, setBookStatus] = useState({
    value: 'AVAILABLE',
    label: 'AVAILABLE',
  });
  const [bookOptions, setBookOptions] = useState([]);
  const [filter, setFilter] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState({ value: '', label: '' });
  const debouncedValue = useDebounce<string>(filter, 500);

  const fetchBooks = async () => {
    loader.onOpen();
    const books = await getData('books', 1, 5, filter);
    const modifiedBooks = books?.map((book: Book) => {
      return { value: book.id, label: book.title };
    });
    setBookOptions(modifiedBooks);
    loader.onClose();
  };

  useEffect(() => {
    const getBooks = async () => {
      await fetchBooks();
    };

    getBooks();
  }, [debouncedValue]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      searchBook: '',
      rentFee: 0,
      authorName: '',
      title: '',
    },
  });

  useEffect(() => {
    setShowModal(bookModal.isOpen);
  }, [bookModal.isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setSelectedBook({ value: '', label: '' });

    setTimeout(() => {
      bookModal.onClose();
    }, 300);
  }, []);

  if (!bookModal.isOpen) {
    return null;
  }

  const addBook = async (formData: any) => {
    loader.onOpen();
    const book = await postData('books', formData);

    if (book.id) {
      refetchData();
      clearForm();
      bookModal.onClose();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Book Added',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Book Addition Failed',
        showConfirmButton: false,
        timer: 1000,
      });
    }
    loader.onClose();
  };

  const updateBook = async (formData: any) => {
    loader.onOpen();
    const book = await updateDataById('books', selectedBook.value, formData);

    if (book.id) {
      refetchData();
      clearForm();
      bookModal.onClose();
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Book Updated',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Book Updation Failed',
        showConfirmButton: false,
        timer: 1000,
      });
    }
    loader.onClose();
  };

  const handleImageChange = (e: any) => {
    if (e.target.files.length) {
      setCloudinaryImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    loader.onOpen();
    const formData = new FormData();
    formData.append('image', cloudinaryImage.raw);

    const result = await fetch(`${BACKEND_PORT}/cloudinary`, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      body: formData,
    });

    const data = await result.json();

    if (data?.url) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Image uploaded',
        showConfirmButton: false,
        timer: 1000,
      });
      setCloudinaryImageUrl(data.url);
      register('image_url', { required: true, value: data.url });
      register('image_public_id', { required: true, value: data.asset_id });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Image upload failed',
        showConfirmButton: false,
        timer: 1000,
      });
    }
    loader.onClose();
  };

  const clearForm = () => {
    reset();
    setCloudinaryImage({ preview: '', raw: '' });
    setCloudinaryImageUrl('');
  };

  const handleStatusChange = (selected: any) => {
    setBookStatus(selected);
    register('status', { required: true, value: selected });
  };

  const handleKeyDown = async (e: any) => {
    setFilter(e.target.value);
  };

  const handleSelectBook = async (selected: any) => {
    loader.onOpen();
    const book: Book = await getSingleData('books', selected.value);
    setBookStatus({ label: book.status, value: book.status });
    setValue('title', book.title);
    setValue('rentFee', book.rentFee);
    setValue('authorName', book.authorName);
    setValue('status', book.status);
    setCloudinaryImage({ preview: book.image.url, raw: '' });
    setCloudinaryImageUrl(book.image.url);
    setSelectedBook(selected);
    loader.onClose();
  };

  return (
    <>
      <div className='h-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none bg-neutral-800/70'>
        <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>
          {/* CONTENT */}
          <div
            className={`translate duration-300 h-full 
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none text-slate-700'>
              {/* HEADER */}
              <div className='flex items-center p-6 rounded-t justify-center relative border-b-[1px]'>
                <button
                  onClick={handleClose}
                  className='p-1 border-0 hover:opacity-70 transition absolute left-9'
                >
                  <IoMdClose size={18} />
                </button>
                <div className='text-lg font-semibold'>ADD/UPDATE BOOK </div>
              </div>
              {/* BODY */}
              <div className='relative p-6 flex flex-col gap-4'>
                <div className='flex justify-around items-center gap-2 w-full'>
                  <p>SEARCH BOOK</p>
                  <Select
                    options={bookOptions}
                    onChange={(selected: any) => handleSelectBook(selected)}
                    onKeyDown={(e: any) => handleKeyDown(e)}
                    classNames={{
                      dropdownIndicator: () => 'text-black cursor-pointer',
                      input: () => 'h-12',
                      container: () => 'w-6/12',
                    }}
                  />
                </div>
                <Input
                  id='title'
                  label='title'
                  disabled={false}
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  id='authorName'
                  label='author'
                  disabled={false}
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  id='rentFee'
                  label='rentFee $'
                  type='number'
                  disabled={false}
                  register={register}
                  errors={errors}
                  required
                />
                <Select
                  options={statusOptions}
                  onChange={handleStatusChange}
                  value={bookStatus}
                  classNames={{
                    dropdownIndicator: () => 'text-black cursor-pointer',
                    input: () => 'h-12',
                  }}
                />
                <div className='flex gap-3 justify-around items-center'>
                  <label htmlFor='upload-button'>
                    {cloudinaryImage.preview ? (
                      <img
                        src={cloudinaryImage.preview}
                        alt='image'
                        width='100'
                        height='100'
                        className='rounded-md'
                      />
                    ) : (
                      <>
                        <h5 className='text-center p-2 bg-orange-400 hover:bg-orange-600 rounded-md text-white cursor-pointer'>
                          Select Image
                        </h5>
                      </>
                    )}
                  </label>
                  <input
                    type='file'
                    id='upload-button'
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <button
                    onClick={handleUpload}
                    className='p-2 bg-green-900 hover:bg-green-950 text-slate-100 rounded-md disabled:opacity-50 disabled:bg-slate-600'
                    disabled={!cloudinaryImage.raw}
                  >
                    Upload Image
                  </button>
                </div>

                {selectedBook.label ? (
                  <button
                    className='p-2 bg-purple-500 hover:bg-purple-700 text-slate-100 rounded-md disabled:opacity-50 disabled:bg-slate-600'
                    onClick={handleSubmit(updateBook)}
                    disabled={!cloudinaryImageUrl}
                  >
                    UPDATE
                  </button>
                ) : (
                  <button
                    className='p-2 bg-purple-500 hover:bg-purple-700 text-slate-100 rounded-md disabled:opacity-50 disabled:bg-slate-600'
                    onClick={handleSubmit(addBook)}
                    disabled={!cloudinaryImageUrl}
                  >
                    ADD
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookModal;
