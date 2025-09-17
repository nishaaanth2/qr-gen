'use client';

import { motion } from 'framer-motion';
import { QrCode, Zap, ShieldCheck, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type FeatureItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const features: FeatureItem[] = [
  {
    title: 'Direct, No Redirects',
    description:
      'Generate QR codes that go straight to your URL. No middle pages, no tracking links.',
    Icon: QrCode,
  },
  {
    title: 'Fast & Reliable',
    description:
      'Client-side generation delivers instant results with rock-solid scannability.',
    Icon: Zap,
  },
  {
    title: 'Secure & Private',
    description:
      'Your QR code is generated in your browser. Nothing sensitive leaves your device.',
    Icon: ShieldCheck,
  },
  {
    title: 'Customizable',
    description:
      'Tune color, size, padding and add a logo while preserving readability.',
    Icon: Palette,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Features() {
  return (
    <section id="features" className="py-16">
      <div className="custom-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl md:mx-auto text-center"
        >
          <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Everything you need to create better QR codes
          </h2>
          <p className="mt-3 text-gray-600">
            QrGPT focuses on speed, privacy, and accuracy — with powerful customization.
          </p>
        </motion.div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Feature list"
        >
          {features.map((feature, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="bg-white border p-5 rounded-xl h-full"
            >
              <div className="flex items-center gap-3">
                <feature.Icon className="w-6 h-6 text-gray-800" />
                <h3 className="text-gray-800 font-semibold">{feature.title}</h3>
              </div>
              <p className="mt-3 text-gray-600">{feature.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

