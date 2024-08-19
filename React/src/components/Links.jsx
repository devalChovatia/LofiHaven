import { Youtube } from 'lucide-react'
import React from 'react'
import {FaYoutube} from "react-icons/fa"

export default function Links() {

  // text-white flex flex-col md:p-16 items-center text-[10px] md:text-[17px]
  return (
    <div>
        <div className='text-white flex flex-col items-center'>
            <div className='font-sawarabi text-[12px] xl:text-[15px]'>LiveStream Name</div>
            <button><FaYoutube className='w-4 h-4 md:w-6 md:h-6 xl:w-8 xl:h-8'/></button>
        </div>
    </div>
  )
}
