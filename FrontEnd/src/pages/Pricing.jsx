import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Check, Zap, Star, ShieldCheck, Briefcase, Users, BarChart3, TrendingUp, Target, Globe } from 'lucide-react';

const Pricing = () => {
    const navigate = useNavigate();
    const [currency, setCurrency] = useState('INR');

    const exchangeRates = {
        INR: 1,
        USD: 0.012,
        EUR: 0.011,
        GBP: 0.0094,
        CAD: 0.016,
        AUD: 0.018
    };

    const currencySymbols = {
        INR: '₹',
        USD: '$',
        EUR: '€',
        GBP: '£',
        CAD: 'C$',
        AUD: 'A$'
    };

    const formatPrice = (priceInINR) => {
        if (priceInINR === 0) return `${currencySymbols[currency]}0`;
        const converted = priceInINR * exchangeRates[currency];
        
        if (currency === 'INR') {
            return `${currencySymbols[currency]}${converted.toLocaleString('en-IN')}`;
        }
        
        return `${currencySymbols[currency]}${Math.round(converted)}`;
    };

    const plans = [
        {
            name: 'Basic Premium',
            priceInINR: 499,
            duration: 'per month',
            description: 'Essential premium tools for individual job seekers.',
            features: [
                'Unlimited job applications',
                'Enhanced profile visibility',
                'Premium job alerts',
                'Community support'
            ],
            icon: <Briefcase className="h-6 w-6 text-gray-400" />,
            buttonText: 'Get Basic',
            buttonVariant: 'outline'
        },
        {
            name: 'Pro Premium',
            priceInINR: 999,
            duration: 'per month',
            description: 'For serious professionals looking to stand out.',
            features: [
                'All Basic features',
                'Priority application status',
                'Direct recruiter messaging',
                'Resume rank analyzer',
                'AI Interview prep tools',
                'Profile boost (2x visibility)'
            ],
            icon: <Zap className="h-6 w-6 text-primary" />,
            highlight: true,
            buttonText: 'Upgrade to Pro',
            buttonVariant: 'primary'
        },
        {
            name: 'Elite Premium',
            priceInINR: 2499,
            duration: 'per month',
            description: 'Advanced tools and dedicated support for top talent.',
            features: [
                'All Pro features',
                'Dedicated career coach',
                'Advanced talent analytics',
                'Profile boost (5x visibility)',
                '1-on-1 resume rewrite',
                'Guaranteed interviews (select partners)'
            ],
            icon: <Star className="h-6 w-6 text-accent" />,
            buttonText: 'Get Elite',
            buttonVariant: 'outline'
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h1 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-6">
                        Invest in your <span className="text-gradient">future.</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 font-medium mb-10">
                        Choose the premium roadmap that fits your career goals. Unlock powerful features to land your dream job faster.
                    </p>
                    
                    {/* Currency Selector */}
                    <div className="inline-flex items-center justify-center p-1.5 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-inner">
                        <div className="flex items-center px-4 border-r border-gray-200 dark:border-gray-700">
                            <Globe className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Currency</span>
                        </div>
                        <div className="relative flex items-center">
                            <select 
                                value={currency} 
                                onChange={(e) => setCurrency(e.target.value)}
                                className="bg-transparent text-gray-900 dark:text-white font-black text-lg py-2 pl-6 pr-10 border-none outline-none cursor-pointer focus:ring-0 appearance-none text-center"
                                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                            >
                                <option value="INR">🇮🇳 INR (₹)</option>
                                <option value="USD">🇺🇸 USD ($)</option>
                                <option value="EUR">🇪🇺 EUR (€)</option>
                                <option value="GBP">🇬🇧 GBP (£)</option>
                                <option value="CAD">🇨🇦 CAD (C$)</option>
                                <option value="AUD">🇦🇺 AUD (A$)</option>
                            </select>
                            <div className="pointer-events-none absolute right-4">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative p-10 rounded-[48px] border transition-all duration-500 group flex flex-col ${plan.highlight
                                    ? 'bg-white dark:bg-gray-900 border-primary/20 shadow-2xl shadow-primary/10 scale-105 z-10'
                                    : 'bg-gray-50/50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 hover:scale-105'
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg shadow-primary/20">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${plan.highlight ? 'bg-primary/10' : 'bg-white dark:bg-gray-800'
                                    }`}>
                                    {plan.icon}
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-400 text-sm font-medium leading-relaxed">{plan.description}</p>
                            </div>

                            <div className="mb-10 flex items-baseline">
                                <span className="text-5xl font-black text-gray-900 dark:text-white transition-all duration-300">{formatPrice(plan.priceInINR)}</span>
                                <span className="text-gray-400 text-lg ml-2 font-bold italic">{plan.duration}</span>
                            </div>

                            <div className="space-y-4 mb-12 flex-grow">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                                            }`}>
                                            <Check className="h-3 w-3" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                onClick={() => navigate('/payment', { 
                                    state: { 
                                        plan: { name: plan.name, duration: plan.duration }, 
                                        currency, 
                                        price: formatPrice(plan.priceInINR) 
                                    }
                                })}
                                variant={plan.buttonVariant}
                                className={`w-full rounded-[24px] h-16 font-black uppercase tracking-widest text-xs transition-all ${plan.highlight
                                        ? 'bg-primary hover:bg-primary-dark shadow-xl shadow-primary/20 premium-button'
                                        : 'border-gray-200 dark:border-gray-700 hover:bg-white dark:bg-gray-900 dark:hover:bg-gray-800'
                                    }`}
                            >
                                {plan.buttonText}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Trust Section */}
                <div className="mt-32 pt-20 border-t border-gray-100 dark:border-gray-900 text-center">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-12">Trusted by premium members worldwide</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        {['Google', 'Netflix', 'Bento', 'Framer', 'Airbnb'].map(brand => (
                            <span key={brand} className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white">{brand}</span>
                        ))}
                    </div>
                </div>

                {/* Detailed FAQ-ish / Value Props Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-32">
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-8">
                            Why switch to <span className="text-primary italic">Premium</span>?
                        </h2>
                        <div className="space-y-10">
                            {[
                                { title: 'Targeted Outreach', text: 'Engage directly with decision makers using our proprietary recruiter mapping tool.', icon: <Target className="h-6 w-6" /> },
                                { title: 'Career Acceleration', text: 'Get personalized insights on your resume performance and tailored interview prep.', icon: <TrendingUp className="h-6 w-6" /> },
                                { title: 'Industry Recognition', text: 'Verified badges that signal high intent and skill proficiency to top employers.', icon: <ShieldCheck className="h-6 w-6" /> }
                            ].map(item => (
                                <div key={item.title} className="flex gap-6">
                                    <div className="h-14 w-14 bg-gray-50 dark:bg-gray-900 rounded-3xl flex items-center justify-center shrink-0 text-primary">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 dark:text-white mb-1">{item.title}</h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="glass-card p-12 rounded-[56px] border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Questions?</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium mb-10">
                            Our team is here to help you navigate the best path for your career. We offer personalized consultations for premium members to find the best plan for their needs.
                        </p>
                        <Button variant="outline" className="rounded-2xl h-14 border-gray-200 dark:border-gray-700 font-black uppercase tracking-widest text-xs px-10">
                            Chat with Support
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
