
interface Props{
    size:'sm'|'md'|'lg'
}

const Loader = ({ size }: Props) => {
    const sizeClass = size === 'sm' ? 'size-5 border-t-2' : size === 'md' ? 'size-8 border-t-[3px]' : 'size-14 border-t-4'
  return (
    <div 
        className={`${sizeClass} rounded-full animate-spin dark:border-slate-100 border-slate-800`}
    />
  )
}

export default Loader
