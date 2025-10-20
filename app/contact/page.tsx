'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import AnimationWrapper from '@/components/ui/AnimationWrapper';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Our Studio',
    details: ['London, United Kingdom', 'By appointment only'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+44 20 1234 5678', 'Mon-Fri 9:00 AM - 6:00 PM GMT'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@gelebylolarose.com', 'We reply within 24 hours'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM'],
  },
];

const faqs = [
  {
    question: 'How long does shipping take?',
    answer: 'Standard UK shipping takes 3-5 business days. International shipping varies by location, typically 7-14 business days.',
  },
  {
    question: 'Do you offer custom designs?',
    answer: 'Yes! We offer bespoke gele designs for special occasions. Contact us to discuss your requirements.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unused items in original condition. Custom orders are final sale.',
  },
  {
    question: 'Do you offer wholesale pricing?',
    answer: 'Yes, we work with retailers and stylists. Please fill out the contact form selecting "Wholesale Inquiry" for more information.',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral/10 to-neutral/5 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimationWrapper animation="fadeUp">
            <p className="text-sm text-accent tracking-extra-wide uppercase mb-4">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-text-secondary">
              Have a question or special request? We&apos;d love to hear from you.
            </p>
          </AnimationWrapper>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <AnimationWrapper key={index} animation="fadeUp" delay={index * 0.1}>
                <motion.div
                  className="bg-neutral/5 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <info.icon className="w-6 h-6 text-accent" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-sm text-text-secondary">
                      {detail}
                    </p>
                  ))}
                </motion.div>
              </AnimationWrapper>
            ))}
          </div>

          {/* Contact Form and FAQs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimationWrapper animation="fadeUp">
                <div className="bg-white border border-neutral rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
                  <ContactForm />
                </div>
              </AnimationWrapper>
            </div>

            {/* FAQs */}
            <div className="space-y-6">
              <AnimationWrapper animation="fadeUp" delay={0.2}>
                <h2 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
              </AnimationWrapper>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <AnimationWrapper key={index} animation="fadeUp" delay={0.3 + index * 0.1}>
                    <motion.div
                      className="border border-neutral rounded-lg p-4 hover:border-accent transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <h3 className="font-semibold text-primary mb-2 flex items-start gap-2">
                        <MessageCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        {faq.question}
                      </h3>
                      <p className="text-sm text-text-secondary pl-7">{faq.answer}</p>
                    </motion.div>
                  </AnimationWrapper>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-neutral/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimationWrapper animation="fadeUp">
            <div className="bg-gradient-to-br from-neutral/10 to-neutral/20 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-muted">Map would be displayed here</p>
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Social Media CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimationWrapper animation="fadeUp">
            <h2 className="text-2xl font-bold text-primary mb-4">Follow Our Journey</h2>
            <p className="text-text-secondary mb-8">
              Stay connected for the latest collections, styling tips, and exclusive offers
            </p>
            <div className="flex justify-center gap-4">
              <motion.a
                href="https://instagram.com/gelebylolarose"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral/10 rounded-full text-text-secondary hover:bg-accent hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://facebook.com/gelebylolarose"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral/10 rounded-full text-text-secondary hover:bg-accent hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://twitter.com/gelebylolarose"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral/10 rounded-full text-text-secondary hover:bg-accent hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
            </div>
          </AnimationWrapper>
        </div>
      </section>
    </div>
  );
}