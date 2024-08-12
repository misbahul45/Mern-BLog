import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../../firebase"; // Path ke file inisialisasi Firebase Anda
import { FaGoogle } from "react-icons/fa6";
import { signInSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  location: string;
}

const Oauth = ({ location }: Props) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleGoogleOauth = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL }=resultFromGoogle.user
      const res=await fetch('/api/auth/google',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username:displayName,
          email,
          avatar:photoURL
        })
      })
      const data=await res.json()
      if(data.success){
        dispatch(signInSuccess(data.user))
        navigate({to:'/'})
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <button
      onClick={handleGoogleOauth}
      type="button"
      className="w-full text-center py-1.5 flex gap-3 justify-center items-center my-4 border-2 border-orange-600 hover:bg-orange-600 hover:text-slate-100 shadow-md shadow-slate-800/50 transition-all duration-100"
    >
      <FaGoogle className="dark:text-slate-100" />
      <span className="dark:text-slate-100">
        {location === "in" ? "Sign in with Google" : "Sign up with Google"}
      </span>
    </button>
  );
};

export default Oauth;
