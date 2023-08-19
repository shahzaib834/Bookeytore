import React from 'react';
import { Member } from '../interfaces/Member';
import { useNavigate } from 'react-router-dom';

interface MemberTileProps {
  member: Member;
  shortImage?: boolean;
}

const MemberTile: React.FC<MemberTileProps> = ({ member, shortImage }) => {
  const navigate = useNavigate();

  const handleMemberClick = () => {
    navigate(`/member/${member.id}`);
  };

  return (
    <div
      className={` ${
        shortImage ? 'w-fit' : ''
      } flex flex-col justify-between gap-2 border border-slate-500 p-2 rounded-md cursor-pointer`}
      onClick={handleMemberClick}
    >
      <img
        src='https://upittpress.org/wp-content/themes/pittspress/images/no_cover_available.png'
        className={`${shortImage ? 'h-28' : 'h-52'} w-full rounded-lg`}
      />
      <div className='flex flex-col gap-1'>
        <p>
          name: <span>{member.name}</span>
        </p>
        <p>
          Defaulter: <span>{member.isDefaulter ? 'True' : 'False'}</span>
        </p>
        <p>
          Monthly Subscribed:{' '}
          <span>{member.isMonthlySubscribed ? 'True' : 'False'}</span>
        </p>
      </div>
    </div>
  );
};

export default MemberTile;
