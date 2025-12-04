"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, FileText, BookOpen, GraduationCap } from "lucide-react";

export function Footer() {
  const openDocument = (path: string) => {
    window.open(path, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Academic Project
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Weather Monitor System developed for Advanced Programming
              course at UBT University. This project demonstrates comprehensive
              OOP principles, design patterns, and real-time big data
              processing.
            </p>
            <div className="text-xs text-gray-400">
              <p>Course: Advanced Programming (Master's Level)</p>
              <p>Institution: UBT University</p>
              <p>Technology: TypeScript, React 19, Next.js 15</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Project Documentation
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left bg-transparent border-gray-600 text-white hover:bg-gray:900"
                onClick={() => openDocument("/documents/project-requirements")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Project Requirements
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left bg-transparent border-gray-600 text-white hover:bg-gray:900"
                onClick={() => openDocument("/documents/project-proposal")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Project Proposal
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left bg-transparent border-gray-600 text-white hover:bg-gray:900"
                onClick={() => openDocument("/documents/conference-paper")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Conference Paper
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Technical Achievements</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>25+ Classes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>14 Interfaces & Abstract Classes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>8 Exception Classes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>5+ Design Patterns</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>3+ Inheritance Levels</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Real Big Data Processing</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-600" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span>© 2025 Weather Monitor System</span>
            <span>•</span>
            <span>Advanced Programming Project</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Built with TypeScript & React 19</span>
            <span>•</span>
            <span>Real Weather API Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
