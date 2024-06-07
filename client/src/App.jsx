import { useEffect, useState } from 'react';
import './App.css'
import UploadGlb from './components/UploadGlb'
import ModelViewer from './components/modelViewer'
import Axios_Instance from './api/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [models, setModels] = useState([]);
  const [reLoad, setReLoad] = useState(false)

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await Axios_Instance.get('/models');
        setModels(res.data.models);
      } catch (error) {
        console.error('Failed to fetch models:', error);
      }
    };
    fetchModels();
  }, [reLoad]);


  return (
    <>
      <div className='  bg-blue-50'>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <UploadGlb setReLoad={setReLoad} reLoad={reLoad} />

        <h1 className='text-3xl font-semibold text-center mb-16'>GLB Models Dashboard</h1>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 ">
            {models.map((model) => (
              <div key={model._id} className='text-xl font-medium text-center mb-4 '>
                <h2 className='pb-3'>{model?.name}</h2>
                <ModelViewer glbUrl={`http://localhost:4000/${model.data}?cacheBust=${model._id}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
