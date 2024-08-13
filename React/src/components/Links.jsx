import { Youtube } from 'lucide-react'
import React from 'react'
import {FaYoutube} from "react-icons/fa"

export default function Links() {

  return (
    <div>
        <div className='text-white flex flex-col items-center'>
            <div>LiveStream Name</div>
            <button><FaYoutube size={24}/></button>
        </div>
    </div>
  )
}
