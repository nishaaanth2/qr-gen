'use client';

import NavLink from './NavLink';
import { motion } from 'framer-motion';

 

export default function Hero() {
  return (
    <section id="hero">
      <div className="custom-screen pt-28 text-gray-600">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl text-gray-800 font-extrabold mx-auto sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Generate Direct QR Codes Without Redirects
          </motion.h1>
          <motion.p
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Unlike other QR generators, QRGPT creates direct QR codes without any redirects. 
            Generate secure, fast-loading QR codes in seconds, completely free.
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-x-3 font-medium text-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NavLink
              href="/start"
              className="text-white bg-gray-800 hover:bg-gray-600 active:bg-gray-900 "
            >
              Create Your Direct QR Code
            </NavLink>
            <NavLink
              target="_blank"
              href="https://github.com/Nutlope/qrGPT"
              className="text-gray-700 border hover:bg-gray-50"
              scroll={false}
            >
              Discover the Difference
            </NavLink>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
