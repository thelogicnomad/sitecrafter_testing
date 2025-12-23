import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PricingTable } from '@/components/features/PricingTable';
import { Badge } from '@/components/ui/Badge';
import { HelpCircle } from 'lucide-react';

const PricingPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Header */}
      <section className="py-20 bg-slate-900 text-white">
        <Container className="text-center">
          <Badge className="mb-6 bg-accent text-slate-900 font-bold">SIMPLE PRICING</Badge>
          <h1 className="text-4xl md:text-7xl font-bold mb-6">Invest in your <span className="text-accent">Artistry</span></h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choose the plan that fits your musical goals. From casual learners to 
            dedicated professionals, we have a path for everyone.
          </p>
        </Container>
      </section>

      {/* Pricing Table */}
      <Section className="-mt-12">
        <Container>
          <PricingTable />
        </Container>
      </Section>

      {/* Institutional Section */}
      <Section className="bg-white">
        <Container>
          <div className="bg-primary rounded-3xl p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">For Music Schools & Universities</h2>
              <p className="text-xl text-blue-100">
                Bulk licenses, LMS integration, and administrative dashboards for 
                educational institutions looking to provide world-class Tabla curriculum.
              </p>
            </div>
            <button className="bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors whitespace-nowrap">
              Contact Enterprise Team
            </button>
          </div>
        </Container>
      </Section>

      {/* FAQ Preview */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              {[
                { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel your monthly or annual subscription at any time from your dashboard settings." },
                { q: "Do I need my own Tabla set to start?", a: "For the 'Introduction' course, you can learn the basics of rhythm without a set, but for technique, having your own instrument is highly recommended." },
                { q: "Are the certificates recognized?", a: "TaalVista certificates are recognized by several major Indian music conservatories and can be used for grade-level assessment." }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex gap-4">
                    <HelpCircle className="text-primary w-6 h-6 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                      <p className="text-slate-600">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default PricingPage;