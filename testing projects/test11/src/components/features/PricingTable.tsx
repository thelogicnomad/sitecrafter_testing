import React from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Standard',
    price: '$29',
    period: 'month',
    features: ['Access to Basic Rhythms', 'Weekly Group Session', 'Certificate of Completion', 'Mobile App Access'],
    highlight: false,
    cta: 'Start Learning'
  },
  {
    name: 'Pro Academy',
    price: '$79',
    period: 'month',
    features: ['All Standard Features', '1-on-1 Mentorship (2/mo)', 'Advanced Teental Mastery', 'Exclusive Workshop Access', 'Priority Support'],
    highlight: true,
    cta: 'Join Pro'
  },
  {
    name: 'Lifetime',
    price: '$499',
    period: 'once',
    features: ['Unlimited Lifetime Access', 'All Future Masterclasses', 'Private Community Access', 'VIP Concert Invites', 'Personalized Feedback'],
    highlight: false,
    cta: 'Get Lifetime'
  }
];

export const PricingTable = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={cn(
            'relative p-8 rounded-3xl border transition-all duration-300',
            plan.highlight 
              ? 'bg-[#1a1c23] border-[#2d5a88] shadow-2xl scale-105 z-10 text-white' 
              : 'bg-white border-slate-100 text-slate-900 hover:shadow-xl'
          )}
        >
          {plan.highlight && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge label="Most Popular" variant="accent" className="shadow-lg" />
            </div>
          )}
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">{plan.price}</span>
              <span className={cn('text-sm font-medium', plan.highlight ? 'text-slate-400' : 'text-slate-500')}>
                /{plan.period}
              </span>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <Check className={cn('w-5 h-5 shrink-0', plan.highlight ? 'text-[#fca311]' : 'text-[#2d5a88]')} />
                <span className={plan.highlight ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
              </li>
            ))}
          </ul>

          <Button 
            className="w-full" 
            variant={plan.highlight ? 'accent' : 'primary'}
          >
            {plan.cta}
          </Button>
        </div>
      ))}
    </div>
  );
};