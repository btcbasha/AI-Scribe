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

  const getShortResponse = (response:any) => {
    return response.length > 200 ? response.substring(0, 200) + '... [Read more]' : response;
  };

  return (
    <div className='bg-blue-700 min-h-screen text-center px-4 py-8'>
      <div>
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl pt-4">Finally understand your medical notes</h1>
        <h3 className="text-white text-xl sm:text-2xl md:text-3xl mt-4">Securely translate medical notes into plain English</h3>
      </div>
      <div className='flex flex-col lg:flex-row items-center justify-center gap-4 pt-8'>
        <div className='bg-white h-auto w-full max-w-lg rounded-lg shadow-2xl p-4'>
          <h2 className="text-xl font-medium mb-2">Medical Note</h2>
          <textarea
            className="w-full rounded-lg mt-2 border px-2 py-2 outline-none resize-none"
            name="note"
            id="notes"
            placeholder="Type or Paste your report..."
            cols={50}
            rows={5}
          ></textarea>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2"
          />
          <div className="bg-slate-100 my-4 rounded-lg hover:bg-slate-200 cursor-pointer">
            <button className="w-full p-3 font-semibold" onClick={handleUpload}>
              <span className="material-symbols-outlined">arrow_upward</span> Upload
            </button>
          </div>
          <div className="bg-gray-100 p-1">Keep the file size less than 2 MB</div>
        </div>
        <div className='bg-white h-auto w-full max-w-lg rounded-lg shadow-2xl p-4 relative'>
          <h1 className="text-xl">Translation</h1>
          <div className="text-black mt-2">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="loader mt-2">Loading...</div> 
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
