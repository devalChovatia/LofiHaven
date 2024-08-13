import { Youtube } from 'lucide-react'
import React from 'react'
import {FaYoutube} from "react-icons/fa"

export default function Links() {

  return (
    <div>
        <div className='text-white flex flex-col md:p-16 items-center text-[10px] md:text-[20px]'>
            <div>LiveStream Name</div>
            <button><FaYoutube className='w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8'/></button>
        </div>
    </div>
  )
}
