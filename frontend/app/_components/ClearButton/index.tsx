import Image from "next/image"
import ClearButtonIcon from '../../../public/icons/circle-x.png'

interface ClearButtonProps {
  setting: string;
  handleClear: () => void;
}

export default function ClearButton ({ setting, handleClear }: ClearButtonProps) {

  return (
    <>
      <Image 
        src={ClearButtonIcon}
        width={0}
        height={0}
        alt="Cross icon for clearing input field"
        className={setting}
        onClick={handleClear}
      />
    </>
  )
}