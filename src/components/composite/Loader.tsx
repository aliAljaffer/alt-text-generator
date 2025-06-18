import { Loader2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export const Loader = () => {
  return (
    <>
      <Card className="bg-gray-900 border-gray-800 rounded-none">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            <div className="text-center">
              <p className="text-gray-300 font-medium">
                Processing your image...
              </p>
              <p className="text-gray-500 text-sm mt-1">
                This may take a few moments
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
