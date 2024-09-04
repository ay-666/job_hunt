import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '@/utils/redux/jobSlice';


function FilterCard() {
  const [selectedValue , setSelectedValue] = useState('');
  const filterData = [
    {
      filterType:"Location",
      filters:["New Delhi","Gurugram","Bangalore","Hyderabad","Pune","Mumbai"]
    },{
      filterType:"Designation",
      filters:["Frontend Developer","Backend Developer","Fullstack Developer","Data Analyst","Software Engineer"]
    },{
      filterType:"Job Type",
      filters:["full-time","part-time",]
    }

  ];
  const dispatch = useDispatch();

  const selectHandler = (value) =>{
   
    
    setSelectedValue(value);
  }
  useEffect(()=>{
    dispatch(setSearchJobByText(selectedValue));
    
  },[selectedValue]);
  return (
    <div className='bg-white p-3 rounded-md'>
      <h1>FilterPage</h1>
      <hr className='mt-3'></hr>
      <RadioGroup onValueChange = {selectHandler} >
        {
          filterData.map((data,ind)=>{
            return (<div key={ind}>
              <h1 className='font-bold  sm:text-lg'>{data.filterType}</h1>
              {
                data.filters.map((item,index)=>{
                  return (<div key={index} className='flex items-center my-2 space-x-2'>
                    <RadioGroupItem value={item } id={index} />
                    <Label className="text-xs xs:text-sm md:text-base" >{item}</Label>
                  </div>);
                })
              }
            </div>);
          })
        }
      </RadioGroup>
    </div>
  );
}

export default FilterCard;