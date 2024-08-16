import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect } from 'react';
import { FaImage } from 'react-icons/fa6'
import app from '../../firebase';
import Loader from '../ui/Loader';

interface Props{
  imgUrl:string;
  setImgUrl:React.Dispatch<React.SetStateAction<string>>
}

const FormImage = ({ imgUrl, setImgUrl }:Props) => {
  const imgRef=React.useRef<HTMLInputElement | null>(null)
  const [image, setImage]=React.useState<null | File>(null)
  const [error, setError]=React.useState<boolean | null>(null)
  const [animateProgress, setAnimateProgress]=React.useState(false)

  const handleImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files![0]
    setImage(file)
  }

  const uploadImage=async()=>{
    const storage=getStorage(app)
    if(image){
      const fileName=new Date().getTime()+image.name
      const storageRef=ref(storage, fileName)
      const uploadTask=uploadBytesResumable(storageRef, image)

      uploadTask.on('state_changed',
        (snapshot)=>{
          setAnimateProgress(true)
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if(progress===100){
              setAnimateProgress(false)
            }
        },
        (error)=>{
            if(error){
                setError(true)
            }
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then(
                (downloadUrl)=>{
                    if(downloadUrl){
                        setImgUrl(downloadUrl)
                    }
                }
            )
        }
      )
    }
  }

  useEffect(()=>{
    if(image){
      uploadImage()
    }
  },[image])
  return (
    <>
        {animateProgress&&(
            <Loader size="md" />
        )}
        {error&&(
            <div className="px-4 py-2 rounded-xl bg-red-200">
                <span className="text-sm font-semibold text-red-800">Cannot Upload Image (file muss be less than 4mb)</span>
            </div>
        )}
      <div onClick={()=>imgRef.current?.click()} className={`w-full max-w-xl h-72 border-4 border-slate-400 dark:border-slate-600 rounded-xl ${!imgUrl&&"p-14 border-dotted"} cursor-pointer hover:scale-105 transition-all duration-100 group`}>
          {imgUrl?
            <img src={imgUrl} alt='image avatar' loading='lazy' className='w-full h-full object-cover rounded-xl' />
            :
            <>
              <FaImage className='w-full h-full dark:text-slate-400 group-hover:dark:text-slate-200 group-hover:text-slate-900 rounded-xl' />
              <p className='text-center text-lg dark:text-slate-400 font-semibold'>ImagePost</p>
            </> 
            }          
          <input type="file" ref={imgRef} className='hidden' accept="image/*" onChange={handleImageChange} />
      </div>
    </>
  )
}

export default FormImage
