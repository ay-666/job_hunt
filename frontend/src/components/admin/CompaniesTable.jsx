import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit, Edit2, Edit3, MoreHorizontalIcon, Pen, PenIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import useInitials from '@/hooks/useInitials';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies,searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany , setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(()=>{
        
        const filteredCompany = (companies.length >0  &&  companies.filter((company) =>{
            if(!searchCompanyByText) return company;
            return company.name.toLowerCase().includes(searchCompanyByText.toLowerCase());
        }) ) || [];

        setFilterCompany(filteredCompany);

    },[searchCompanyByText, companies]);
    return (
        <div>
            <Table>
                <TableCaption>List of your registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {filterCompany.length > 0 ?
                    <>
                        
                            {filterCompany.map((company) => {
                                const initials = useInitials(company.name);
                                return (
                                    <TableRow key={company._id} className="text-xs sm:text-sm">
                                        <TableCell>
                                            <Avatar className="border border-slate-700 flex items-center justify-center">
                                                <AvatarImage src={company.logo} />
                                                <AvatarFallback  >{initials}</AvatarFallback>
                                                
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{company.name}</TableCell>
                                        <TableCell>{new Date(company.createdAt).toISOString().split('T')[0]}</TableCell>
                                        <TableCell className="text-right cursor-pointer">
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontalIcon /></PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    <div onClick={()=>{navigate(`${company._id}`)}}  className='flex items-center gap-2 w-fit cursor-pointer '>
                                                        <Edit2 className='w-5' />
                                                        <span>Edit</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </>

                        :  <TableRow><TableCell colSpan={4}  align="center"><div className='flex items-center justify-center '>No matching Companies found...</div ></TableCell></TableRow>}

                    {/* <TableRow>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src="https://www.shutterstock.com/shutterstock/photos/2211518569/display_1500/stock-vector-ilustration-vector-graphic-icon-png-logo-of-water-circle-2211518569.jpg">
                                </AvatarImage>
                            </Avatar>
                        </TableCell>
                        <TableCell>Company Name</TableCell>
                        <TableCell>17-08-2024</TableCell>
                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger><MoreHorizontalIcon /></PopoverTrigger>
                                <PopoverContent className="w-32">
                                    <div className='flex items-center gap-2 w-fit '>
                                        <Edit2 className='w-5' />
                                        <span>Edit</span>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
        </div >
    )
}

export default CompaniesTable;