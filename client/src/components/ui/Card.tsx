import React from "react";

interface CardProps {
  children: string | React.ReactNode;
  flex?: boolean;
  justifyCenter?: boolean;
  justifyEnd?:boolean;
  textColour?: string;
  paddingX?: string;
  paddingY?: string;
  marginY?: string;
  widthFull?: boolean;
  bgColour?: string;
  bgOpacity?:string;
  width?: string;
  padding?:string;
  marginT?:string;
  marginB?:string;
  fixed?:boolean
  defaultClassName?:string
  roundedLg?:boolean;
  itemsCenter?:boolean
  roundedMd?:boolean
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
  border?:boolean
  borderColor?:string
  spaceX?:string

}

const Card: React.FC<CardProps> = ({
  children,
  flex = false,
  justifyCenter = false,
  justifyEnd=false,
  bgColour = "",
  textColour = "text-white",
  padding="",
  paddingX = "",
  paddingY = "",
  marginY = "",
  widthFull = false,
  width = "",
  marginT="",
  marginB="",
  fixed=false,
  itemsCenter=false,
  defaultClassName="",
  bgOpacity="",
  border=false,
  borderColor="",
  roundedMd=false,
  roundedLg=false,
  maxWidthMd=false,
  maxWidthXl=false,
  maxWidth2Xl=false,
  maxWidth3Xl=false,
  maxWidth4Xl=false,
  maxWidth5Xl=false,
  maxWidth6Xl=false,
  maxWidth7Xl=false,
  maxWidthMin=false,
  maxWidthMax=false,
  spaceX=""
}) => {
  return (
    <div
      className={`${flex ? "flex" : ""} ${borderColor} mb-${marginB} ${border?"border":""} ${roundedLg?"rounded-lg":""} ${maxWidth7Xl?"max-w-7xl":""} ${maxWidth5Xl?"max-w-5xl":""} ${maxWidth6Xl?"max-w-6xl":""} ${maxWidth4Xl?"max-w-4xl":""} ${maxWidth2Xl?"max-w-2xl":""} ${maxWidthXl?"max-w-xl":""} ${maxWidth3Xl?"max-w-3xl":""} ${maxWidthMin} ${maxWidthMax} ${maxWidthMd?"max-w-md":""} ${
        justifyCenter ? "justify-center" : ""
      } ${bgOpacity} ${justifyEnd} ${roundedMd} ${itemsCenter?"items-center":""} ${defaultClassName} ${
        widthFull ? "w-full" : ""
      } ${fixed?"fixed":""} ${marginY} ${paddingY} mt-${marginT} px-${paddingX} ${textColour} ${bgColour} ${width} space-x-${spaceX} p-${padding}`}

    >
      {children}
    </div>
  );
};

export default Card;
