'use client';

import { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: 'How long does delivery take?',
    answer: 'We offer same-day delivery in Dhaka city for orders placed before 2 PM. For nationwide delivery, orders typically arrive within 2-3 business days. You will receive a tracking number once your order is shipped.',
  },
  {
    id: 2,
    question: 'What payment methods do you accept?',
    answer: 'We accept cash on delivery (COD), bKash, Nagad, Rocket, bank transfers, and all major credit/debit cards. All transactions are secured with SSL encryption for your safety.',
  },
  {
    id: 3,
    question: 'Do you offer product warranty?',
    answer: 'Yes, all our products come with manufacturer warranty. Electronics typically have 1-2 years warranty, while other products vary by category. Warranty details are provided with each product.',
  },
  {
    id: 4,
    question: 'Can I return or exchange a product?',
    answer: 'Yes, we offer a 7-day return policy for unused products in original packaging. For exchanges, please contact our customer support within 7 days of delivery. Some items like electronics may have specific return conditions.',
  },
  {
    id: 5,
    question: 'How can I track my order?',
    answer: 'Once your order is confirmed and shipped, you will receive an SMS and email with a tracking number. You can also track your order status by logging into your account or contacting our customer support at +880 1712-345678.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full px-8 md:px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-[#2563eb]">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about shopping with ShopHub
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none rounded-lg"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 pt-0 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

