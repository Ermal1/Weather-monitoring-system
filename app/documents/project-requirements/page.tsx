import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Users, Code, Presentation, BookOpen } from 'lucide-react'

export default function ProjectRequirementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Advanced Programming Project Assignment
          </h1>
          <div className="flex justify-center gap-4 mb-4">
            <Badge variant="outline" className="px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              Course Instructors: Dr.Sc Edmond Jajaga
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <BookOpen className="h-4 w-4 mr-2" />
              Erind Avdiu – UBT - Advanced Programming Course
            </Badge>
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Project Assignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Implement an application in an innovative field of your choice. Here are some alternatives:
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">1. OOP Application</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                Include the following object-oriented assets:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">At least 5 interfaces/abstract classes</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">At least 15 classes</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="font-medium">At least 1 exception class</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="font-medium">At least 3 levels of inheritance depth</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="font-medium">At least 1 polymorphism usage</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="font-medium">At least 1 enumeration</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="font-medium">At least 1 architectural style</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="font-medium">At least 3 design patterns</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Design Patterns Examples:</strong> Composite, Singleton, Factory, Wrapper, Bridge, Command, Iterator, etc.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">2. Big Data, Grid Computing, Blockchain, or Peer-to-Peer Application</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Big Data</h4>
                  <p className="text-gray-700 text-sm">
                    Analyze or process data too large for traditional systems.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Grid Computing</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Share computing power, storage, and software apps. Core requirements:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Independent management of computing resources</li>
                    <li>• Intelligent and transparent resource selection</li>
                    <li>• Understanding of resource load, availability, and configuration</li>
                    <li>• Failure detection and failover</li>
                    <li>• Security mechanisms for access and integrity</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Examples:</strong> SETI@home, World Community Grid
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">3. Parallel Processing Application</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Compare performance of different parallel algorithms on different machines</li>
                <li>• Add high-performance parallel bindings to systems like JavaScript or Python (e.g., PyCuda)</li>
                <li>• Any project discussed during class is acceptable</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Code className="h-5 w-5" />
                General Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Your project is an opportunity to dive deeply into advanced programming. You are expected to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Show knowledge of <strong>object-oriented</strong> or <strong>emerging paradigms</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span><strong>Divide modules</strong> among team members</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Use and improve <strong>open-source</strong> applications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Conduct <strong>research</strong> on similar approaches</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Additional Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Follow best practices in OO design:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Data encapsulation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Proper exception handling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Correct usage of inheritance, abstraction, and polymorphism</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Strong cohesion and loose coupling</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Use a <strong>versioning system</strong> (e.g., GitHub) for collaboration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Optionally, provide a <strong>class diagram</strong> for your types</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Presentation className="h-5 w-5" />
                Deliverables (ZIP File Submission)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                One team member should submit a ZIP archive containing:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">1. Project Proposal (1-2 pages)</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Describe the team members</li>
                    <li>• Define the problem you plan to solve</li>
                    <li>• Outline your solution and what you plan to deliver</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">2. Source Code</h4>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">3. Project Report (Conference Paper Format)</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Application Name</li>
                    <li>• Team name and list of team members</li>
                    <li>• Project purpose – what problem do you solve?</li>
                    <li>• Optional: class diagram</li>
                    <li>• Related works – advantages of your approach</li>
                    <li>• Code fragments (important logic)</li>
                    <li>• Screenshots of the UI</li>
                    <li>• GitHub repo URL (do not delete it)</li>
                    <li>• Any other optional information</li>
                    <li>• Follow the template on Moodle</li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">4. Optional: PowerPoint Presentation</h4>
                  <p className="text-sm text-orange-800">For Project Defense</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-900">Public Project Defense</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-800 mb-4">
                You will present your work publicly. You have <strong>20 minutes</strong>, no more.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">In your presentation:</h4>
                  <ul className="space-y-2 text-yellow-800">
                    <li>• Demonstrate the application (briefly)</li>
                    <li>• Show the class diagram (glance)</li>
                    <li>• Browse the source code on GitHub</li>
                    <li>• Show Git commit logs (to verify each team member's contribution)</li>
                    <li>• Optionally: prepare 3–4 slides PowerPoint</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">Important Notes:</h4>
                  <ul className="space-y-1 text-red-800 text-sm">
                    <li>• Be strict with time</li>
                    <li>• Bring your own laptop</li>
                    <li>• Test the projector beforehand</li>
                    <li>• Open everything in advance to save time</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Teammate Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                You will be asked to provide <strong>feedback about each teammate</strong>, including:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <div className="font-semibold text-blue-900">Technical skills</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <div className="font-semibold text-green-900">Attitude</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <div className="font-semibold text-purple-900">Teamwork and contribution</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4 text-center">
                This feedback is an important part of the <strong>final project evaluation</strong>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 