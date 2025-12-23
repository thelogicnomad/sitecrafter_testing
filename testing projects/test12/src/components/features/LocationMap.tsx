import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export const LocationMap = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-xl shadow-2xl border border-zinc-100">
      <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
        <h3 className="text-3xl font-bold text-zinc-900 mb-8">Visit Us</h3>
        
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center shrink-0">
              <MapPin className="text-[#C5A059] w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-sm mb-1">Address</h4>
              <p className="text-zinc-600">123 Culinary Avenue, Gourmet District<br />New York, NY 10001</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center shrink-0">
              <Phone className="text-[#C5A059] w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-sm mb-1">Reservations</h4>
              <p className="text-zinc-600">+1 (212) 555-0198</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center shrink-0">
              <Mail className="text-[#C5A059] w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-sm mb-1">Email</h4>
              <p className="text-zinc-600">hello@savorybistro.com</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative min-h-[400px] bg-zinc-200">
        {/* Replace with actual Google Maps iframe in production */}
        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/1200x800/?map,city')] bg-cover bg-center grayscale opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 bg-white shadow-xl rounded-lg flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E63946] rounded-full animate-bounce flex items-center justify-center">
               <MapPin className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-sm">Savory Bistro</span>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded text-[10px] text-zinc-500">
          Interactive Map Preview
        </div>
      </div>
    </div>
  );
};