import  { useState } from 'react';
import axios from 'axios';

function Uploade() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event:any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    setIsLoading(true); 
    const formData = new FormData();
    formData.append('file', file);
    formData.append('message', 'You are an expert physician with over 1000 years of experience across all medical fields. I am uploading a medical report in PDF format. Please read and analyze it carefully. Identify and summarize all important points, providing a clear and accurate overview. Your analysis should include any potential issues, noting whether the findings are normal, concerning, or require further investigation. Ensure no critical details are missed, and deliver your response in a thorough, professional manner.');

    try {
      const response = await axios.post('http://localhost:3000/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.response);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setIsLoading(false); 
    }
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  const getShortResponse = (response:string) => {
    return response.length > 200 ? response.substring(0, 200) + '... [Read more]' : response;
  };

  return (
    <div className='bg-blue-700 h-[90vh] text-center'>
      <div>
        <h1 className="text-white text-6xl text center pt-[8rem]">Finally understand your medical notes</h1>
        <h3 className="text-white text-3xl mt-6">Securly translate medical note into plain english</h3>
      </div>
      <div className='flex flex-row pt-[15rem] justify-around'>
        <div className='bg-white h-96 w-[700px] rounded-lg shadow-2xl'>
          <h2 className="text-xl font-medium flex justify-start mx-14 m-2">Medical Note</h2>
          <textarea
            className="rounded-lg mt-2 border px-2 outline-none"
            name="note"
            id="notes"
            placeholder="Type or Paste your report..."
            cols={75}
            rows={5}
          ></textarea>
          <input
            type="file"
            onChange={handleFileChange}
            className="mx-14 mt-2"
          />
          <div className="bg-slate-100 my-4 mx-14 rounded-lg hover:bg-slate-200 cursor-pointer">
            <button className="p-3 font-semibold" onClick={handleUpload}>
              <span className="material-symbols-outlined">arrow_upward</span> Upload
            </button>
          </div>
          <div className="flex mx-14 bg-gray-100 p-1">Keep the file size less than 2 mb</div>
        </div>
        <div className='bg-white h-96 w-[700px] rounded-lg shadow-2xl overflow-y-auto relative'>
          <h1 className='text-2xl font-semibold'>Translation</h1>
          <div className="text-black p-4">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="loader">Loading...</div>
              </div>
            ) : (
              <div>
                {isExpanded ? (
                  <div>{result}</div>
                ) : (
                  <div>{getShortResponse(result)}</div>
                )}
                {result.length > 200 && (
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleToggleExpand}
                  >
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Uploade;
