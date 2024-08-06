import Loader from "../ui/Loader"

interface Props{
    error:string,
}

const ShowNotif = ({ error }: Props) => {
    if(error){
        return(
            <div className="animate-show-notif absolute top-20 right-0 z-50 transition-all duration-100">
                <div className="bg-red-500 text-slate-100 text-center py-2 px-3 rounded capitalize flex gap-2 items-center shadow-xl shadow-slate-500/50 dark:shadow-slate-100/50">
                   <span>{error}</span> 
                   <Loader size="sm" />
                </div>
            </div>
        )
    }
    return null
}

export default ShowNotif
