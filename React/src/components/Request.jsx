import React from 'react';

export default function Request() {
  const onClick = () => {
    console.log("hey");
  };

  return (
    <div>
      <button
        onClick={onClick}
        className="text-white font-sawarabi border p-1 md:mt-[30px] 
                    lg:mt-[30px] xl:mt-[40px] 2xl:mt-[45px]
                    rounded-3xl hover:bg-white hover:bg-opacity-20
                    text-sm w-[160px] md:w-[200px] lg:w-[220px] md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl "
                >
        Submit a Request
      </button>
    </div>
  );
}
