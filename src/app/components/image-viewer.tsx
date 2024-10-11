"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import ImageSkeleton from "./image-skeleton";

interface ImageViewerProps {
  imageUrl: string;
  altText?: string;
}

export default function ImageViewer({ imageUrl, altText = "Imagen subida" }: ImageViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = () => {
    // En un caso real, aquí implementarías la lógica de descarga
    console.log("Descargando imagen:", imageUrl);
    // Ejemplo básico de descarga:
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "imagen-descargada.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    // Ejemplo básico de compartir (usando la API Web Share si está disponible):
    if (navigator.share) {
      navigator
        .share({
          title: "Mira esta imagen",
          text: "Échale un vistazo a esta imagen que he subido",
          // url: imageUrl,
          url: "https:imagen.com",
        })
        .catch(console.error);
    } else {
      alert("Compartir no está soportado en este navegador");
    }
  };

  return (
    <>
      {imageUrl !== "" ? (
        <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-48'>
          <div className='md:flex'>
            <div className='md:shrink-0'>
              <div className='h-48 w-full relative md:h-full md:w-48'>
                <Image
                  src={imageUrl}
                  alt={altText}
                  layout='fill'
                  objectFit='cover'
                  className={`duration-700 ease-in-out ${
                    isLoading ? "grayscale blur-2xl scale-110" : "grayscale-0 blur-0 scale-100"
                  }`}
                  onLoadingComplete={() => setIsLoading(false)}
                />
              </div>
            </div>
            <div className='p-8'>
              <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                Imagen subida
              </div>
              <p className='mt-2 text-slate-500'>
                Tu imagen ha sido subida exitosamente. Puedes descargarla o compartirla usando los botones de
                abajo.
              </p>
              <div className='mt-4 flex space-x-3'>
                <Button onClick={handleDownload} className='flex items-center'>
                  <Download className='mr-2 h-4 w-4' /> Descargar
                </Button>
                <Button onClick={handleShare} variant='outline' className='flex items-center'>
                  <Share2 className='mr-2 h-4 w-4' /> Compartir
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ImageSkeleton />
      )}
    </>
  );
}
