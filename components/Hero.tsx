import React, { useEffect, useState, useRef } from 'react';
import type { Tab } from '../types';

type Props = { setActiveTab?: (tab: Tab) => void };
const Home: React.FC<Props> = ({ setActiveTab }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [name, setName] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent('Al Mumeetu Saikat')}`;

    useEffect(() => {
        // Load reviews from remote API when provided, otherwise from localStorage
        const load = async () => {
            if (API_URL) {
                try {
                    const r = await fetch(API_URL);
                    if (r.ok) {
                        const data = await r.json();
                        if (Array.isArray(data)) {
                            setReviews(data);
                            return;
                        }
                    }
                } catch (e) {
                    // fall back to local
                }
            }

            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (raw) setReviews(JSON.parse(raw));
            } catch (e) {
                // ignore
            }
        };
        load();
    }, []);

    useEffect(() => {
        // If remote API is available, server will persist reviews. Otherwise keep localStorage in sync.
        if (API_URL) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
        } catch (e) {
            // ignore
        }
    }, [reviews]);

    const submit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!comment.trim()) {
            commentRef.current?.focus();
            return;
        }
        const r: Review = {
            id: Date.now(),
            name: name.trim() || 'Anonymous',
            rating: Math.max(1, Math.min(5, Math.round(rating))),
            comment: comment.trim(),
            createdAt: new Date().toISOString(),
        };
        setReviews(prev => [r, ...prev]);
        setName('');
        setRating(5);
        setComment('');
    };

    const average = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

    return (
        <div className="max-w-5xl mx-auto space-y-16 md:space-y-20 px-0 sm:px-2 min-w-0 overflow-x-hidden">

            {/* 1. Hero Section */}
            <div className="text-center space-y-6 md:space-y-8 pt-10 md:pt-20">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500 animate-gradient-x">
                        Al Mumeetu Saikat
                    </span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-300 max-w-3xl mx-auto">
                    A creative WordPress Expert & Frontend Developer, now building high-performance web applications with React and Next.js.
                </p>

                <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            if (setActiveTab) {
                                setActiveTab('contact');
                            } else {
                                // Fallback: update hash so if app listens to it or for direct anchor navigation
                                window.location.hash = 'contact';
                            }
                        }}
                        className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold shadow-lg transition duration-150 ease-in-out"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 13.255A23.593 23.593 0 0112 15c-3.18 0-6.234-.403-9-1.745V20a2 2 0 002 2h14a2 2 0 002-2v-6.745z"
                            ></path>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 7a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                            ></path>
                        </svg>
                        Get Hired
                    </button>
                    <button
                        onClick={() => {
                            // quick scroll to reviews
                            const el = document.getElementById('reviews');
                            el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-full text-gray-200"
                    >
                        See Reviews ({reviews.length})
                    </button>
                </div>
            </div>

            {/* 2. About Section (Original position: 3) */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
                <div className="relative w-full md:w-1/3 flex-shrink-0 flex justify-center">
                    <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-2xl opacity-30 max-w-sm mx-auto"></div>
                    <img
                        src="/images/projects/al_mumeetu_saikat.png"
                        alt="Al Mumeetu Saikat"
                        className="relative rounded-full w-60 h-60 md:w-72 md:h-72 border-4 border-slate-700 shadow-2xl object-cover max-w-full"
                        referrerPolicy="no-referrer"
                    />
                </div>
                <div className="md:w-2/3 text-lg text-gray-300 space-y-4 text-center md:text-left">
                    <p>
                        With a strong foundation in custom WordPress theme development and Elementor, I create pixel-perfect, user-friendly websites. My journey began with building ThemeForest-standard templates, evolving into complex WordPress customization for international clients.
                    </p>
                    <p>
                        I am now expanding my expertise into the modern JavaScript ecosystem, leveraging frameworks like React and Next.js to deliver fast, scalable, and dynamic frontend experiences. I thrive on clean code, performance optimization, and creating digital solutions that exceed client expectations.
                    </p>

                    {/* --- Highlighted Search Text (Improved & Responsive Design) --- */}
                    <div className="text-center py-3 px-2 sm:px-0 lg:w-[90%]"> {/* Ensure text center aligns the block */}
                        <a
                            href={googleSearchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
            inline-flex items-center text-xs sm:text-sm md:text-base font-bold text-white 
            bg-black/20 backdrop-blur-sm 
            rounded-xs px-4 py-2 sm:px-6 sm:py-3 transition duration-300 ease-in-out 
            shadow-lg hover:shadow-2xl hover:scale-[1.02] transform 
            ring-1 ring-offset-1 ring-purple-300 ring-offset-slate-900 
            max-w-full mx-auto justify-center 
            flex-wrap space-x-2 sm:space-x-2 
        "
                        >
                            {/* Main Static Text */}
                            <span>For More About Me Just Search Me On</span>

                            {/* Google Logo (Responsive Text Size) */}
                            <div className="inline-flex items-center space-x-0.5 sm:space-x-1">
                                <span className="text-lg sm:text-xl font-extrabold text-blue-300">G</span>
                                <span className="text-lg sm:text-xl font-extrabold text-red-300">o</span>
                                <span className="text-lg sm:text-xl font-extrabold text-yellow-300">o</span>
                                <span className="text-lg sm:text-xl font-extrabold text-green-300">g</span>
                                <span className="text-lg sm:text-xl font-extrabold text-red-300">l</span>
                                <span className="text-lg sm:text-xl font-extrabold text-blue-300">e :</span>
                            </div>

                            {/* Name/Search Term */}
                            <span className="text-sm sm:text-base md:text-lg text-indigo-300"> Al Mumeetu Saikat </span>
                        </a>
                    </div>
                    {/* ----------------------------------------------- */}
                </div>


            </div>



            {/* 3. Reviews Section (Original position: 2 - MOVED DOWN) */}
            <div id="reviews" className="space-y-6 mt-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Reviews & Comments</h2>
                    </div>
                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                        <div className="text-sm text-gray-300">Average</div>
                        <div className="flex items-center gap-3 bg-slate-900 px-3 py-1 rounded-full">
                            <Stars value={average} className="!w-6 !h-6" />
                            <span className="text-sm font-semibold text-gray-100">{average ? average.toFixed(1) : '—'}</span>
                        </div>
                        <div className="ml-4 px-3 py-1 bg-slate-800 text-sm rounded-full text-gray-200">{reviews.length} reviews</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 p-4 bg-slate-900 rounded-lg">
                        <form onSubmit={submit} className="space-y-4">
                            <input
                                placeholder="Your name (optional)"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-slate-800 text-gray-200"
                            />
                            <div>
                                <label className="text-sm text-gray-300 block mb-2">Rating</label>
                                <RatingInput value={rating} onChange={setRating} />
                            </div>
                            <div>
                                <label className="text-sm text-gray-300 block mb-2">Comment</label>
                                <textarea
                                    ref={commentRef}
                                    placeholder="Write a comment..."
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    className="w-full h-28 px-3 py-2 rounded bg-slate-800 text-gray-200"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => { setName(''); setRating(5); setComment(''); }} className="px-3 py-1 rounded bg-slate-700 text-gray-200">Reset</button>
                                <button type="submit" className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white">Submit</button>
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        {reviews.length === 0 ? (
                            <div className="text-gray-400">No reviews yet. Be the first to leave one!</div>
                        ) : (
                            reviews.map(r => (
                                <div key={r.id} className="p-4 bg-slate-800 rounded-lg">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-semibold text-white">{r.name}</div>
                                                    <div className="text-sm text-gray-400">{new Date(r.createdAt).toLocaleString()}</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Stars value={r.rating} className="!w-5 !h-5 md:!w-6 md:!h-6" />
                                                    <div className="text-sm text-gray-300">{r.rating}</div>
                                                </div>
                                            </div>
                                            <div className="mt-3 text-gray-200 break-words">{r.comment}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* 4. Additional Info Section */}
            <div className="text-center space-y-8">
                <div>
                    <h3 className="text-2xl font-bold text-purple-400 mb-2">Languages</h3>
                    <p className="text-lg text-gray-300">English and Bengali</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-purple-400 mb-2">Interests</h3>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Full Stack Development, Data Science, Machine Learning, Artificial Intelligence, Coding, Traveling.
                    </p>
                </div>
            </div>


            <style>{`
                @keyframes gradient-x {
                    0%, 100% {
                        background-size: 200% 200%;
                        background-position: left center;
                    }
                    50% {
                        background-size: 200% 200%;
                        background-position: right center;
                    }
                }
                .animate-gradient-x {
                    animation: gradient-x 5s ease infinite;
                }
            `}</style>
        </div>
    );
};

// Note: This file is repurposed as the Home tab content.
type Review = {
    id: number;
    name: string;
    rating: number; // 1-5
    comment: string;
    createdAt: string;
};

const STORAGE_KEY = 'saikat_reviews_v1';
const API_URL = (import.meta as any)?.env?.VITE_REVIEWS_API || '';

// Start section at the bottom
const Stars: React.FC<{ value: number; className?: string }> = ({ value, className }) => {
    const rounded = Math.round(value);
    return (
        <span className={`inline-flex items-center ${className ?? ''}`} aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => {
                return (
                    <svg key={i} className={`w-5 h-5 ${i < rounded ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.121-6.535L0 6.545l6.545-.955L10 0l2.455 5.59L20 6.545l-5.243 4.005 1.121 6.535z" />
                    </svg>
                );
            })}
        </span>
    );
};

// Interactive rating input (large touch targets)
const RatingInput: React.FC<{ value: number; onChange: (v: number) => void }> = ({ value, onChange }) => {
    return (
        <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => {
                const v = i + 1;
                const filled = v <= value;
                return (
                    <button
                        key={v}
                        type="button"
                        aria-label={`${v} star${v > 1 ? 's' : ''}`}
                        onClick={() => onChange(v)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') onChange(v);
                        }}
                        className={`focus:outline-none rounded p-1 ${filled ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
                    >
                        <svg viewBox="0 0 24 24" className={`w-12 h-12 md:w-10 md:h-10 ${filled ? '' : ''}`} fill={filled ? 'currentColor' : 'none'} stroke={filled ? 'none' : 'currentColor'} strokeWidth={1.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.286 3.957c.3.922-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.176 0l-3.37 2.447c-.784.57-1.84-.196-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
                        </svg>
                    </button>
                );
            })}
        </div>
    );
};
export default Home;