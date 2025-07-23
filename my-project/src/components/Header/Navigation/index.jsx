import React from 'react'
import Button from '@mui/material/Button';
import { FiMenu } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { IoRocket } from "react-icons/io5";
import CategoryPanel from './CategoryPanel';
import { useState } from 'react';
import "../Navigation/style.css"

export const Navigation = () => {
  
  const [isopenCatPanel, setIsopenCatPanel] = useState(false);
  
  const openCategoryPanel=()=>
  {
    setIsopenCatPanel(true);
  }
 
  return (
    

   <>
   <nav className='container flex items-center justify-start gap-5'>
        <div className="col_1 w-[15%] gap-8">
            <Button className="gap-2" onClick={openCategoryPanel} style={{
        color: "#000000",
        fontSize: "10"
    }} ><FiMenu className="text-[80%]"/>Shop By Categories<FaAngleDown className=" text-[14px]"/>
</Button>
        </div>

         <div className="col_2 w-[%]">
          <ul className="flex items-center  flex-row gap-3">
            <li className="list-none">       
                   <Link to="/" className="link transition tex-[16px] font-[500]">Home</Link>
          </li>

          <li className="list-none relative">       
                   <Link to="/" className="link transition tex-[16px] font-[500]">Fashion</Link>
                   <div className="submenu absolute top-[120%] left-[0%] !min-w-[200px] bg-white shadow-md opacity-0">

                    <ul>
                      <li className='list-none w-[full]'>
                        <Button className='!text-[rgba(0,0,0,0.8)] w-[full] !text-left !justify-start !rounded-none'>Men</Button>
                      </li>

                      <li className='list-none w-[full]'>
                        <Button className='!text-[rgba(0,0,0,0.8)] w-[full] !text-left !justify-start !rounded-none'>Women</Button>
                      </li>

                      <li className='list-none w-[full]'>
                        <Button className='!text-[rgba(0,0,0,0.8)] w-[full] !text-left !justify-start !rounded-none'>Kids</Button>
                      </li>

                      <li className='list-none w-[full]'>
                        <Button className='!text-[rgba(0,0,0,0.8)] w-[full] !text-left !justify-start !rounded-none'>Girls</Button>
                      </li>

                      <li className='list-none w-[full]'>
                        <Button className='!text-[rgba(0,0,0,0.8)] w-[full] !text-left !justify-start !rounded-none'>Boys</Button>
                      </li>
                    </ul>
                   </div>
          </li>
          <li className="list-none">       
                   <Link to="/" className="link transition tex-[16px] font-[500]">Electronics</Link>
          </li>
          <li className="list-none">       
                   <Link to="/" className="link transition tex-[16px] font-[500]">Bags</Link>
          </li>
          <li className="list-none">       
                   <Link to="/" className="link transition tex-[16px] font-[500]">Footwear</Link>
          </li>

          <li className="list-none">       
                   <Link to="/" className="link transition tex-[16px] font-[500]">Groceries</Link>
          </li>

          <li className="list-none">       
                   <Link to="/" className="link transition tex-[16px] font-[500]">Beauty</Link>
          </li>

          <li className="list-none">       
                   <Link to="/" className="link transition tex-[16px] font-[500]">Wellness</Link>
          </li>

           <li className="list-none">       
                   <Link to="/" className="link transition tex-[16px] font-[500]">Jewelly</Link>
          </li>

          <p><IoRocket />Free International Delivery</p>
          </ul>
            
            
        </div>

        <div className="col_3 w-[5%]">

        </div>

        
    </nav>

    <CategoryPanel isopenCatPanel={isopenCatPanel} setIsopenCatPanel={setIsopenCatPanel}/>
   </>

   
  )
}
