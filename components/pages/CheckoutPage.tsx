"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Lock, User, Mail, MapPin, Phone } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { useClerk, useUser } from '@clerk/nextjs';

type CheckoutMode = 'select' | 'guest' | 'login' | 'signup';

export function CheckoutPage() {
  const { items, totalPrice, syncNow } = useCart();
  const router = useRouter();
  const [mode, setMode] = useState<CheckoutMode>('select');
  const { openSignIn, openSignUp } = useClerk();
  const { isSignedIn, user } = useUser();

  // Signed-in users skip the account prompt and get their email prefilled.
  useEffect(() => {
    if (!isSignedIn) return;
    setMode('guest');
    const email = user?.primaryEmailAddress?.emailAddress;
    if (email) {
      setFormData((prev) => (prev.email ? prev : { ...prev, email }));
    }
  }, [isSignedIn, user]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    deliveryInstructions: '',
  });

  useEffect(() => {
    if (items.length === 0) router.replace('/cart');
  }, [items.length, router]);

  if (items.length === 0) return null;

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    try {
      // Make sure the server cart reflects the latest client cart
      // before the session is built from it.
      await syncNow();

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
          line1: formData.address,
          city: formData.city,
          state: formData.state.trim().toUpperCase(),
          zip: formData.zip.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setFieldErrors(data.details?.fieldErrors ?? {});
        setFormError(
          data.details?.fieldErrors
            ? 'Please fix the highlighted fields below.'
            : data.error ?? 'Something went wrong. Please try again.',
        );
        setSubmitting(false);
        return;
      }

      // Hand off to Stripe's hosted payment page.
      window.location.href = data.url;
    } catch {
      setFormError('Unable to reach the server. Please try again.');
      setSubmitting(false);
    }
  };

  const fieldError = (key: string) => fieldErrors[key]?.[0];
  const clientFieldMap: Record<string, string> = {
    line1: 'address',
  };
  void clientFieldMap;

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1
            className="text-4xl sm:text-5xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Checkout
          </h1>
          <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            You're just a few steps away from your next chapter
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {mode === 'select' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {/* Guest Checkout */}
                <div
                  onClick={() => setMode('guest')}
                  className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#3AA7FF]/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3
                        className="text-2xl mb-2 text-white"
                        style={{ fontFamily: 'var(--font-heading-secondary)' }}
                      >
                        Guest Checkout
                      </h3>
                      <p className="text-white/60 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                        Continue without creating an account
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3AA7FF]/20 to-[#F5B84B]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <User className="w-6 h-6 text-[#3AA7FF]" />
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-white/70 text-sm">
                      <span className="text-[#3AA7FF]">✓</span>
                      <span style={{ fontFamily: 'var(--font-body)' }}>Fastest checkout</span>
                    </li>
                    <li className="flex items-center gap-2 text-white/70 text-sm">
                      <span className="text-[#3AA7FF]">✓</span>
                      <span style={{ fontFamily: 'var(--font-body)' }}>No password required</span>
                    </li>
                  </ul>
                  <button className="w-full px-6 py-3 rounded-full bg-[#3AA7FF]/20 text-[#3AA7FF] hover:bg-[#3AA7FF]/30 transition-all">
                    <span style={{ fontFamily: 'var(--font-nav)' }}>
                      Checkout as Guest
                    </span>
                  </button>
                </div>

                {/* Login */}
                <div
                  onClick={() => openSignIn()}
                  className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#F5B84B]/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3
                        className="text-2xl mb-2 text-white"
                        style={{ fontFamily: 'var(--font-heading-secondary)' }}
                      >
                        Sign In
                      </h3>
                      <p className="text-white/60" style={{ fontFamily: 'var(--font-body)' }}>
                        For returning readers
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F5B84B]/20 to-[#F28C28]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Lock className="w-6 h-6 text-[#F5B84B]" />
                    </div>
                  </div>
                  <button className="w-full px-6 py-3 rounded-full bg-[#F5B84B]/20 text-[#F5B84B] hover:bg-[#F5B84B]/30 transition-all">
                    <span style={{ fontFamily: 'var(--font-nav)' }}>
                      Sign In
                    </span>
                  </button>
                </div>

                {/* Create Account */}
                <div
                  onClick={() => openSignUp()}
                  className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#F28C28]/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3
                        className="text-2xl mb-2 text-white"
                        style={{ fontFamily: 'var(--font-heading-secondary)' }}
                      >
                        Create Account
                      </h3>
                      <p className="text-white/60 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                        Optional benefits for registered users
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F28C28]/20 to-[#3AA7FF]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <User className="w-6 h-6 text-[#F28C28]" />
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-white/70 text-sm">
                      <span className="text-[#F28C28]">✓</span>
                      <span style={{ fontFamily: 'var(--font-body)' }}>Track orders</span>
                    </li>
                    <li className="flex items-center gap-2 text-white/70 text-sm">
                      <span className="text-[#F28C28]">✓</span>
                      <span style={{ fontFamily: 'var(--font-body)' }}>Save wishlist & reading recommendations</span>
                    </li>
                    <li className="flex items-center gap-2 text-white/70 text-sm">
                      <span className="text-[#F28C28]">✓</span>
                      <span style={{ fontFamily: 'var(--font-body)' }}>Faster future purchases</span>
                    </li>
                  </ul>
                  <button className="w-full px-6 py-3 rounded-full bg-[#F28C28]/20 text-[#F28C28] hover:bg-[#F28C28]/30 transition-all">
                    <span style={{ fontFamily: 'var(--font-nav)' }}>
                      Create Account
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {mode === 'guest' && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
                className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-2xl text-white"
                    style={{ fontFamily: 'var(--font-heading-secondary)' }}
                  >
                    Shipping Information
                  </h3>
                  <button
                    type="button"
                    onClick={() => setMode('select')}
                    className="text-[#3AA7FF] text-sm hover:underline"
                  >
                    Change
                  </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all"
                        placeholder="Street address"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all"
                        placeholder="State"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all"
                        placeholder="ZIP"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      value={formData.deliveryInstructions}
                      onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all resize-none"
                      placeholder="Any special instructions for delivery..."
                    />
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#3AA7FF]/10 border border-[#3AA7FF]/20">
                  <Lock className="w-5 h-5 text-[#3AA7FF] flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    Your information is protected with secure encrypted checkout
                  </p>
                </div>

                {/* Errors */}
                {formError && (
                  <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                    {formError}
                    {Object.keys(fieldErrors).length > 0 && (
                      <ul className="mt-2 list-inside space-y-1">
                        {['email', 'phone', 'name', 'line1', 'city', 'state', 'zip'].map(
                          (key) =>
                            fieldError(key) ? (
                              <li key={key}>• {fieldError(key)}</li>
                            ) : null,
                        )}
                      </ul>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full hover:shadow-lg hover:shadow-[#3AA7FF]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="text-white font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                    {submitting ? 'Redirecting to secure payment…' : 'Continue to Payment'}
                  </span>
                </button>
              </motion.form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24 p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20"
            >
              <h3
                className="text-xl mb-6 text-white"
                style={{ fontFamily: 'var(--font-heading-secondary)' }}
              >
                Order Summary
              </h3>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm line-clamp-2 mb-1" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                        {item.title}
                      </h4>
                      <p className="text-white/60 text-xs mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                        Qty: {item.quantity}
                      </p>
                      <p className="text-white text-sm" style={{ fontFamily: 'var(--font-nav)' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-white/70">
                  <span style={{ fontFamily: 'var(--font-body)' }}>Subtotal</span>
                  <span className="text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span style={{ fontFamily: 'var(--font-body)' }}>Shipping</span>
                  <span className="text-white">FREE</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span style={{ fontFamily: 'var(--font-body)' }}>Tax</span>
                  <span className="text-white">${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-xl text-white" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                    Total
                  </span>
                  <span className="text-2xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    ${(totalPrice * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
