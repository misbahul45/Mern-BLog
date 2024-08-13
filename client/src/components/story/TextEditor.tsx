import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface Props{
  content:string,
  setContent:React.Dispatch<React.SetStateAction<string>>
}

const TextEditor = ({ content, setContent }:Props) => {
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };


  return (
    <ReactQuill 
      className="h-[50vh] dark:text-slate-100" 
      theme='snow'
      formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']}
      placeholder="Write something amazing..."
      modules={modules}
      onChange={setContent}
      value={content}
      />
  )
}

export default TextEditor
