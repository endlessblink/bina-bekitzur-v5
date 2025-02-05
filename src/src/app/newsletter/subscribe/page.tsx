'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SubscribeResponse {
  success: boolean;
  message: string;
}

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data: SubscribeResponse = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(data.message || 'אירעה שגיאה בהרשמה לניוזלטר');
        return;
      }

      setStatus('success');
      setMessage(data.message || 'נרשמת בהצלחה לניוזלטר!');
      setEmail('');
      setName('');
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('אירעה שגיאה בהרשמה לניוזלטר');
      }
      setStatus('error');
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              הצטרפו לניוזלטר בינה בקיצור
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              קבלו עדכונים שבועיים על חידושים בעולם הבינה המלאכותית, כלים חדשים, וטיפים שימושיים - ישירות לתיבת המייל שלכם.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="השם שלך"
                dir="rtl"
                className="block w-full rounded-xl border-0 px-4 py-3.5 text-white text-right shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 bg-white/5 backdrop-blur-sm"
              />
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="כתובת האימייל שלך"
                dir="ltr"
                required
                className="block w-full rounded-xl border-0 px-4 py-3.5 text-white text-left shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 bg-white/5 backdrop-blur-sm"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              className={`rounded-xl bg-purple-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50 disabled:cursor-not-allowed ${
                status === 'loading' ? 'animate-pulse' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'loading' ? 'שולח...' : 'הרשמה לניוזלטר'}
            </motion.button>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-lg p-4 mt-4 text-center ${
                  status === 'success'
                    ? 'bg-green-500/10 text-green-400 ring-1 ring-inset ring-green-500/20'
                    : 'bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/20'
                }`}
              >
                {message}
              </motion.div>
            )}
          </motion.form>

          <motion.p
            className="mt-8 text-sm leading-7 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            אנחנו מכבדים את הפרטיות שלכם. ניתן לבטל את המנוי בכל עת.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
