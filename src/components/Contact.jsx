import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { useTypewriter } from '../utils/useTypewriter';

const defaultIcons = { Email: Mail, Location: MapPin };

const Contact = ({ portfolioData }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { displayed: typedTitle, done: titleDone } = useTypewriter('Get In Touch', 80, 200);
  const { displayed: typedSub } = useTypewriter(portfolioData.contact.intro, 15, 1200);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((cur) => ({ ...cur, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '3c173d62-39d6-4039-bf76-73820e9ab6cf',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to: 'eeliya.nayeri@gmail.com',
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch {
      // silently fail
    }
  };

  return (
    <section className="flex min-h-screen items-center px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            {typedTitle}<span className={`inline-block w-[2px] h-[1em] bg-indigo-500 dark:bg-indigo-400 ml-0.5 align-middle ${titleDone ? 'animate-blink' : ''}`} />
          </h2>
          <p className="mt-2 min-h-[5.5rem] md:min-h-[3.75rem] max-w-lg text-gray-500 dark:text-gray-400">
            {typedSub}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Contact methods — glass cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="space-y-4"
          >
            {portfolioData.contact.methods.map((method) => {
              const Icon = defaultIcons[method.label];
              const Wrapper = method.href ? 'a' : 'div';
              const wrapperProps = method.href
                ? {
                    href: method.href,
                    target: method.href.startsWith('mailto:') ? undefined : '_blank',
                    rel: method.href.startsWith('mailto:') ? undefined : 'noopener noreferrer',
                  }
                : {};
              return (
                <motion.div
                  key={method.label}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Wrapper
                    {...wrapperProps}
                    className="glass flex gap-4 rounded-2xl p-5 cursor-pointer no-underline"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20">
                      {method.iconLight && method.iconDark ? (
                        <>
                          <img src={method.iconLight} alt="" aria-hidden="true" className="h-5 w-5 object-contain block dark:hidden" />
                          <img src={method.iconDark} alt="" aria-hidden="true" className="h-5 w-5 object-contain hidden dark:block" />
                        </>
                      ) : Icon ? (
                        <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      ) : null}
                    </div>
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-indigo-500/70 dark:text-indigo-400/60">
                        {method.label}
                      </p>
                      <p className="mt-1 text-[0.9rem] font-semibold text-gray-900 dark:text-white">
                        {method.value}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                        {method.note}
                      </p>
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact form — glass card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:from-indigo-500/20 dark:to-purple-500/20 dark:text-indigo-400">
                <Send className="h-4 w-4" />
              </div>
              <h3 className="text-[0.95rem] font-semibold text-gray-900 dark:text-white">
                Send a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full glass-subtle rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500/30 dark:text-white dark:placeholder:text-gray-600"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full glass-subtle rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500/30 dark:text-white dark:placeholder:text-gray-600"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="What would you like to talk about?"
                  className="w-full resize-none glass-subtle rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500/30 dark:text-white dark:placeholder:text-gray-600"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.98]"
              >
                Send Message
                <ArrowRight className="h-4 w-4" />
              </button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-xl p-3 text-sm text-green-700 dark:text-green-400"
                >
                  Message sent! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
