import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ReservationForm } from '@/components/features/ReservationForm';
import { Badge } from '@/components/ui/Badge';
import { Info, Calendar, Users, Clock } from 'lucide-react';

const ReservationPage = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Booking Hero */}
      <section className="relative py-20 bg-slate-900 text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          {!imgError ? (
            <img 
              src="https://images.unsplash.com/photo-1550966842-28474676be72?auto=format&fit=crop&q=80&w=1600" 
              alt="Dining Table"
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full bg-slate-800" />
          )}
        </div>
        <Container className="relative z-10 text-center">
          <Badge className="mb-4 bg-[#C5A059] text-white border-none">RESERVATIONS</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Book Your Table</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience. We recommend booking at least 48 hours in advance for weekend visits.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Reservation Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Secure Your Spot</h2>
              <ReservationForm />
            </div>
          </div>

          {/* Policy & Info Column */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <div className="flex items-center gap-3 mb-4 text-[#C5A059]">
                <Info className="w-6 h-6" />
                <h3 className="text-xl font-bold text-slate-900">Booking Policies</h3>
              </div>
              <ul className="space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full mt-2 shrink-0" />
                  <p>Groups of 8 or more require a credit card guarantee.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full mt-2 shrink-0" />
                  <p>We hold tables for a maximum of 15 minutes past reservation time.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full mt-2 shrink-0" />
                  <p>Cancellations must be made at least 24 hours in advance.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full mt-2 shrink-0" />
                  <p>Smart casual dress code is appreciated during dinner service.</p>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl shadow-lg text-white">
              <h3 className="text-xl font-bold mb-6">Need Assistance?</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-[#C5A059]" />
                  <div>
                    <p className="font-bold">Large Parties</p>
                    <p className="text-slate-400 text-sm">For events over 12 people, please contact our events team.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-[#C5A059]" />
                  <div>
                    <p className="font-bold">Private Dining</p>
                    <p className="text-slate-400 text-sm">Inquire about our exclusive Chef's Table experience.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#C5A059]" />
                  <div>
                    <p className="font-bold">Last Minute</p>
                    <p className="text-slate-400 text-sm">Walk-ins are welcome but subject to availability.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ReservationPage;