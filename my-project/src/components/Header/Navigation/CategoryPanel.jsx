import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import { IoMdClose } from "react-icons/io";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaRegSquareMinus } from "react-icons/fa6";



const CategoryPanel = (props) => {

    const [submenuIndex, setSubmenuIndex] = React.useState(null);
    const [innerSubmenuIndex, setInnerSubmenuIndex] = React.useState(null);
    const toggleDrawer = (newOpen) => () => {

        props.setIsopenCatPanel(newOpen);
    };

    const openSubmenu = (index) => {
        if (submenuIndex === index) {
            setSubmenuIndex(null);
            
        }
        else {
            setSubmenuIndex(index);
            
        }
    }

    const openInnerSubmenu = (index) => {
        if (innerSubmenuIndex === index) {
            setInnerSubmenuIndex(null);
           
        }
        else {
            setInnerSubmenuIndex(index);
            
        }
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" className="categoryPanel" >
            <h3 className='p-3 text-[16px] flex items-center justify-between'>Shop By Categories <IoMdClose onClick={toggleDrawer(false)} className='cursor-pointer text--[20px]' /></h3>

            <div className="scroll">
                <ul className='w-full'>
                    <li className='list-none flex items-center relative flex-col'>
                        <Link to="/">
                            <Button className='w-full !text-left !justify-start !px-3 !text-black'>Fashion </Button>
                        </Link>
                        
                        {
                            submenuIndex===0 ? <FaRegSquareMinus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(0)} />
                        : <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(0)} />
                        
                        
                        }
                            
    
                        
                        {
                            submenuIndex === 0 && <ul className="submenu w-full pl-3">
                                <li className="list-none relative">

                                    <Link to="/" className='link w-full !text-left !justify-start !px-3 transition tex-[14px]'>Apparel</Link>

                                    {
                            innerSubmenuIndex===0 ? <FaRegSquareMinus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(0)} />
                        : <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(0)} />
                        
                        
                        }

                                    
                                    {
                                        innerSubmenuIndex === 0 && <ul className="inner_submenu pl-3  w-full ">

                                        <li className="list-none relative mb-1">

                                            <Link to="/" className='link w-full !text-left !justify-start !px-3 transition tex-[14px]'>Smart Tablet</Link>
                                            <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' />
                                        </li>

                                        <li className="list-none relative mb-1">

                                            <Link to="/" className='link w-full !text-left !justify-start !px-3 transition tex-[14px]'>Crepe T-Shirt</Link>
                                            <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' />
                                        </li>

                                        <li className="list-none relative mb-1">

                                            <Link to="/" className='link w-full !text-left !justify-start !px-3 transition tex-[14px]'>leather Watch</Link>
                                            <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' />
                                        </li>

                                        <li className="list-none relative mb-1">

                                            <Link to="/" className='link w-full !text-left !justify-start !px-3 transition tex-[14px]'>Rolling Diamong</Link>
                                            <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' />
                                        </li>
                                    </ul>
                                        
                                            }
                                    
                                </li>


                            </ul>
                        }
                    </li>


                      <li className='list-none flex items-center relative flex-col'>
                        <Link to="/">
                            <Button className='w-full !text-left !justify-start !px-3 !text-black'>Fashion </Button>
                        </Link>
                        
                        {
                            submenuIndex===1 ? <FaRegSquareMinus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(1)} />
                        : <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(1)} />
                        
                        
                        }
                            
    
                        
                        {
                            submenuIndex === 1 && <ul className="submenu w-full pl-3">
                                <li className="list-none relative">

                                    <Link to="/" className='link w-full !text-left !justify-start !px-3 transition tex-[14px]'>Apparel</Link>

                                    {
                            innerSubmenuIndex===1 ? <FaRegSquareMinus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(1)} />
                        : <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(1)} />
                        
                        
                        }

                                    
                                    {
                                        innerSubmenuIndex === 1 && <ul className="inner_submenu pl-3  w-full ">

                                        <li className="list-none relative mb-1">

                                            <Link to="/" className='link w-full !text-left !justify-start !px-3 transition tex-[14px]'>Smart Tablet</Link>
                                            <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' />
                                        </li>

                                        <li className="list-none relative mb-1">

                                            <Link to="/" className='link w-full !text-left !justify-start !px-3 transition tex-[14px]'>Crepe T-Shirt</Link>
                                            <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' />
                                        </li>

                                        <li className="list-none relative mb-1">

                                            <Link to="/" className='link w-full !text-left !justify-start !px-3 transition tex-[14px]'>leather Watch</Link>
                                            <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' />
                                        </li>

                                        <li className="list-none relative mb-1">

                                            <Link to="/" className='link w-full !text-left !justify-start !px-3 transition tex-[14px]'>Rolling Diamong</Link>
                                            <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' />
                                        </li>
                                    </ul>
                                        
                                            }
                                    
                                </li>


                            </ul>
                        }
                    </li>



                </ul>
            </div>
        </Box>
    );

    return (
        <>




            <Drawer open={props.isopenCatPanel} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>

        </>
    );
};

export default CategoryPanel