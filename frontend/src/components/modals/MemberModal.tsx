'use client';

import { useCallback, useEffect, useState } from 'react';
import useMemberModal from '../../hooks/useMemberModal';
import { IoMdClose } from 'react-icons/io';
import { FieldValues, useForm } from 'react-hook-form';
import Input from '../Input';
import { BACKEND_PORT } from '../../api/constants';
import { postData } from '../../api/POST';
import { FC } from 'react';
import Select from 'react-select';
import { getData, getSingleData } from '../../api/GET';
import useDebounce from '../../hooks/useDebounce';
import { updateDataById } from '../../api/PUT';
import Swal from 'sweetalert2';
import useLoader from '../../hooks/useLoader';
import { Member } from '../../interfaces/Member';

interface MemberModalProps {
  refetchData: () => void;
}

const MemberModal: FC<MemberModalProps> = ({ refetchData }) => {
  const memberModal = useMemberModal();
  const loader = useLoader();
  const [showModal, setShowModal] = useState(memberModal.isOpen);
  const [cloudinaryImage, setCloudinaryImage] = useState({
    preview: '',
    raw: '',
  });
  const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState('');
  const [memberOptions, setMemberOptions] = useState([]);
  const [filter, setFilter] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState({
    value: '',
    label: '',
  });
  const debouncedValue = useDebounce<string>(filter, 500);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      isDefaulter: false,
      isMonthlySubscribed: false,
    },
  });

  useEffect(() => {
    setShowModal(memberModal.isOpen);
  }, [memberModal.isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setSelectedMember({ value: '', label: '' });

    setTimeout(() => {
      memberModal.onClose();
    }, 300);
  }, []);

  if (!memberModal.isOpen) {
    return null;
  }

  const addMember = async (formData: any) => {
    loader.onOpen();
    const member = await postData('members', formData);

    if (member.id) {
      refetchData();
      clearForm();
      memberModal.onClose();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Member Added',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Member Addition Failed',
        showConfirmButton: false,
        timer: 1000,
      });
    }
    loader.onClose();
  };

  const updateMember = async (formData: any) => {
    loader.onOpen();
    const member = await updateDataById(
      'members',
      selectedMember.value,
      formData
    );

    if (member.id) {
      refetchData();
      clearForm();
      memberModal.onClose();
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Member Updated',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Member Updation Failed',
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

  const handleKeyDown = async (e: any) => {
    setFilter(e.target.value);
  };

  const handleSelectMember = async (selected: any) => {
    loader.onOpen();
    const member: Member = await getSingleData('members', selected.value);
    setValue('name', member.name);
    setValue('isDefaulter', member.isDefaulter);
    setValue('isMonthlySubscribed', member.isMonthlySubscribed);
    setCloudinaryImage({ preview: member.image.url, raw: '' });
    setCloudinaryImageUrl(member.image.url);
    setSelectedMember(selected);
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
                <div className='text-lg font-semibold'>ADD/UPDATE Member </div>
              </div>
              {/* BODY */}
              <div className='relative p-6 flex flex-col gap-4'>
                <div className='flex justify-around items-center gap-2 w-full'>
                  <p>SEARCH Member</p>
                  <Select
                    options={memberOptions}
                    onChange={(selected: any) => handleSelectMember(selected)}
                    onKeyDown={(e: any) => handleKeyDown(e)}
                    classNames={{
                      dropdownIndicator: () => 'text-black cursor-pointer',
                      input: () => 'h-12',
                      container: () => 'w-6/12',
                    }}
                  />
                </div>
                <Input
                  id='name'
                  label='name'
                  disabled={false}
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  id='email'
                  label='Email'
                  disabled={false}
                  register={register}
                  errors={errors}
                  required
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

                {selectedMember.label ? (
                  <button
                    className='p-2 bg-purple-500 hover:bg-purple-700 text-slate-100 rounded-md disabled:opacity-50 disabled:bg-slate-600'
                    onClick={handleSubmit(updateMember)}
                    disabled={!cloudinaryImageUrl}
                  >
                    UPDATE
                  </button>
                ) : (
                  <button
                    className='p-2 bg-purple-500 hover:bg-purple-700 text-slate-100 rounded-md disabled:opacity-50 disabled:bg-slate-600'
                    onClick={handleSubmit(addMember)}
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

export default MemberModal;
