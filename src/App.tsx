import type React from "react";

import { useState } from "react";
import { TitleImage } from "./components/composite/TitleImage";
import { Title } from "./components/composite/Title";
import { Caption } from "./components/composite/Caption";
import { UploadForm } from "./components/composite/UploadForm";
import { LoginButton } from "./components/composite/LoginButton";
import { useAuth } from "react-oidc-context";

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const authToken = user?.id_token;
  const UPLOAD_ENDPOINT =
    "https://0deiyjf4n7.execute-api.eu-north-1.amazonaws.com/upload-to-s3";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (result) {
      handleResetFields();
      return;
    }
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 10) {
      setError(
        `File size too large. Max file size is 10MB. Your file size is ${fileSizeInMB.toFixed(2)} MB.`
      );
      setPreviewUrl(null);
      return;
    }
    setError(null);
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("Submitting file:", selectedFile.name);
      setIsLoading(true);
      setResult(null);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("filename", selectedFile.name);
        formData.append("contentType", selectedFile.type);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        const res = await fetch(UPLOAD_ENDPOINT, {
          method: "POST",
          body: formData,
          mode: "cors",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "X-Requested-With": "XMLHttpRequest",
          },
          credentials: "same-origin",
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          setError(errorData.message || `Upload failed: ${res.status}`);
          return;
        }
        const result = await res
          .json()
          .then((data) => data.body.message as string)
          .catch((e) => {
            throw Error(e);
          });
        setResult(result);
        // setSelectedFile(null);
      } catch (error) {
        console.error("Error processing image:", error);
        setError(
          "Sorry, there was an error processing your image. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResetFields = () => {
    setResult(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
  };
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg space-y-6">
        {/* Placeholder Image */}
        <TitleImage />
        {/* Title */}
        <Title
          title="Textify.img"
          subtitle="Turn an image into descriptive text. Perfect for alt-text generation for HTML img tags!"
        />
        <Caption />
        <LoginButton />
        {/* Upload Form */}
        <UploadForm
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          resetFields={handleResetFields}
          previewUrl={previewUrl}
          selectedFile={selectedFile}
          isLoading={isLoading}
          error={error}
          result={result}
        />

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-500 text-xs">
            Your images are processed securely and never stored permanently.
            <br />
            All images are discarded from storage 1 hour after processing.
          </p>
        </div>
      </div>
    </div>
  );
}
