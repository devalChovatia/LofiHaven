import React from 'react';

export default function Request() {
  const onClick = () => {
    console.log("hey");
  };

  return (
    <div>
      <button
        onClick={onClick}
        className="text-white font-sawarabi border rounded-3xl hover:bg-white hover:bg-opacity-20"
                >
        Submit a Request
      </button>
    </div>
  );
}
