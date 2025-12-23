import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { RotatingText } from '@/components/ui/RotatingText';
import { Music, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-0" />
      
      <Container className="relative z-10 text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center animate-bounce">
            <Music className="text-slate-900 w-12 h-12" />
          </div>
        </div>
        
        <h1 className="text-9xl font-black mb-4 tracking-tighter">404</h1>
        
        <div className="text-3xl md:text-5xl font-bold mb-8">
          The rhythm is <br />
          <RotatingText 
            texts={['Broken', 'Off-beat', 'Missing', 'Lost']}
            mainClassName="text-accent inline-block"
            rotationInterval={2000}
          />
        </div>
        
        <p className="text-xl text-slate-400 max-w-lg mx-auto mb-12">
          It seems the page you are looking for has been caught in a complex 
          Tihai and hasn't returned to the Sam yet.
        </p>
        
        <Link to="/">
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-10 h-14 text-lg font-bold">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default NotFoundPage;