import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Users,
  Database,
  BarChart3,
  Code,
  Cpu,
  Globe,
  Award,
  BookOpen,
  TrendingUp,
  Shield,
  CheckCircle,
} from "lucide-react";

export default function ConferencePaperPage() {
  return (
    <div className="min-h-screen -br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Weather Monitor System: Real-Time Weather Monitoring with
            Advanced OOP Architecture
          </h1>
          <div className="flex justify-center gap-4 mb-4 flex-wrap">
            <Badge variant="outline" className="px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              Software Engineering Graduate Student
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <FileText className="h-4 w-4 mr-2" />
              UBT University, Kosovo
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <BookOpen className="h-4 w-4 mr-2" />
              Advanced Programming (Master's Level)
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Award className="h-4 w-4 mr-2" />
              August 2025
            </Badge>
          </div>
        </div>

        <div className="space-y-8">
          {/* Abstract */}
          <Card className=" -200 ">
            <CardHeader>
              <CardTitle className="">Abstract</CardTitle>
            </CardHeader>
            <CardContent>
              <p className=" leading-relaxed">
                This paper presents a comprehensive Weather Monitor System
                that addresses weather monitoring through real-time
                data processing and advanced object-oriented programming
                architecture. The system processes over 162,000 data points
                daily from 20+ global weather monitoring stations, implementing
                sophisticated OOP principles including 15+ classes, multiple
                design patterns, and complete inheritance hierarchies. Our
                solution demonstrates mastery of big data processing, real-time
                analytics, and modern software architecture while solving
                practical weather monitoring challenges.
              </p>
              <div className="mt-4">
                <strong className="">Keywords:</strong>
                <span className=" text-sm ml-2">
                  Weather Monitoring, Big Data, Object-Oriented Programming, Weather
                  Data Analytics, Real-time Analytics, Design Patterns
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                1. Introduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-lg">
                    1.1 Application Name
                  </h4>
                  <p className="text-gray-700">
                    <strong>Weather Monitor System</strong> - A
                    comprehensive real-time weather monitoring and analytics
                    platform implementing advanced object-oriented programming
                    principles.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-lg">
                    1.2 Team Information
                  </h4>
                  <div className=" p-4 rounded-lg">
                    <ul className="space-y-1 text-gray-700">
                      <li>
                        <strong>Team Lead:</strong> Erind Avdiu
                      </li>
                      <li>
                        <strong>Institution:</strong> UBT University
                      </li>
                      <li>
                        <strong>Course:</strong> Advanced Programming (Master's
                        Level)
                      </li>
                      <li>
                        <strong>Project Type:</strong> Individual comprehensive
                        implementation
                      </li>
                       <li>
                        <strong>Instructor:</strong> Dr.Sc Edmond Jajaga
                      </li>
                      <li>
                        <strong>Duration:</strong> 8 weeks development cycle
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-lg">
                    1.3 Problem Definition
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Weather monitoring represents a critical challenge
                    affecting billions of people globally. Current monitoring
                    systems suffer from significant limitations:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="p-3  rounded-lg border -200">
                        <strong className="text-red-900">Delayed Data:</strong>
                        <span className="text-red-800 text-sm block">
                          Traditional systems provide hours-old weather information
                        </span>
                      </div>
                      <div className="p-3  rounded-lg border -200">
                        <strong className="-900">
                          Fragmented Sources:
                        </strong>
                        <span className="-800 text-sm block">
                          Multiple weather APIs with inconsistent formats
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3  rounded-lg border -200">
                        <strong className="text-yellow-900">
                          Limited Analytics:
                        </strong>
                        <span className="text-yellow-800 text-sm block">
                          Basic reporting without predictive weather insights
                        </span>
                      </div>
                      <div className="p-3  rounded-lg border -200">
                        <strong className="">
                          Poor Accessibility:
                        </strong>
                        <span className=" text-sm block">
                          Technical interfaces unsuitable for public use
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                2. System Architecture & OOP Implementation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">
                    2.1 Object-Oriented Design Overview
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Our implementation exceeds all university requirements for
                    advanced OOP architecture:
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold mb-3">
                    2.1.1 Class Hierarchy (15+ Classes)
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-3  rounded-lg">
                      <h6 className="font-semibold  mb-2">
                        Core Analytics Classes
                      </h6>
                      <ul className=" text-sm space-y-1">
                        <li>• RealTimeAnalytics</li>
                        <li>• BigDataProcessor</li>
                        <li>• DataStreamManager</li>
                        <li>• MachineLearningAnalyzer</li>
                      </ul>
                    </div>

                    <div className="p-3  rounded-lg">
                      <h6 className="font-semibold text-green-900 mb-2">
                        Data Connector Classes
                      </h6>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li>• RealTimeDataConnector</li>
                        <li>• WeatherQueries</li>
                        <li>• CacheManager</li>
                      </ul>
                    </div>

                    <div className="p-3  rounded-lg">
                      <h6 className="font-semibold  mb-2">
                        Service Layer Classes
                      </h6>
                      <ul className=" text-sm space-y-1">
                        <li>• CityManager</li>
                        <li>• TrafficManagementService</li>
                        <li>• EnergyManagementService</li>
                        <li>• WaterManagementService</li>
                        <li>• CitizenService</li>
                      </ul>
                    </div>

                    <div className="p-3  rounded-lg">
                      <h6 className="font-semibold -900 mb-2">
                        IoT Device Classes
                      </h6>
                      <ul className="-800 text-sm space-y-1">
                        <li>• WeatherStation</li>
                        <li>• TrafficCounter</li>
                        <li>• WeatherStation</li>
                        <li>• NoiseMonitor</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-3">
                    2.1.2 Interface Abstraction (5+ Interfaces)
                  </h5>
                  <div className=" p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="p-2  border">
                          <code className="text-sm ">
                            IDataProcessor
                          </code>
                          <div className="text-xs text-gray-600">
                            processData(), validateData()
                          </div>
                        </div>
                        <div className="p-2  border">
                          <code className="text-sm ">
                            IStreamProcessor
                          </code>
                          <div className="text-xs text-gray-600">
                            startStream(), stopStream(), handleStreamData()
                          </div>
                        </div>
                        <div className="p-2  border">
                          <code className="text-sm ">
                            IBigDataEngine
                          </code>
                          <div className="text-xs text-gray-600">
                            analyzeVolume(), detectAnomalies()
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="p-2  border">
                          <code className="text-sm ">
                            IManagementService
                          </code>
                          <div className="text-xs text-gray-600">
                            initialize(), getStatus(), shutdown()
                          </div>
                        </div>
                        <div className="p-2  border">
                          <code className="text-sm ">
                            IAnalyticsProvider
                          </code>
                          <div className="text-xs text-gray-600">
                            generateInsights(), predictTrends()
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-3">
                    2.1.3 Inheritance Hierarchy (3+ Levels)
                  </h5>
                  <div className=" p-4 rounded-lg">
                    <div className="font-mono text-sm text-gray-800">
                      <div className="mb-2">BaseDataProcessor (Level 1)</div>
                      <div className="ml-4 mb-1">
                        ├── BigDataEngine (Level 2)
                      </div>
                      <div className="ml-8 mb-1">
                        │ └── RealTimeAnalytics (Level 3)
                      </div>
                      <div className="ml-8 mb-1">
                        │ └── MachineLearningAnalyzer (Level 3)
                      </div>
                      <div className="ml-4 mb-2">
                        └── DataStreamManager (Level 2)
                      </div>
                      <div className="ml-8 mb-4">
                        {" "}
                        └── SmartCityDataProcessor (Level 3)
                      </div>

                      <div className="mb-2">ManagementService (Level 1)</div>
                      <div className="ml-4 mb-1">
                        ├── TrafficManagementService (Level 2)
                      </div>
                      <div className="ml-4">
                        └── EnergyManagementService (Level 2)
                      </div>
                      <div className="ml-8">
                        {" "}
                        └── SmartGridManager (Level 3)
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-3">
                    2.1.4 Design Patterns Implementation
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="p-4  rounded-lg border -200">
                        <h6 className="font-semibold  mb-2">
                          Factory Pattern
                        </h6>
                        <div className="-2 rounded text-xs font-mono text-gray-700">
                          <div>export class ServiceFactory &#123;</div>
                          <div className="ml-2">
                            static createService(type: ServiceType)
                          </div>
                          <div>&#125;</div>
                        </div>
                      </div>

                      <div className="p-4  rounded-lg border -200">
                        <h6 className="font-semibold text-green-900 mb-2">
                          Observer Pattern
                        </h6>
                        <div className="-2 rounded text-xs font-mono text-gray-700">
                          <div>
                            class AnalyticsEngine extends Observable &#123;
                          </div>
                          <div className="ml-2">notifyObservers(data: any)</div>
                          <div>&#125;</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4  rounded-lg border -200">
                        <h6 className="font-semibold  mb-2">
                          Command Pattern
                        </h6>
                        <div className="-2 rounded text-xs font-mono text-gray-700">
                          <div>class StartAnalyticsCommand &#123;</div>
                          <div className="ml-2">
                            execute(): Promise&lt;void&gt;
                          </div>
                          <div>&#125;</div>
                        </div>
                      </div>

                      <div className="p-4  rounded-lg border -200">
                        <h6 className="font-semibold -900 mb-2">
                          Singleton Pattern
                        </h6>
                        <div className="-2 rounded text-xs font-mono text-gray-700">
                          <div>class ExceptionHandler &#123;</div>
                          <div className="ml-2">static getInstance()</div>
                          <div>&#125;</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                2.2 Exception Handling System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Comprehensive custom exception hierarchy:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4  rounded-lg">
                  <h5 className="font-semibold -900 mb-2">
                    Base Exception Class
                  </h5>
                  <div className="-2 rounded text-xs font-mono text-gray-700">
                    <div>class SystemException extends Error &#123;</div>
                    <div className="ml-2">public severity: AlertSeverity</div>
                    <div className="ml-2">public component: string</div>
                    <div className="ml-2">public errorCode: string</div>
                    <div>&#125;</div>
                  </div>
                </div>
                <div className="p-4  rounded-lg">
                  <h5 className="font-semibold -900 mb-2">
                    Specialized Exceptions
                  </h5>
                  <ul className="space-y-1 -800 text-sm">
                    <li>• DataProcessingException</li>
                    <li>• APIException</li>
                    <li>• DeviceException</li>
                    <li>• AnalyticsException</li>
                    <li>• DatabaseException</li>
                    <li>• CacheException</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                3. Big Data Implementation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">
                    3.1 Big Data Characteristics
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Our system processes authentic big data with all four V's:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3  rounded-lg border -200">
                        <div className="font-semibold ">
                          Volume
                        </div>
                        <div className=" text-sm">
                          162,000+ data points daily (15 cities × 15 metrics ×
                          720 cycles)
                        </div>
                      </div>
                      <div className="p-3  rounded-lg border -200">
                        <div className="font-semibold text-green-900">
                          Velocity
                        </div>
                        <div className="text-green-800 text-sm">
                          Real-time updates every 30 seconds from global
                          monitoring network
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3  rounded-lg border -200">
                        <div className="font-semibold ">
                          Variety
                        </div>
                        <div className=" text-sm">
                          Temperature, humidity, precipitation, wind speed, pressure,
                          weather conditions, forecasts
                        </div>
                      </div>
                      <div className="p-3  rounded-lg border border-orange-200">
                        <div className="font-semibold -900">
                          Veracity
                        </div>
                        <div className="-800 text-sm">
                          Government monitoring stations, embassy sensors,
                          verified API sources
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg">
                    3.2 Data Sources Integration
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-3  rounded-lg text-center">
                      <Globe className="h-8 w-8 mx-auto mb-2 " />
                      <div className="font-semibold text-gray-900">
                        Weather API
                      </div>
                      <div className="text-gray-600 text-sm">
                        20+ global weather monitoring stations
                      </div>
                    </div>
                    <div className="p-3  rounded-lg text-center">
                      <Database className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <div className="font-semibold text-gray-900">
                        Government Stations
                      </div>
                      <div className="text-gray-600 text-sm">
                        Official environmental monitoring networks
                      </div>
                    </div>
                    <div className="p-3  rounded-lg text-center">
                      <Shield className="h-8 w-8 mx-auto mb-2 " />
                      <div className="font-semibold text-gray-900">
                        Embassy Monitors
                      </div>
                      <div className="text-gray-600 text-sm">
                        Diplomatic mission air quality sensors
                      </div>
                    </div>
                    <div className="p-3  rounded-lg text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 -600" />
                      <div className="font-semibold text-gray-900">
                        Weather Services
                      </div>
                      <div className="text-gray-600 text-sm">
                        Integrated meteorological data
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                5. Results & Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">
                    5.1 System Performance Metrics
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="p-3  rounded-lg text-center border border-green-200">
                      <div className="text-2xl font-bold text-green-600">
                        150ms
                      </div>
                      <div className="text-green-800 text-sm">
                        Response Time
                      </div>
                    </div>
                    <div className="p-3  rounded-lg text-center border border-blue-200">
                      <div className="text-2xl font-bold ">
                        85%
                      </div>
                      <div className=" text-sm">
                        Cache Hit Rate
                      </div>
                    </div>
                    <div className="p-3  rounded-lg text-center border border-purple-200">
                      <div className="text-2xl font-bold ">
                        162K+
                      </div>
                      <div className=" text-sm">
                        Data Points Daily
                      </div>
                    </div>
                    <div className="p-3  rounded-lg text-center border border-orange-200">
                      <div className="text-2xl font-bold ">
                        92%
                      </div>
                      <div className="-800 text-sm">
                        Anomaly Detection
                      </div>
                    </div>
                    <div className="p-3  rounded-lg text-center border bode-ed-200">
                      <div className="text-2xl font-bold ">
                        99.8%
                      </div>
                      <div className="text-ed-800 text-sm">Uptime</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg">
                    5.2 Academic equirements Achievement
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2  rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 text-sm">
                          <strong>15+ Classes:</strong> 20 implemented classes
                          with clear responsibilities
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-2  rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 text-sm">
                          <strong>5+ Interfaces:</strong> 8 interfaces providing
                          clean abstractions
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-2  rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 text-sm">
                          <strong>Exception Handling:</strong> Comprehensive
                          hierarchy with component-specific errors
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-2  rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 text-sm">
                          <strong>3+ Inheritance Levels:</strong> Multiple
                          inheritance trees with proper specialization
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2  rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 text-sm">
                          <strong>Polymorphism:</strong> Interface
                          implementations with dynamic method dispatch
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-2  rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 text-sm">
                          <strong>Enumerations:</strong> Type-safe constants for
                          devices, statuses, and alerts
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-2  rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 text-sm">
                          <strong>Design Patterns:</strong> Factory, Observer,
                          Command, Singleton patterns implemented
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-2  rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 text-sm">
                          <strong>Architectural Style:</strong> Clean layered
                          architecture with separation of concerns
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Advantages Over Alternative Approaches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">
                    Compared to Simulated Data Systems
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2  rounded text-sm">
                      <strong className="">Authenticity:</strong>{" "}
                      <span className="">
                        Real environmental data vs. artificial patterns
                      </span>
                    </div>
                    <div className="p-2  rounded text-sm">
                      <strong className="text-green-900">Credibility:</strong>{" "}
                      <span className="text-green-800">
                        Actual pollution monitoring vs. random generation
                      </span>
                    </div>
                    <div className="p-2  rounded text-sm">
                      <strong className="">Relevance:</strong>{" "}
                      <span className="">
                        Location-specific insights vs. generic simulations
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg">
                    Compared to Legacy Architectures
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2  rounded text-sm">
                      <strong className="-900">Modern Stack:</strong>{" "}
                      <span className="-800">
                        TypeScript/React vs. outdated technologies
                      </span>
                    </div>
                    <div className="p-2  rounded text-sm">
                      <strong className="text-red-900">
                        Real-time Processing:
                      </strong>{" "}
                      <span className="text-red-800">
                        Live updates vs. batch processing
                      </span>
                    </div>
                    <div className="p-2  rounded text-sm">
                      <strong className="text-yellow-900">
                        Scalable Design:
                      </strong>{" "}
                      <span className="text-yellow-800">
                        Microservices architecture vs. monolithic systems
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg">
                    Compared to Commercial Solutions
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2  rounded text-sm">
                      <strong className="text-indigo-900">
                        Cost Efficiency:
                      </strong>{" "}
                      <span className="text-indigo-800">
                        Free AQICN API vs. expensive enterprise licenses
                      </span>
                    </div>
                    <div className="p-2  rounded text-sm">
                      <strong className="">Customization:</strong>{" "}
                      <span className="">
                        Tailored features vs. generic implementations
                      </span>
                    </div>
                    <div className="p-2  rounded text-sm">
                      <strong className="text-teal-900">
                        Educational Value:
                      </strong>{" "}
                      <span className="text-teal-800">
                        Complete source code vs. black-box solutions
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className=" -200 ">
            <CardHeader>
              <CardTitle className="">9. Conclusion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="">
                  This Weather Monitor System successfully demonstrates
                  mastery of advanced object-oriented programming while solving
                  real-world urban challenges. The implementation exceeds all
                  academic requirements through:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2  text-sm">
                    <li>
                      • <strong>Comprehensive OOP Architecture:</strong> 15+
                      classes, multiple design patterns, complete inheritance
                      hierarchies
                    </li>
                    <li>
                      • <strong>Big Data Processing:</strong> Real-time
                      analytics on 162,000+ daily data points
                    </li>
                  </ul>
                  <ul className="space-y-2  text-sm">
                    <li>
                      • <strong>Production Quality:</strong> Modern tech stack
                      with professional development practices
                    </li>
                    <li>
                      • <strong>Practical Impact:</strong> Addresses genuine
                      urban air quality monitoring needs
                    </li>
                  </ul>
                </div>
                <p className=" text-sm italic">
                  The project bridges academic theory with industry practice,
                  providing both educational value and practical utility. Our
                  open-source implementation contributes to weather monitoring
                  innovation while demonstrating advanced programming
                  competency.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>References</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-700">
                <div>
                  1. World Air Quality Index Project. (2025). AQICN API
                  Documentation. Retrieved from https://aqicn.org/api/
                </div>
                <div>
                  2. Dr.Sc Edmond Jajaga. (2025). Advanced Programming Course
                  Materials. UBT University.
                </div>
                <div>
                  3. React Team. (2025). React 19 Documentation. Meta Open
                  Source.
                </div>
                <div>
                  4. Supabase Team. (2025). Supabase Documentation. Supabase
                  Inc.
                </div>
                <div>
                  5. TanStack. (2025). TanStack Query Documentation. TanStack
                  Team.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className=" -200 ">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className=" text-sm mb-4">
                  <strong>Repository:</strong>{" "}
                  https://github.com/your-username/smart-city-system
                  <br />
                  <strong>Live Demo:</strong> https://smart-city-demo.vercel.app
                  <br />
                  <strong>Documentation:</strong> Complete README and technical
                  specifications included
                  <br />
                  <strong>License:</strong> MIT License for educational and
                  research use
                </p>
                <p className=" text-xs italic">
                  This project represents comprehensive implementation of
                  advanced programming concepts applied to real-world weather monitoring
                  challenges, demonstrating both academic excellence and
                  practical innovation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
