import React, { useState, useEffect, Suspense, lazy } from 'react';
import type { Tab } from './types';

const LazyHome = lazy(() => import('./components/Hero'));
const LazyResume = lazy(() => import('./components/About'));
const LazyProjects = lazy(() => import('./components/Projects'));
const LazyBlog = lazy(() => import('./components/Skills'));
const LazyGallery = lazy(() => import('./components/Experience'));
const LazyContact = lazy(() => import('./components/Contact'));
const LazySidebar = lazy(() => import('./components/Header'));
const LazyBottomNavBar = lazy(() => import('./components/BottomNavBar'));


const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center w-full h-full pt-20">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
    </div>
);


const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Close sidebar when changing tabs on mobile
    useEffect(() => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    }, [activeTab]);


    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <LazyHome setActiveTab={setActiveTab} />;
            case 'resume':
                return <LazyResume />;
            case 'projects':
                return <LazyProjects />;
            case 'blog':
                return <LazyBlog />;
            case 'gallery':
                return <LazyGallery />;
            case 'contact':
                return <LazyContact />;
            default:
                return <LazyHome />;
        }
    };

    return (
        <div className="gradient-bg w-screen h-screen flex overflow-hidden">
            <div className="aurora-bg"></div>
            <Suspense fallback={<div className="hidden md:block w-64 h-screen bg-slate-900/70 flex-shrink-0"></div>}>
                <LazySidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            </Suspense>
            <main className="flex-1 h-screen overflow-y-auto relative z-10">
                <div key={activeTab} className="p-6 md:p-10 lg:p-12 pb-24 md:pb-12 animate-content-fade-in">
                    <Suspense fallback={<LoadingSpinner />}>
                        {renderContent()}
                    </Suspense>
                </div>
            </main>
            <Suspense fallback={null}>
                <LazyBottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} onMenuClick={() => setIsSidebarOpen(true)} />
            </Suspense>
            <style>{`
                @keyframes content-fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-content-fade-in {
                    animation: content-fade-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                /* Custom scrollbar for webkit browsers */
                main::-webkit-scrollbar {
                    width: 8px;
                }
                main::-webkit-scrollbar-track {
                    background: transparent;
                }
                main::-webkit-scrollbar-thumb {
                    background-color: rgba(100, 116, 139, 0.5);
                    border-radius: 4px;
                    border: 2px solid transparent;
                    background-clip: content-box;
                }
                main::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(100, 116, 139, 0.8);
                }
            `}</style>
        </div>
    );
};

export default App;