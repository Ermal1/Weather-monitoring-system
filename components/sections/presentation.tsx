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
      <Card className="bg-gradient-to-r from-gray-600 to-blue-600 text-white overflow-hidden">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            🎯 Weather Monitor System Presentation
            <Badge variant="secondary" className="bg-white text-purple-600">
              Ready for Demo
            </Badge>
          </CardTitle>
          <CardDescription className="text-purple-100">
            Complete weather monitoring system with OOP architecture, Weather API
            data, and real-time analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <div className="text-4xl mb-3">🏗️</div>
              <h3 className="font-semibold mb-2">Technical</h3>
              <p className="text-sm text-purple-100">
                32+ classes, 20+ interfaces, 5 design patterns
              </p>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <div className="text-4xl mb-3">🌤️</div>
              <h3 className="font-semibold mb-2">Real Weather Data</h3>
              <p className="text-sm text-purple-100">
                Weather API, 30 cities, Supabase real-time integration
              </p>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-semibold mb-2">AI Analytics</h3>
              <p className="text-sm text-purple-100">
                Real-time insights, weather alerts, forecast analysis
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={() => window.open("/presentation", "_blank")}
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
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
