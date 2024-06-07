import { useRef, useState } from 'react';
import Axios_Instance from '../api/axios';
import { toast } from 'react-toastify';


function UploadGlb({ setReLoad, reLoad }) {

  const [name, setName] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('')
  const fileInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();

    const file = fileInputRef.current.files[0];

    if (!file) {
      console.error('No file selected');
      toast.error('No file selected. please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('data', file);
    formData.append('name', name);
    try {
      const res = await Axios_Instance.post('/upload3D', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status === 200) {
        setIsLoading(false)
        toast.success('Model uploaded successfully');
        setReLoad(!reLoad)
        setIsFileSelected(false)
        setName('')
        fileInputRef.current.value = '';
        setSelectedFileName('')
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      setIsFileSelected(false)
      setName('')
      setSelectedFileName('')
      fileInputRef.current.value = '';
      if (error?.response?.status === 400) {
        toast.error('This model already exists. Please upload a different model.');
      } else {
        toast.error('Something went wrong, please try again later.');
      }
    }
  };


  return (
    <>
      <section className="text-gray-600 body-font h-screen">
        <div className="container mx-auto flex flex-col items-center justify-center h-full">
          <div className="w-full md:w-1/2 lg:w-1/3 bg-slate-50 p-10 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-12 text-center">Upload Your Model</h2>
              {/* <hr className="border-t border-gray-300 w-full my-4" /> */}
              <div>
                <label htmlFor="modelName" className="block text-lg font-semibold text-gray-800 mb-2">Model Name</label>
                <input
                  id="modelName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Model Name"
                  required
                  className="w-full p-2 border-b-2 bg-slate-50 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {name && <p className="mt-1 text-sm text-blue-500">{name}</p>}
              </div>
              <div>
                <label htmlFor="fileUpload" className="block text-lg font-semibold text-gray-800 mb-2">Select File</label>
                <input
                  id="fileUpload"
                  type="file"
                  accept=".glb,.gltf"
                  onChange={(e) => {
                    fileInputRef.current = e.target;
                    setIsFileSelected(true);
                    setSelectedFileName(e.target.files[0].name);
                  }}
                  required
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="w-full p-2 bg-blue-500 text-white rounded-md shadow-sm cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ease-in-out"
                >
                  Choose File
                </button>
                {selectedFileName && <p className="mt-1 text-sm text-blue-500">{selectedFileName}</p>} {/* Display the selected file name */}
              </div>
              {isFileSelected && (
                <>
                  {isLoading ? (
                    <>
                      {/*Loading button */}
                      <button
                        disabled={isLoading}
                        type="button"
                        className="w-full p-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 ease-in-out"
                      >
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 me-3 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Uploading...
                      </button>
                    </>
                  ) : (
                    <button
                      type="submit"
                      className="w-full p-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 ease-in-out"
                      disabled={!isFileSelected}
                    >
                      Upload
                    </button>
                  )}
                </>
              )}

            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default UploadGlb