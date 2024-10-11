"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function LoadingModal({ isOpen = false, onClose = () => {} }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        onClose();
        setProgress(0);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [progress, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=' max-md: w-[85vw] md:max-w-[425px] mx-auto'>
        <div className='flex flex-col items-center justify-center p-4'>
          <h2 className='text-lg font-semibold mb-4'>Cargando archivo...</h2>
          <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4'>
            <div
              className='bg-black h-2.5 rounded-full transition-all duration-500 ease-out'
              style={{ width: `${progress}%` }}></div>
          </div>
          <p className='text-sm text-gray-500'>{Math.round(progress)}% completado</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
