import { Loader2, Upload } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "./Loader";
import { useAuth } from "react-oidc-context";

export type UploadFormProps = {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
  resetFields: () => void;
  previewUrl: string | null;
  selectedFile: File | null;
  result: string | null;
  error: string | null;
  isLoading: boolean;
};

export const UploadForm = ({
  handleSubmit,
  handleFileChange,
  resetFields,
  previewUrl,
  selectedFile,
  result,
  isLoading,
  error,
}: UploadFormProps) => {
  const { isAuthenticated } = useAuth();
  const isFileTooBig = selectedFile
    ? selectedFile.size / (1024 * 1024) > 10
    : true;
  return (
    <Card className="bg-gray-900 border-gray-800 ">
      <CardContent className="px-4 py-1 sm:p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Input */}
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                key={selectedFile?.name}
                id="file-select"
                className="h-fit bg-gray-800 border-gray-700 text-gray-100 file:bg-gray-700 file:text-gray-100 file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:bg-gray-750 focus:ring-gray-600 focus:border-gray-600"
              />
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="mt-4 relative">
                <div className="z-0 relative w-full h-48 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {isLoading && (
                    <div className="absolute top-0 left-0 w-full h-full rounded-none">
                      <Loader />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-2 text-center">
                  {selectedFile?.name}
                </p>
              </div>
            )}

            {/* Upload Area Visual Feedback */}
            {!selectedFile && (
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-gray-600 transition-colors">
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">
                  Click above to select an image
                </p>
              </div>
            )}
          </div>
          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}
          {result && (
            <div className="space-y-4 mt-4" id="result-section">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-100">
                  Image Description
                </h3>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <p className="text-gray-200 leading-relaxed">{result}</p>
              </div>
              {/* <Button
              onClick={() => {
                resetFields();
              }}
              variant="outline"
              className="w-full bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
            >
              Process Another Image
            </Button> */}
            </div>
          )}
          {/* Buttons! */}
          <div className="w-full space-y-2 flex-col sm:flex-row sm:space-x-4 sm:space-y-0 flex justify-center items-center">
            <Button
              type="submit"
              disabled={
                !selectedFile ||
                isLoading ||
                error !== null ||
                isFileTooBig ||
                !isAuthenticated
              }
              className="w-full sm:w-fit bg-gray-700 hover:bg-gray-600 text-gray-100 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : selectedFile && isAuthenticated ? (
                "Process Image"
              ) : !isAuthenticated ? (
                "Please Login"
              ) : (
                "Select an Image First"
              )}
            </Button>
            <Button
              onClick={() => {
                resetFields();
              }}
              disabled={!selectedFile || isLoading}
              type="reset"
              variant={!selectedFile ? "ghost" : "outline"}
              className="w-full sm:w-fit bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
            >
              Clear selection
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
