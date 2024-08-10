function Uploade() {
  return (
    <div className='bg-blue-700  h-[90vh]  text-center'>
      <div>
        <h1 className="text-white text-6xl text center pt-[8rem]">Finally understand your medical notes</h1>
        <h3 className="text-white text-3xl mt-6">Securly translate medical note into plain english</h3>
      </div>
      <div className='flex flex-row  pt-[15rem] justify-around'>
          <div className='bg-white h-96 w-[700px] rounded-lg shadow-2xl'>
            <h2 className="text-xl font-medium flex justify-start mx-14 m-2">Medical Note</h2>
            <textarea className="rounded-lg mt-2 border px-2 outline-none" name="note" id="notes" placeholder="Type or Paste your report..." cols={75} rows={5}></textarea>
            <div className="bg-slate-100 my-4 mx-14 rounded-lg hover:bg-slate-200 cursor-pointer">
              <button className="p-3 font-semibold "><span className="material-symbols-outlined">arrow_upward</span> Upload</button>
            </div>

            <div className="flex  mx-14 bg-gray-100 p-1">Keep the file size less than 2 mb</div>
          </div>
          <div className='bg-white h-96 w-[700px] rounded-lg shadow-2xl'>
            Right Side
          </div>
      </div>

    </div>
  )
}

export default Uploade