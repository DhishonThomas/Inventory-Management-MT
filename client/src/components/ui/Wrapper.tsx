import React from "react";

interface WrapperProps {
  title: string;
  children: React.ReactNode;
  minHeight?:string;
  onSubmit?:() => void
  maxWidthLg?:boolean;
  maxWidthMd?:boolean
  maxWidthMin?:boolean
  maxWidthMax?:boolean
  maxWidth2Xl?:boolean
  maxWidth3Xl?:boolean
  maxWidth4Xl?:boolean
  maxWidth5Xl?:boolean
  maxWidth6Xl?:boolean
  maxWidth7Xl?:boolean
  maxWidthXl?:boolean
  
}

  const Wrapper: React.FC<WrapperProps> = ({ title, children,minHeight="",  maxWidthMd=false,
    maxWidthXl=false,
    maxWidth2Xl=false,
    maxWidth3Xl=false,
    maxWidth4Xl=false,
    maxWidth5Xl=false,
    maxWidth6Xl=false,
    maxWidth7Xl=false,
    maxWidthMin=false,
    maxWidthLg=false,
    maxWidthMax=false,}) => {
return (
<div className={`flex flex-col ${minHeight}`}>
  <div className="flex flex-grow items-center justify-center bg-indigo-900 p-4">
    <div
      className={`bg-slate-700 text-white rounded-md shadow-lg p-6
        ${maxWidthLg ? "max-w-lg" : ""}
        ${maxWidth7Xl ? "max-w-7xl" : ""}
        ${maxWidth5Xl ? "max-w-5xl" : ""}
        ${maxWidth6Xl ? "max-w-6xl" : ""}
        ${maxWidth4Xl ? "max-w-4xl" : ""}
        ${maxWidth2Xl ? "max-w-2xl" : ""}
        ${maxWidthXl ? "max-w-xl" : ""}
        ${maxWidth3Xl ? "max-w-3xl" : ""}
        ${maxWidthMin ? "max-w-min" : ""}
        ${maxWidthMax ? "max-w-max" : ""}
        ${maxWidthMd ? "max-w-md" : ""}
        w-full`}
    >
      <h2 className="text-3xl font-bold text-center p-3 underline">
        {title}
      </h2>
      <hr className="w-full border-t border-gray-400/50 my-4" />
      <div className="font-bold text-lg">{children}</div>
    </div>
  </div>
</div>

);
    
  };
  

export default Wrapper;