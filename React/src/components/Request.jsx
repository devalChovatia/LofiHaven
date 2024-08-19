import React, { useState } from 'react';
import Popup from './Popup';
import axios from 'axios'

export default function Request() {
  const [open, setOpen] = useState(false);
  const [requestText, setRequestText] = useState('')
  const [requestType, setRequestType] = useState('')

  const handleSubmit = async(e) =>{
    e.preventDefault()

    const data = {
      submission_type: requestType,
      submission_request: requestText
    }

    try {
      await axios.post('http://localhost:8000/submission', data)
      alert('Request Successfully Submitted')
      setRequestText('')
      setRequestType('')
      setOpen(false)
    } catch (error) {
      console.log(error)
      alert('Failed to Submit Request')
      setRequestText('')
      setRequestType('')
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="text-white ml-4 font-sawarabi border rounded-3xl text-[10px] md:text-[13px] xl:text-[15px] xl:w-full w-[100px] md:w-[200px] hover:bg-white hover:bg-opacity-20"
      >
        Submit a Request
      </button>
      <Popup open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56 font-sawarabi md:w-[450px] lg:w-[550px] xl:w-[750px]">
          <div className="mx-auto my-4 w-48 md:w-[400px] lg:w-[500px] xl:w-[700px]">
            <h3 className="text-[20px] font-black text-gray-800 w-full">
              Submit a Genre Request
            </h3>
            <form>
              <div className="mb-4 mt-4">
                <label className="block text-left text-gray-700 mb-2 text-sm">Request Type:</label>
                <label className="block text-left">
                  <input type="radio" name="requestType" value="Genre" checked={requestType === 'Genre'} onChange={() => setRequestType('Genre')} className="mr-2" />
                  Genre
                </label>
                <label className="block text-left">
                  <input type="radio" name="requestType" value="Livestream" checked={requestType === 'Livestream'} onChange={() => setRequestType('Livestream')} className="mr-2" />
                  Livestream
                </label>
              </div>
              <div>
                <textarea
                  className="border w-full h-32 p-2"
                  placeholder="Enter your request..."
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-4 text-black border border-black w-full rounded-3xl px-4 py-2 hover:text-white hover:bg-black hover:border-white"
                onClick={handleSubmit}
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </Popup>
    </div>
  );
}
