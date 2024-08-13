import React from 'react'

export default function Request() {

    const onClick = () =>{
        console.log("hey")
    }

  return (
        <div>
            <button onClick={onClick} className="text-white transparent border p-1 w-full md:mt-[30px] 
                                                lg:mt-[40px] xl:mt-[40px] 2xl:mt-[45px] 2xl:text-[25px] 
                                                rounded-3xl hover:bg-white hover:bg-opacity-20">
                Submit a Request
            </button>
        </div>
  )
}
