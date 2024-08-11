import React, { useEffect } from "react"
import app from "../../firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"

interface Props{
    avatar:string
    imageUrl:string | null
    setImageUrl:React.Dispatch<React.SetStateAction<string | null>>
}
const FormImage = ({avatar, imageUrl, setImageUrl }:Props) => {
    const imageRef=React.useRef<HTMLInputElement>(null)
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
                    console.log(error)
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadUrl)=>{
                            console.log('File available at', downloadUrl);
                            setImageUrl(downloadUrl)
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


  return (
    <>   
        {animateProgress&&<div className=" animate-animate-progress absolute top-0 left-0 h-2 bg-blue-500" />}
        <div onClick={()=>imageRef.current?.click()} className={`relative p-1.5 rounded-full bg-slate-700`}>
            <img src={imageUrl || avatar} alt="user avatar" className='size-20 rounded-full object-cover z-20' />
        </div>
        <input type="file" accept="image/*" ref={imageRef} onChange={handleImageChange} className="hidden" />
    </>
  )
}

export default FormImage
