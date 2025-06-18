import { ImageIcon } from "lucide-react";

export const TitleImage = () => {
  return (
    <div className="flex justify-center">
      <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700">
        <ImageIcon className="w-12 h-12 text-gray-500" />
      </div>
    </div>
  );
};
