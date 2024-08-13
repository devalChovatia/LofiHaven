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
                    lg:mt-[40px] xl:mt-[40px] 2xl:mt-[45px]
                    rounded-3xl hover:bg-white hover:bg-opacity-20
                    text-sm w-[160px] md:w-[200px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
                >
        Submit a Request
      </button>
    </div>
  );
}
