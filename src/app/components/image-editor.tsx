"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Crop, Eraser, Palette, Replace, RotateCcw, Scissors, Send } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ImageEditorProps {
  imageUrl: string;
}

export default function ImageEditor({ imageUrl }: ImageEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentEditType, setCurrentEditType] = useState("");
  const [prompt, setPrompt] = useState("");
  const [background, setBackground] = useState("");

  useEffect(() => {
    const updateSliderPosition = (clientX: number) => {
      if (containerRef.current && sliderRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newPosition = ((clientX - containerRect.left) / containerRect.width) * 100;
        setSliderPosition(Math.max(0, Math.min(100, newPosition)));
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateSliderPosition(e.clientX);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleTouchStart = (e: TouchEvent) => {
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    };

    const handleTouchMove = (e: TouchEvent) => {
      updateSliderPosition(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    if (sliderRef.current) {
      sliderRef.current.addEventListener("mousedown", handleMouseDown);
      sliderRef.current.addEventListener("touchstart", handleTouchStart);
    }

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener("mousedown", handleMouseDown);
        sliderRef.current.removeEventListener("touchstart", handleTouchStart);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handlePromptSubmit = () => {
    setIsEditing(true);
    setIsModalOpen(false);
    setBackground(prompt);
    setIsEditing(false);
  };

  return (
    <div className=''>
      <div>
        <div className='container mx-auto'>
          <div className='mb-4 relative'>
            <div ref={containerRef} className='relative w-full' style={{ aspectRatio: "16/9" }}>
              {isLoading && <Skeleton className='w-full h-full absolute inset-0' />}
              <Image
                src={imageUrl}
                alt='Imagen original'
                layout='fill'
                objectFit='cover'
                onLoad={() => setIsLoading(false)}
              />
              <div
                className='absolute inset-0 overflow-hidden'
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}>
                <CldImage
                  src={imageUrl}
                  alt='Imagen editada'
                  // width={"960"}
                  // height={"960"}
                  fill
                  crop={"fill"}
                  replaceBackground={background}
                  onLoad={() => setIsLoading(false)}
                  className='h-full object-cover'
                />
              </div>
              <div
                ref={sliderRef}
                className='absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize'
                style={{ left: `${sliderPosition}%` }}>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center'>
                  <div className='w-0.5 h-4 bg-gray-400'></div>
                </div>
              </div>
            </div>
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 rounded-full px-4 py-2'>
              <TooltipProvider>
                <div className='flex space-x-4'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={isEditing}
                        className='text-white hover:text-blue-400 transition-colors'>
                        <Eraser className='w-5 h-5' />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remover fondo</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        disabled={isEditing}
                        className='text-white hover:text-blue-400 transition-colors'>
                        <Crop className='w-5 h-5' />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Recortar imagen</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        disabled={isEditing}
                        className='text-white hover:text-blue-400 transition-colors'>
                        <Palette className='w-5 h-5' />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cambiar color</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        disabled={isEditing}
                        className='text-white hover:text-blue-400 transition-colors'>
                        <Scissors className='w-5 h-5' />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remover elemento</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        disabled={isEditing}
                        className='text-white hover:text-blue-400 transition-colors'>
                        <Replace className='w-5 h-5' />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reemplazar elemento</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        disabled={isEditing}
                        className='text-white hover:text-blue-400 transition-colors'>
                        <RotateCcw className='w-5 h-5' />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Restaurar imagen</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </div>

          <AnimatePresence>
            {isModalOpen && (
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className='sm:max-w-[425px] bg-white text-gray-800 border border-gray-200 shadow-lg'>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}>
                    <div className='flex items-center space-x-2 mb-4'>
                      {currentEditType === "removeBackground" && <Eraser className='w-6 h-6 text-blue-500' />}
                      {currentEditType === "crop" && <Crop className='w-6 h-6 text-blue-500' />}
                      {currentEditType === "changeColor" && <Palette className='w-6 h-6 text-blue-500' />}
                      {currentEditType === "removeElement" && <Scissors className='w-6 h-6 text-blue-500' />}
                      {currentEditType === "replaceElement" && <Replace className='w-6 h-6 text-blue-500' />}
                      {currentEditType === "restore" && <RotateCcw className='w-6 h-6 text-blue-500' />}
                      <h2 className='text-xl font-semibold capitalize text-gray-800'>{currentEditType}</h2>
                    </div>
                    <div className='mb-4'>
                      <Input
                        id='prompt'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className='bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500'
                        placeholder='Describe tu edición...'
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type='submit'
                        onClick={handlePromptSubmit}
                        className='w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200'>
                        <Send className='w-4 h-4 mr-2' />
                        Aplicar
                      </Button>
                    </DialogFooter>
                  </motion.div>
                </DialogContent>
              </Dialog>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
