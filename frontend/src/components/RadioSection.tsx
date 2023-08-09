interface RadioSectionProps {
  radioOption: string;
  onChange: (e: any) => void;
}

const RadioSection: React.FC<RadioSectionProps> = ({radioOption, onChange}) => {
  return (
    <div className='flex justify-around mt-2'>
      <div className='flex gap-2'>
        <input type='radio' checked={radioOption === "books"}  value='books' onChange={(e: any) => onChange(e)} />
        <label id='bookLabel'>BOOK</label>
      </div>
      <div className='flex gap-2'>
        <input type='radio' checked={radioOption === "members"} value='members' onChange={(e: any) => onChange(e)}/>
        <label id='memberLable'>MEMBER</label>
      </div>
    </div>
  );
};

export default RadioSection;
