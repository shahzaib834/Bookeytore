import { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleData } from '../api/GET';
import { Member } from '../interfaces/Member';

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

  return (
    <div className='p-6'>
      <div className='flex p-6 gap-6 w-full mt-5'>
        <img src={defaultImage} className='h-96 rounded-lg ' />
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

      {/* BOOKS TAKEN */}
      <div className='mt-5 flex gap-4'>
        <p>RENTED BOOKS TO RETURN</p>

        <div className='flex flex-col gap-3 p-2'>BOOKS HERE WITH IMAGE AND NAME AND ID AND AUTHOR NAME</div>
      </div>
    </div>
  );
};

export default Member;
