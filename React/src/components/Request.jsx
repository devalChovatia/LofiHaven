import React from 'react';

export default function Request() {
  const onClick = () => {
    console.log("hey");
  };

  return (
    <div>
      <button
        onClick={onClick}
        className="text-white font-sawarabi border rounded-3xl text-[13px] md:text-[13px] xl:text-[15px] w-[100px] md:w-[200px] hover:bg-white hover:bg-opacity-20"
                >
        Submit a Request
      </button>
    </div>
  );
}
