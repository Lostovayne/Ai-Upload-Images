"use client";

import { CloudUpload, File, Trash, Upload, FileImage } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Navbar from "./navbar";
import { Button } from "@/components/ui/button";
import LoadingModal from "./loading-modal";
import ImageViewer from "./image-viewer";

export default function DragAndDrop() {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const handleUpload = async () => {
    setIsLoading(true);
    console.log("Uploading file:", files[0]);

    setTimeout(() => {
      setImageUrl(URL.createObjectURL(files[0]));
    }, 6000);
    // setFiles([]);
  };

  return (
    <div className='min-h-screen bg-[#f9fafb]'>
      <Navbar />
      <LoadingModal isOpen={isLoading} onClose={() => setIsLoading(false)} />

      {!isLoading && !imageUrl ? (
        <div className='flex items-center h-full justify-center mt-48   p-4'>
          <div className=' '>
            <div className='bg-white p-2.5 rounded-xl h-96 w-[700px] shadow-lg'>
              <div
                {...getRootProps()}
                className={`bg-white h-full flex items-center justify-center flex-col border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-primary bg-primary/10" : "border-gray-200/70 hover:border-gray-400"
                }`}>
                <input {...getInputProps()} />
                <Upload className='mx-auto h-12 w-12 text-blue-500' />
                <div className='mt-2 text-sm text-gray-600'>
                  {isDragActive ? (
                    <p>Drop the files here...</p>
                  ) : (
                    <p>
                      <span className='text-zinc-900 font-semibold'>Drag & drop a file or </span>
                      <span className='text-blue-600 font-semibold'>browse files</span>
                    </p>
                  )}
                </div>
                <p className='text-sm font-extralight text-zinc-500'>JPG, PNG or GIF - Max file size 2MB</p>
              </div>
            </div>
            {files.length > 0 && (
              <div className='mt-4 bg-white rounded-lg shadow p-4'>
                <h2 className='text-lg font-semibold mb-2'>Archivos seleccionados:</h2>
                <ul className='space-y-2'>
                  {files.map((file, index) => (
                    <li key={index} className='flex items-center justify-between bg-gray-50 p-2 rounded'>
                      <div className='flex items-center'>
                        <File className='h-5 w-5 text-gray-400 mr-2' />
                        <span className='text-sm text-gray-700'>{file.name}</span>
                      </div>

                      <div className='flex  items-center gap-2'>
                        <button
                          arual-label='Subir archivo'
                          onClick={() => handleUpload()}
                          className='text-zinc-700 hover:text-zinc-500'>
                          <CloudUpload className='h-5 w-5' />
                        </button>
                        <button
                          onClick={() => removeFile(file)}
                          className='text-zinc-700 hover:text-zinc-500'
                          aria-label='Eliminar archivo'>
                          <div className='flex items-center'>
                            <Trash className='h-5 w-5' />
                          </div>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <ImageViewer imageUrl={imageUrl} altText='Imagen subida' />
      )}
    </div>
  );
}
