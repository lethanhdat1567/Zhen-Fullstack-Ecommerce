"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
            {/* Illustration Icon */}
            <div className="relative mb-8">
                <div className="bg-primary/10 absolute inset-0 animate-ping rounded-full"></div>
                <div className="bg-primary/5 relative flex h-24 w-24 items-center justify-center rounded-full">
                    <FileQuestion className="text-primary h-12 w-12" />
                </div>
            </div>

            {/* Content */}
            <h1 className="text-primary mb-2 text-6xl font-extrabold tracking-tight md:text-8xl">
                404
            </h1>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                Oops! Page not found
            </h2>
            <p className="mx-auto mb-10 max-w-md text-gray-600">
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
            </p>

            {/* Navigation Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Go Back
                </Button>

                <Button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2"
                >
                    <Home className="h-4 w-4" />
                    Back to Home
                </Button>
            </div>

            {/* Decorative Dots */}
            <div className="mt-16 grid grid-cols-3 gap-8 opacity-20">
                <div className="bg-primary h-2 w-2 rounded-full"></div>
                <div className="bg-primary h-2 w-2 rounded-full"></div>
                <div className="bg-primary h-2 w-2 rounded-full"></div>
            </div>
        </div>
    );
}
