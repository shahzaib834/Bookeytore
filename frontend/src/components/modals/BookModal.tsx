'use client';

import { useCallback, useEffect, useState } from 'react';
import useBookModal from '../../hooks/useBookModal';
import { IoMdClose } from 'react-icons/io';
import { FieldValues, useForm } from 'react-hook-form';
import Input from '../Input';

const BookModal = () => {
  const bookModal = useBookModal();
  const [showModal, setShowModal] = useState(bookModal.isOpen);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchBook: '',
    },
  });

  useEffect(() => {
    setShowModal(bookModal.isOpen);
  }, [bookModal.isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      bookModal.onClose();
    }, 300);
  }, []);

  //   const handleSubmit = useCallback(() => {
  //     onSubmit();
  //   }, [disabled, onSubmit]);

  if (!bookModal.isOpen) {
    return null;
  }

  return (
    <>
      <div className='h-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
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
                <div className='flex justify-center items-center gap-2'>
                  <p>SEARCH BOOK</p>
                  react select here
                </div>
                <Input
                  id='book-name'
                  label='title'
                  disabled={false}
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  id='author'
                  label='author'
                  disabled={false}
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  id='rent-fee'
                  label='rentFee $'
                  disabled={false}
                  register={register}
                  errors={errors}
                  required
                />
                react select for status
                <button className='p-2 bg-purple-500 hover:bg-purple-700 text-slate-100 rounded-md'>
                  ADD
                </button>
                <button className='p-2 bg-purple-500 hover:bg-purple-700 text-slate-100 rounded-md'>
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookModal;
