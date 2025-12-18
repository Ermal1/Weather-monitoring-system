"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { PolymorphismDemoCard } from "@/app/components/PolymorphismDemoCard";

export function Presentation() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white overflow-hidden shadow-2xl border-emerald-400/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            🎯 Weather Monitor System Presentation
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-100 border-emerald-300/40 backdrop-blur-sm">
              Ready for Demo
            </Badge>
          </CardTitle>
          <CardDescription className="text-emerald-100">
            Complete weather monitoring system with OOP architecture, Weather API
            data, and real-time analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="text-4xl mb-3">🏗️</div>
              <h3 className="font-semibold mb-2 text-white">Technical</h3>
              <p className="text-sm text-emerald-100">
                32+ classes, 20+ interfaces, 5 design patterns
              </p>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="text-4xl mb-3">🌤️</div>
              <h3 className="font-semibold mb-2 text-white">Real Weather Data</h3>
              <p className="text-sm text-emerald-100">
                Weather API, 30 cities, Supabase real-time integration
              </p>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-semibold mb-2 text-white">AI Analytics</h3>
              <p className="text-sm text-emerald-100">
                Real-time insights, weather alerts, forecast analysis
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={() => window.open("/presentation", "_blank")}
              variant="secondary"
              className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg"
            >
              🚀 Launch Full Presentation Mode
            </Button>
          </div>
        </CardContent>
      </Card>
            <div className="mb-8">
          <PolymorphismDemoCard />
        </div>
    </div>
  );
}
