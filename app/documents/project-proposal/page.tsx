import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  FileText, 
  Users, 
  Target, 
  Lightbulb, 
  Database, 
  BarChart3, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Code,
  Github,
  Globe
} from 'lucide-react'

export default function ProjectProposalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Weather Monitor System - Project Proposal
          </h1>
          <div className="flex justify-center gap-4 mb-4 flex-wrap">
            <Badge variant="outline" className="px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              Master's Subject - Advanced Programming
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <FileText className="h-4 w-4 mr-2" />
              UBT University
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              August 2025
            </Badge>
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="font-semibold text-blue-900">Erind Avdiu: Software Engineering Student</div>
                  <div className="text-blue-700 text-sm">
                  </div>
                </div>
              </div>
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Note:</strong> This is an individual project demonstrating comprehensive understanding of advanced programming concepts and big data processing.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Problem Statement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Challenge</h4>
                  <p className="text-gray-700">
                    Urban areas face increasing air pollution challenges, but citizens and city planners lack access to real-time, 
                    actionable weather insights. Traditional monitoring systems provide delayed, fragmented data that doesn't 
                    enable proactive health protection or informed decision-making.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg">Impact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full mt-2"></div>
                        <div>
                          <strong>Health Risks:</strong> Citizens can't make informed decisions about outdoor activities
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full mt-2"></div>
                        <div>
                          <strong>Urban Planning:</strong> City managers lack real-time data for traffic and energy optimization
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2  rounded-full mt-2"></div>
                        <div>
                          <strong>Environmental Policy:</strong> Delayed data hinders rapid response to pollution events
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full mt-2"></div>
                        <div>
                          <strong>Economic Cost:</strong> Poor air quality reduces productivity and increases healthcare costs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg">Current Limitations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3  rounded-lg border">
                      <div className="">Most systems use simulated or delayed data</div>
                    </div>
                    <div className="p-3  rounded-lg border">
                      <div className="">Limited integration between different data sources</div>
                    </div>
                    <div className="p-3 rounded-lg border">
                      <div className="">Lack of predictive analytics and anomaly detection</div>
                    </div>
                    <div className="p-3  rounded-lg border">
                      <div className="">Poor user experience with complex, technical interfaces</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Proposed Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-xl">Weather Monitor System</h4>
                  <p className="text-gray-700 mb-4">
                    We propose developing a comprehensive <strong>real-time air quality monitoring and analytics system</strong> that:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-3  rounded-lg">
                        <Database className="h-5 w-5 text-blue-600" />
                        <span><strong>Processes Big Data:</strong> Handles 162,000+ data points daily from 11,000+ global monitoring stations</span>
                      </div>
                      <div className="flex items-center gap-2 p-3  rounded-lg">
                        <TrendingUp className="h-5 w-5 " />
                        <span><strong>Provides Real-time Insights:</strong> Delivers immediate air quality updates and health recommendations</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-3  rounded-lg">
                        <Code className="h-5 w-5 text-purple-600" />
                        <span><strong>Implements Advanced OOP:</strong> Demonstrates mastery of object-oriented programming principles</span>
                      </div>
                      <div className="flex items-center gap-2 p-3  rounded-lg">
                        <BarChart3 className="h-5 w-5 text-orange-600" />
                        <span><strong>Enables Predictive Analytics:</strong> Uses machine learning for traffic, health, and energy predictions</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg">Technical Approach</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-4  rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-2">Big Data Processing:</h5>
                      <ul className="space-y-1 text-blue-800 text-sm">
                        <li><strong>Volume:</strong> 15+ cities × 15 data points × 720 cycles/day = 162,000+ data points daily</li>
                        <li><strong>Velocity:</strong> Real-time API integration with 30-second update cycles</li>
                        <li><strong>Variety:</strong> Air quality indices, weather data, health recommendations, traffic predictions</li>
                        <li><strong>Veracity:</strong> Government monitoring stations, embassy sensors, verified API sources</li>
                      </ul>
                    </div>
                    <div className="p-4  rounded-lg">
                      <h5 className="font-semibold text-green-900 mb-2">OOP Architecture:</h5>
                      <ul className="space-y-1  text-sm">
                        <li><strong>15+ Classes:</strong> Complete service layer with analytics, data processing, and management classes</li>
                        <li><strong>5+ Interfaces:</strong> Abstract contracts for data processors, stream handlers, and analytics providers</li>
                        <li><strong>Multiple Design Patterns:</strong> Factory, Observer, Command, Singleton patterns</li>
                        <li><strong>3+ Inheritance Levels:</strong> Base → Abstract → Concrete class hierarchies</li>
                        <li><strong>Exception Handling:</strong> Custom exception classes with structured error management</li>
                        <li><strong>Enumerations:</strong> Type-safe constants for device types, statuses, and alerts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Project Scope & Deliverables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Core Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">1. Real-time Air Quality Dashboard</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Live data from 6 major global cities</li>
                        <li>• Color-coded health level indicators</li>
                        <li>• Detailed weather metrics (Temperature, Humidity, Precipitation, Wind Speed, Pressure)</li>
                        <li>• Weather integration (temperature, humidity, pressure, wind)</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">2. Advanced Analytics Engine</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Statistical anomaly detection (2σ threshold)</li>
                        <li>• Predictive health insights</li>
                        <li>• Traffic pattern predictions</li>
                        <li>• Energy demand forecasting</li>
                        <li>• Real-time alert generation</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">3. Intelligent Caching System</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Supabase-based data persistence</li>
                        <li>• 30-minute cache TTL optimization</li>
                        <li>• Cache-first strategy for performance</li>
                        <li>• Automatic fallback to live API</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">4. Interactive Presentation System</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Framer Motion animated slides</li>
                        <li>• Complete project documentation</li>
                        <li>• OOP architecture demonstration</li>
                        <li>• Live system walkthrough</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg">Technical Deliverables</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <strong>1. Complete Source Code</strong>
                        <div className="text-sm text-gray-600 mt-1">
                          TypeScript/React implementation, Comprehensive OOP architecture, Production-ready code quality
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <strong>2. Database Schema</strong>
                        <div className="text-sm text-gray-600 mt-1">
                          PostgreSQL/Supabase tables, Optimized indexes for performance, Row-level security policies
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <strong>3. API Integration</strong>
                        <div className="text-sm text-gray-600 mt-1">
                          AQICN World Air Quality Index API, TanStack Query for state management, Real-time data synchronization
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <strong>4. Documentation</strong>
                        <div className="text-sm text-gray-600 mt-1">
                          Complete README with setup instructions, API documentation and code comments, Architecture diagrams
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 ">
            <CardHeader>
              <CardTitle className="0">Expected Outcomes - Academic Requirements Met</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 " />
                    <span className=""><strong>15+ Classes:</strong> RealTimeAnalytics, DataConnector, BigDataProcessor, ManagementServices, IoTDevices</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 " />
                    <span className=""><strong>5+ Interfaces:</strong> IDataProcessor, IStreamProcessor, IBigDataEngine, IManagementService, IAnalyticsProvider</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 " />
                    <span className=""><strong>Exception Handling:</strong> SystemException hierarchy with component-specific error types</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 " />
                    <span className=""><strong>3+ Inheritance Levels:</strong> BaseDataProcessor → AbstractService → ConcreteImplementation</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 " />
                    <span className=""><strong>Polymorphism:</strong> Interface implementations with method overriding and dynamic dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 " />
                    <span className=""><strong>Enumerations:</strong> DeviceType, AlertSeverity, ProcessingStatus enums</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 " />
                    <span className=""><strong>Design Patterns:</strong> Factory, Observer, Command, Singleton patterns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 " />
                    <span className=""><strong>Architectural Style:</strong> Layered architecture with clear separation of concerns</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Risk Assessment & Mitigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Technical Risks</h4>
                  <div className="space-y-2">
                    <div className="p-3  rounded-lg border">
                      <div className="font-medium">API Rate Limits</div>
                      <div className=" text-sm">Mitigated by intelligent caching and demo token usage</div>
                    </div>
                    <div className="p-3  rounded-lg border ">
                      <div className="font-medium">Data Quality</div>
                      <div className=" text-sm">Handled through validation and fallback mechanisms</div>
                    </div>
                    <div className="p-3  rounded-lg border">
                      <div className="font-medium">Performance</div>
                      <div className=" text-sm">Addressed via optimized queries and efficient data structures</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Timeline Risks</h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg border">
                      <div className="font-medium">Scope Creep</div>
                      <div className="text-sm">Managed through clear requirements and phased development</div>
                    </div>
                    <div className="p-3 rounded-lg border">
                      <div className="font-medium">Technical Complexity</div>
                      <div className="text-sm">Reduced via incremental implementation and testing</div>
                    </div>
                    <div className="p-3 rounded-lg border">
                      <div className="font-medium">Integration Issues</div>
                      <div className="text-sm">Minimized through early API testing and modular design</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 ">
            <CardHeader>
              <CardTitle className="text-blue-900">Success Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg text-blue-900">Technical Success</h4>
                  <ul className="space-y-1 text-blue-800 text-sm">
                    <li>• All OOP requirements implemented and demonstrated</li>
                    <li>• Real-time data processing from 15+ cities</li>
                    <li>• Sub-second response times for cached data</li>
                    <li>• 99%+ uptime and error-free operation</li>
                    <li>• Complete test coverage and documentation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-lg text-blue-900">Academic Success</h4>
                  <ul className="space-y-1 text-blue-800 text-sm">
                    <li>• Exceeds all university project requirements</li>
                    <li>• Demonstrates mastery of advanced programming concepts</li>
                    <li>• Showcases real-world problem-solving skills</li>
                    <li>• Provides comprehensive technical documentation</li>
                    <li>• Delivers professional-quality presentation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2  ">
            <CardHeader>
              <CardTitle className="">Conclusion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className=" mb-4">
                This Weather Monitor System project represents a comprehensive implementation of advanced programming concepts 
                applied to solve real-world urban challenges. By combining rigorous OOP architecture with modern big data processing 
                and real-time analytics, the project delivers both academic excellence and practical value.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold  mb-2">The system demonstrates mastery of:</h5>
                  <ul className="space-y-1  text-sm">
                    <li>• Object-oriented programming principles</li>
                    <li>• Big data processing and analytics</li>
                    <li>• Real-time system architecture</li>
                    <li>• Modern web development practices</li>
                    <li>• Professional software development workflows</li>
                  </ul>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Github className="h-5 w-5 text-purple-600" />
                    <span className=" text-sm">GitHub Repository</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-600" />
                    <span className=" text-sm">Live Demo</span>
                  </div>
                </div>
              </div>
              <p className="text-purple-700 text-sm mt-4 italic">
                We are confident this project will exceed expectations and provide an excellent foundation for advanced programming 
                education while contributing to weather monitoring innovation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 