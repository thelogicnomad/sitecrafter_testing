import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TestimonialCarousel } from '@/components/features/TestimonialCarousel';
import { Check, Star, Info, HelpCircle } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for getting started with mindfulness.",
      features: ["5 Basic Meditations", "Daily Breathing Guides", "Web Player Access", "Mobile App (Limited)"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Mindful Pro",
      price: isAnnual ? "9" : "12",
      description: "Full access to our library and advanced tracking.",
      features: ["Unlimited Library Access", "Custom Session Lengths", "Offline Mode", "Stress Analytics", "Priority Support"],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Teams",
      price: isAnnual ? "49" : "59",
      description: "Mindfulness for your entire organization.",
      features: ["Up to 10 Members", "Team Progress Dashboard", "Custom Content Paths", "Dedicated Success Manager", "SSO Integration"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Pricing Header */}
      <section className="bg-white py-20 border-b border-slate-100">
        <Container className="text-center">
          <Badge className="bg-indigo-100 text-indigo-600 mb-4">Pricing Plans</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Invest in Your Peace</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Choose the plan that fits your lifestyle. Save up to 25% with annual billing.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={cn("text-sm font-medium", !isAnnual ? "text-slate-900" : "text-slate-500")}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-7 bg-indigo-600 rounded-full relative transition-colors duration-200"
            >
              <div className={cn(
                "absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 shadow-sm",
                isAnnual ? "translate-x-7" : "translate-x-0"
              )} />
            </button>
            <span className={cn("text-sm font-medium", isAnnual ? "text-slate-900" : "text-slate-500")}>
              Yearly <span className="text-emerald-500 ml-1">(Save 25%)</span>
            </span>
          </div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <Section className="-mt-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(plans ?? []).map((plan, index) => (
              <motion.div
                key={plan?.name ?? index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={cn(
                  "p-8 relative overflow-hidden h-full flex flex-col transition-all duration-300",
                  plan.popular ? "border-indigo-500 ring-2 ring-indigo-500/20 shadow-2xl" : "border-slate-200"
                )}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan?.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold text-slate-900">${plan?.price}</span>
                    <span className="text-slate-500">/month</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-8">{plan?.description}</p>
                  
                  <div className="space-y-4 mb-8 flex-grow">
                    {(plan?.features ?? []).map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={cn(
                      "w-full h-12 text-base font-bold",
                      plan.popular ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {plan?.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section className="bg-slate-900 overflow-hidden">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Trusted by 50,000+ Users</h2>
            <p className="text-slate-400 text-lg">Hear from the people who changed their workday with MindfulBreaks.</p>
          </div>
          <TestimonialCarousel />
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-white">
        <Container className="max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How long are the meditation sessions?", a: "Our sessions range from 5 to 20 minutes, specifically designed to fit into short work breaks." },
              { q: "Can I cancel my subscription at any time?", a: "Yes, you can cancel your subscription from your account settings at any time without any hidden fees." },
              { q: "Is there a student or non-profit discount?", a: "Absolutely! Please reach out to our support team with your credentials to get a 50% discount." },
              { q: "Does the app work offline?", a: "Pro members can download any session for offline listening directly within our mobile app." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h4>
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Pricing;