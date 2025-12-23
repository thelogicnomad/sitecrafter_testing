import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollStack } from '@/components/features/ScrollStack';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Cake, Palette, Calendar, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

const CustomOrderPage = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    flavor: '',
    size: '',
    palette: '',
    designStyle: '',
    date: '',
    notes: ''
  });

  const totalSteps = 3;

  const stackItems = [
    {
      title: "Step 1: The Foundation",
      description: "Choose your base flavor and size. We offer everything from classic vanilla bean to exotic passion fruit sponges.",
      image: "https://images.unsplash.com/photo-1571115177098-24ec4209b5d5?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Step 2: The Artistry",
      description: "Select your color palette and decorative elements. Gold leaf, hand-piped florals, or minimalist marble glazes.",
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Step 3: The Occasion",
      description: "Provide the date and any custom messaging. We ensure your masterpiece arrives perfectly timed for your celebration.",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-serif mb-4">Request Received</h2>
          <p className="text-stone-600 mb-8">
            Thank you for choosing us for your special occasion. Our lead designer will review your request and contact you within 24 hours with a quote and consultation details.
          </p>
          <Button onClick={() => window.location.href = '/'}>Return Home</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Side: Visual Guide */}
          <div className="sticky top-24 hidden lg:block">
            <div className="mb-8">
              <Badge variant="outline" className="mb-4">Custom Experience</Badge>
              <h1 className="text-5xl font-serif mb-4">Design Your Masterpiece</h1>
              <p className="text-stone-600 text-lg">
                Follow our guided process to create a bespoke confection tailored to your unique vision.
              </p>
            </div>
            <ScrollStack>
              {stackItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-serif mb-2">{item.title}</h3>
                    <p className="text-stone-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </ScrollStack>
          </div>

          {/* Right Side: Form */}
          <Card className="p-8 shadow-xl border-stone-200">
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 w-12 rounded-full transition-colors ${step >= i ? 'bg-amber-600' : 'bg-stone-200'
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-stone-500">Step {step} of {totalSteps}</span>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Cake className="w-5 h-5 text-amber-600" />
                      <h3 className="text-xl font-serif">Flavor & Size</h3>
                    </div>

                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-sm font-medium text-stone-700">Base Flavor</span>
                        <select
                          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                          value={formData.flavor}
                          onChange={(e) => updateField('flavor', e.target.value)}
                          required
                        >
                          <option value="">Select a flavor...</option>
                          <option value="vanilla">Madagascar Vanilla Bean</option>
                          <option value="chocolate">70% Dark Chocolate Ganache</option>
                          <option value="lemon">Lemon Zest & Elderflower</option>
                          <option value="velvet">Classic Red Velvet</option>
                          <option value="pistachio">Pistachio & Rosewater</option>
                        </select>
                      </label>

                      <label className="block">
                        <span className="text-sm font-medium text-stone-700">Cake Size</span>
                        <select
                          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                          value={formData.size}
                          onChange={(e) => updateField('size', e.target.value)}
                          required
                        >
                          <option value="">Select a size...</option>
                          <option value="6inch">6" Small (Serves 8-10)</option>
                          <option value="8inch">8" Medium (Serves 15-20)</option>
                          <option value="10inch">10" Large (Serves 25-30)</option>
                          <option value="tiered">Multi-Tiered (Custom Quote)</option>
                        </select>
                      </label>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Palette className="w-5 h-5 text-amber-600" />
                      <h3 className="text-xl font-serif">Artistry & Design</h3>
                    </div>

                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-sm font-medium text-stone-700">Color Palette</span>
                        <Input
                          placeholder="e.g., Sage green, cream, and gold accents"
                          value={formData.palette}
                          onChange={(e) => updateField('palette', e.target.value)}
                          required
                        />
                      </label>

                      <label className="block">
                        <span className="text-sm font-medium text-stone-700">Design Style</span>
                        <select
                          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                          value={formData.designStyle}
                          onChange={(e) => updateField('designStyle', e.target.value)}
                          required
                        >
                          <option value="">Select a style...</option>
                          <option value="minimalist">Modern Minimalist</option>
                          <option value="floral">Botanical / Floral</option>
                          <option value="textured">Textured Palette Knife</option>
                          <option value="vintage">Vintage Lambeth Piping</option>
                          <option value="abstract">Abstract / Marble</option>
                        </select>
                      </label>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-amber-600" />
                      <h3 className="text-xl font-serif">Final Details</h3>
                    </div>

                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-sm font-medium text-stone-700">Event Date</span>
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => updateField('date', e.target.value)}
                          required
                        />
                      </label>

                      <label className="block">
                        <span className="text-sm font-medium text-stone-700">Additional Notes & Requests</span>
                        <textarea
                          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border min-h-[120px]"
                          placeholder="Tell us about the occasion, any allergies, or specific inscriptions..."
                          value={formData.notes}
                          onChange={(e) => updateField('notes', e.target.value)}
                        />
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-12 flex justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>

                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700"
                  >
                    Submit Request <Sparkles className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomOrderPage;