import { Skeleton } from "@/components/ui/skeleton";

export default function ImageSkeleton() {
  return (
    <div className='max-w-[85vw] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-28 md:mt-48'>
      <div className='md:flex'>
        <div className='md:shrink-0'>
          <Skeleton className='h-48 w-full md:h-full md:w-48' />
        </div>
        <div className='p-8'>
          <Skeleton className='h-4 w-1/4 mb-4' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-3/4' />
          <div className='mt-4 flex space-x-3'>
            <Skeleton className='h-10 w-28' />
            <Skeleton className='h-10 w-28' />
          </div>
        </div>
      </div>
    </div>
  );
}
