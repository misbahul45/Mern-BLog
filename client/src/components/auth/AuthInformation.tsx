
interface Props {
    errors:{
        username?:{
            message?:string
        }
        email?:{
            message?:string
        }
        password?:{
            message?:string
        }
    },
    title?:string
}

const AuthInformation = ({errors, title}:Props) => {
  return (
    <div className="mx-auto mb-7 px-4 py-2  dark:bg-slate-600 dark:text-slate-100 rounded-lg shadow-lg shadow-slate-800/60 dark:shadow-slate-300/60">
        {errors.username || errors.email || errors.password?
        <>
            <h1 className="text-xl font-bold text-center text-red-400">Errors in Form</h1>
            <ul className="list-disc list-inside text-red-400">
                {errors.username?.message && <li>{errors.username?.message}</li>}
                {errors.email?.message && <li>{errors.email?.message}</li>}
                {errors.password?.message && <li>{errors.password?.message}</li>}
            </ul>
        </>
        :
        <>
            <h1 className="text-xl font-bold text-center">{title?"Update Validations" : "SignUp Validations"}</h1>
            <ul className="list-disc list-inside">
                <li>Username must be between 3 and 20 characters</li>
                <li>Email must be valid</li>
                <li>Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character</li>
            </ul>
        </>
        }
    </div>
  )
}

export default AuthInformation
