import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CreditCard, Smartphone, Building, Wallet, CheckCircle2 } from 'lucide-react';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { plan, currency, price } = location.state || {};
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [isPaid, setIsPaid] = useState(false);

    if (!plan) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">No plan selected</h2>
                    <Button onClick={() => navigate('/premium')}>Go back to Premium</Button>
                </div>
            </div>
        );
    }

    const handlePayment = (e) => {
        if (e) e.preventDefault();
        // Fake payment processing
        setTimeout(() => {
            setIsPaid(true);
        }, 1500);
    };

    if (isPaid) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 bg-gray-50">
                <div className="glass-card p-12 rounded-[48px] text-center max-w-lg w-full animate-fade-in border border-primary/20 shadow-2xl shadow-primary/10">
                    <div className="h-24 w-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Payment Successful!</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                        Welcome to {plan.name}. Your premium features have been unlocked.
                    </p>
                    <Button onClick={() => navigate('/dashboard')} className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs">
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        );
    }

    // A helper to extract numerical part for fake QR if needed, but not strictly needed 
    const numericPrice = typeof price === 'string' ? price.replace(/[^0-9.]/g, '') : price;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Checkout</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Complete your purchase to unlock premium features.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left side: Payment Methods */}
                    <div className="lg:col-span-2 space-y-6">
                         {/* tabs for methods */}
                         <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                             {[
                                 { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard className="w-5 h-5" /> },
                                 { id: 'upi', name: 'UPI / QR', icon: <Smartphone className="w-5 h-5" /> },
                                 { id: 'netbanking', name: 'Net Banking', icon: <Building className="w-5 h-5" /> },
                                 { id: 'wallet', name: 'Wallets', icon: <Wallet className="w-5 h-5" /> }
                             ].map((method) => (
                                 <button
                                     key={method.id}
                                     onClick={() => setSelectedMethod(method.id)}
                                     className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${
                                         selectedMethod === method.id
                                             ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                             : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-primary/50'
                                     }`}
                                 >
                                     {method.icon}
                                     {method.name}
                                 </button>
                             ))}
                         </div>

                         {/* Form Area */}
                         <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm min-h-[400px]">
                            {selectedMethod === 'card' && (
                                <form className="space-y-6" onSubmit={handlePayment}>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Card Details</h3>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Card Number</label>
                                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl px-5 outline-none border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-lg" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Expiry Date</label>
                                            <input type="text" placeholder="MM/YY" className="w-full h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl px-5 outline-none border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-lg" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">CVV</label>
                                            <input type="password" placeholder="•••" className="w-full h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl px-5 outline-none border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-lg" required maxLength={4} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Name on Card</label>
                                        <input type="text" placeholder="John Doe" className="w-full h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl px-5 outline-none border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-lg" required />
                                    </div>
                                    <Button type="submit" className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-sm mt-8 shadow-xl shadow-primary/20 group">
                                        Pay {price}
                                        <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                                    </Button>
                                </form>
                            )}

                            {selectedMethod === 'upi' && (
                                <div className="flex flex-col items-center justify-center text-center space-y-8 h-full py-10">
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Scan to Pay</h3>
                                    <div className="bg-white p-4 rounded-3xl border-4 border-gray-100 shadow-md">
                                        {/* Using QR Server API to generate a fake QR based on the price */}
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=jobsphere@fakebank&pn=JobSphere&am=${numericPrice}`} alt="UPI QR Code" className="w-48 h-48 rounded-xl object-contain" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-500">Scan with any UPI app like Google Pay, PhonePe, Paytm</p>
                                    <div className="w-full border-t border-gray-100 dark:border-gray-800 pt-8 mt-4 text-left">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 text-left">Or Enter UPI ID</label>
                                        <div className="flex gap-4">
                                            <input type="text" placeholder="username@upi" className="flex-1 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl px-5 outline-none border border-gray-200 dark:border-gray-700 focus:border-primary" />
                                            <Button onClick={handlePayment} className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs">Verify & Pay</Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedMethod === 'netbanking' && (
                                <div className="space-y-6">
                                     <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Select Bank</h3>
                                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                         {['HDFC', 'SBI', 'ICICI', 'Axis'].map(bank => (
                                             <div key={bank} className="h-20 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary cursor-pointer transition-colors">
                                                 {bank}
                                             </div>
                                         ))}
                                     </div>
                                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Search other banks</label>
                                     <select className="w-full h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl px-5 outline-none border border-gray-200 dark:border-gray-700 font-medium">
                                        <option>Select your bank</option>
                                        <option>Kotak Mahindra Bank</option>
                                        <option>Punjab National Bank</option>
                                        <option>Bank of Baroda</option>
                                     </select>
                                     <Button onClick={handlePayment} className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-sm mt-8 shadow-xl shadow-primary/20">
                                        Proceed to Pay
                                    </Button>
                                </div>
                            )}

                            {selectedMethod === 'wallet' && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Select Wallet</h3>
                                    <div className="space-y-4">
                                        {['Amazon Pay', 'Mobikwik', 'Freecharge', 'PayPal'].map(wallet => (
                                            <div key={wallet} className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary cursor-pointer transition-colors">
                                                <span className="font-bold text-gray-900 dark:text-white">{wallet}</span>
                                                <Button onClick={handlePayment} variant="outline" className="h-10 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]">Link & Pay</Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                         </div>
                    </div>

                    {/* Right side: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none sticky top-24">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Order Summary</h3>
                            
                            <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">{plan.name}</p>
                                    <p className="text-gray-500 text-sm mt-1">{plan.duration}</p>
                                </div>
                                <span className="font-black text-xl text-gray-900 dark:text-white">{price}</span>
                            </div>

                            <div className="space-y-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Subtotal</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{price}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Platform Fee</span>
                                    <span className="font-bold text-green-500">Free</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-8">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Amount</span>
                                <span className="text-4xl font-black text-gray-900 dark:text-white leading-none">{price}</span>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 text-sm text-gray-500 font-medium text-center">
                                Guaranteed safe & secure checkout powered by JobSphere
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
