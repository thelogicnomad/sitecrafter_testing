import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Check, Info, HelpCircle } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const plans = [
  {
    name: "Initiate",
    price: "0",
    description: "Perfect for casual users exploring VR fitness.",
    features: [
      "3 Basic Environments",
      "Daily 15-min Workouts",
      "Local Progress Tracking",
      "Community Forum Access"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Athlete",
    price: "19",
    description: "The complete experience for dedicated trainers.",
    features: [
      "Access to All 25+ Environments",
      "Unlimited Workout Duration",
      "Global Leaderboard Access",
      "Live Performance Dashboard",
      "Priority Support"
    ],
    cta: "Start 7-Day Trial",
    popular: true
  },
  {
    name: "Elite Squad",
    price: "49",
    description: "Group training and advanced coaching tools.",
    features: [
      "Everything in Athlete",
      "Up to 5 User Profiles",
      "Custom Challenge Creation",
      "Monthly Virtual Coaching",
      "Exclusive Beta Access"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-slate-900 py-20 text-white text-center">
        <Container>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Choose Your Level</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Flexible plans designed to help you reach your peak performance, whether you're a casual seeker or an elite athlete.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-sm font-bold", !isAnnual ? "text-white" : "text-slate-500")}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 bg-indigo-600 rounded-full relative p-1 transition-colors"
            >
              <div className={cn(
                "w-6 h-6 bg-white rounded-full transition-transform",
                isAnnual ? "translate-x-6" : "translate-x-0"
              )} />
            </button>
            <span className={cn("text-sm font-bold", isAnnual ? "text-white" : "text-slate-500")}>Annual (Save 20%)</span>
          </div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <Section className="-mt-12 relative z-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(plans ?? []).map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={cn(
                  "p-8 h-full flex flex-col relative overflow-hidden transition-all hover:shadow-2xl",
                  plan.popular ? "border-2 border-indigo-500 shadow-xl scale-105" : "border-slate-200"
                )}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">${isAnnual ? Math.floor(parseInt(plan.price) * 0.8) : plan.price}</span>
                      <span className="text-slate-500 font-medium">/mo</span>
                    </div>
                    <p className="text-slate-500 text-sm mt-4">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-10 flex-1">
                    {(plan.features ?? []).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={cn(
                      "w-full py-6 text-base font-bold",
                      plan.popular ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                    )}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-slate-50">
        <Container className="max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Everything you need to know about the CloudVerse.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Which VR headsets are supported?", a: "CloudVerse is currently available on Meta Quest 2/3/Pro, Valve Index, and HP Reverb G2. Support for Apple Vision Pro is coming soon." },
              { q: "Do I need a large space to work out?", a: "Most experiences require at least a 2m x 2m clear area. However, we have a 'Stationary Mode' for smaller spaces." },
              { q: "Can I cancel my subscription at any time?", a: "Yes, you can cancel your subscription from your account dashboard. You will retain access until the end of your current billing period." },
              { q: "Does it sync with my Apple Watch or Garmin?", a: "Yes, CloudVerse integrates with Apple Health, Google Fit, and Garmin Connect to sync all your workout data." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-500" />
                  {faq.q}
                </h4>
                <p className="text-slate-600 text-sm pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Pricing;