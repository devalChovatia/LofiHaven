import React from 'react';
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Links({ channelName, livestreamLink }) {
    return (
        <div className='text-white flex flex-col items-center'>
            <div className='font-sawarabi text-[12px] xl:text-[15px]'>
                {channelName}
            </div>
            <Link to={livestreamLink} target='_blank'>
              <button>
                  <FaYoutube className='w-4 h-4 md:w-6 md:h-6 xl:w-8 xl:h-8'/>
              </button>
            </Link>
        </div>
    );
}
