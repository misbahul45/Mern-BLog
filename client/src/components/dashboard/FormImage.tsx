import React, { useEffect } from "react"
import app from "../../firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { FaImage } from "react-icons/fa6"
import Loader from "../ui/Loader"

interface Props{
    avatar:string
    imageUrl:string | null
    setImageUrl:React.Dispatch<React.SetStateAction<string | null>>
}
const FormImage = ({avatar, imageUrl, setImageUrl }:Props) => {
    const imageRef=React.useRef<HTMLInputElement>(null)
    const [error, setError]=React.useState<boolean | null>(null)
    const [imageFile, setImageFile]=React.useState<File | null>(null)
    const [animateProgress, setAnimateProgress]=React.useState(false)

    const handleImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file=e.target.files![0]
        setImageFile(file)
    }
    const uploadImage=async()=>{
        const storage=getStorage(app);

        if (imageFile) {
            const fileName=new Date().getTime()+imageFile.name
            const storageRef=ref(storage, fileName)
            const uploadTask=uploadBytesResumable(storageRef, imageFile)

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
                                setImageUrl(downloadUrl)
                            }
                        }
                    )
                }

            )
        }
    }

    useEffect(()=>{
        if(imageFile){
            uploadImage()
        }
    },[imageFile])

    useEffect(()=>{
        if(error){
            setTimeout(()=>{
                setError(false)    
            },2500)
        }
    },[error])

  return (
    <>   
        <div onClick={()=>imageRef.current?.click()} className={`relative p-1.5 rounded-full bg-slate-700 group`}>
            <FaImage className="text-xl z-50 text-slate-400 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer hidden group-hover:block" />
            <img src={imageUrl || avatar} alt="user avatar" className='size-20 rounded-full object-cover z-20' />
        </div>
        {animateProgress&&(
            <Loader size="md" />
        )}
        {error&&(
            <div className="px-4 py-2 rounded-xl bg-red-200">
                <span className="text-sm font-semibold text-red-800">Cannot Upload Image (file muss be less than 4mb)</span>
            </div>
        )}
        <input type="file" accept="image/*" ref={imageRef} onChange={handleImageChange} className="hidden" />
    </>
  )
}

export default FormImage
