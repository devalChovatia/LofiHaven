import React from 'react'
import { X } from 'lucide-react'

export default function Popup({open, onClose, children}) {
  return (
    <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/80' : "invisible"}`}  style={{zIndex:10000}}>
        <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-xl p-3 shadow transition-all ${open ? 'scale-100' : 'scale-125 opacity-0'}`}>
            
            <button onClick={onClose} className='absolute top-2 right-2 p-1 rounded-lg text-red-400 bg-white opacity-80 hover:bg-gray-50 hover:opacity-100'>
                <X />
            </button>
            {children}
        </div>

        
        
    </div>
  )
}
