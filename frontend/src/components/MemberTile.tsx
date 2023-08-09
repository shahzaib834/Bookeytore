import React from 'react';
import { Member } from '../interfaces/Member';

interface MemberTileProps {
  member: Member;
}
//default image - https://upittpress.org/wp-content/themes/pittspress/images/no_cover_available.png

const MemberTile: React.FC<MemberTileProps> = ({ member }) => {
  return (
    <div className='flex flex-col justify-between gap-2 border border-slate-500 p-2 rounded-md cursor-pointer'>
      <img
        src='https://upittpress.org/wp-content/themes/pittspress/images/no_cover_available.png'
        className='h-52 w-full rounded-lg '
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
