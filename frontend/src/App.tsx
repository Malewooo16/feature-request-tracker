import React, { lazy, Suspense } from 'react';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy-loaded page components for code splitting and faster initial load
const Home = lazy(() => import('./pages/Home'));
const Index = lazy(() => import('./pages/Index'));

const queryClient = new QueryClient();

// Loading fallback component for Suspense
const PageLoader = () => (
	<div className="flex h-screen items-center justify-center">
		<p className="text-muted-foreground">Loading...</p>
	</div>
);

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<Suspense fallback={<PageLoader />}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/features" element={<Index />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
