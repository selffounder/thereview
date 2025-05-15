"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  {
    text: "Education is not the filling of a pail, but the lighting of a fire.",
    author: "William Butler Yeats"
  },
  {
    text: "The beautiful thing about learning is that nobody can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    author: "Malcolm X"
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss"
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    text: "Learning is a treasure that will follow its owner everywhere.",
    author: "Chinese Proverb"
  },
  {
    text: "Education is not preparation for life; education is life itself.",
    author: "John Dewey"
  },
  {
    text: "The roots of education are bitter, but the fruit is sweet.",
    author: "Aristotle"
  },
  {
    text: "Education is the key to unlocking the world, a passport to freedom.",
    author: "Oprah Winfrey"
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Education is not just about going to school and getting a degree. It's about widening your knowledge and absorbing the truth about life.",
    author: "Shakuntala Devi"
  },
  {
    text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
    author: "Brian Herbert"
  },
  {
    text: "Education is the movement from darkness to light.",
    author: "Allan Bloom"
  },
  {
    text: "The goal of education is not to increase the amount of knowledge but to create the possibilities for a child to invent and discover.",
    author: "Jean Piaget"
  },
  {
    text: "Education is the ability to listen to almost anything without losing your temper or your self-confidence.",
    author: "Robert Frost"
  },
  {
    text: "The best way to predict your future is to create it.",
    author: "Abraham Lincoln"
  },
  {
    text: "Education is not the learning of facts, but the training of the mind to think.",
    author: "Albert Einstein"
  },
  {
    text: "The only person who is educated is the one who has learned how to learn and change.",
    author: "Carl Rogers"
  },
  {
    text: "Education is the foundation upon which we build our future.",
    author: "Christine Gregoire"
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "Education is the key to success in life, and teachers make a lasting impact in the lives of their students.",
    author: "Solomon Ortiz"
  },
  {
    text: "The more you learn, the more you earn.",
    author: "Warren Buffett"
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    text: "The best education is not given to students; it is drawn out of them.",
    author: "Gerald Belcher"
  },
  {
    text: "Education is not just about going to school and getting a degree. It's about widening your knowledge and absorbing the truth about life.",
    author: "Shakuntala Devi"
  },
  {
    text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
    author: "Brian Herbert"
  },
  {
    text: "Education is the movement from darkness to light.",
    author: "Allan Bloom"
  },
  {
    text: "The goal of education is not to increase the amount of knowledge but to create the possibilities for a child to invent and discover.",
    author: "Jean Piaget"
  }
];

export function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isChanging, setIsChanging] = useState(false);

  const changeQuote = () => {
    setIsChanging(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setIsChanging(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(changeQuote, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100 dark:border-green-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white mb-4 leading-relaxed"
            >
              "{currentQuote.text}"
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-green-600 dark:text-green-400 font-medium"
            >
              — {currentQuote.author}
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-4 right-4">
          <button
            onClick={changeQuote}
            className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 