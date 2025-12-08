import { LoaderCircle } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full min-h-[300px]">
      <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};

export default LoadingSpinner;