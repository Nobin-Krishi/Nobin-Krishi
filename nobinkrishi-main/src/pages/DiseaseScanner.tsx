import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { 
  Camera, Upload, Crosshair, Loader2, CheckCircle, AlertTriangle, 
  Brain, FileCheck, CheckSquare, Save, ShoppingBag, MessageCircle, Share2,
  Info, Pill, Shield, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const diseases = [
  { id: 1, name: "Rice Blast", nameBn: "ধানের ব্লাস্ট", crop: "Rice", severity: "High", type: "Fungal" },
  { id: 2, name: "Bacterial Leaf Blight", nameBn: "ব্যাকটেরিয়াল লিফ ব্লাইট", crop: "Rice", severity: "Medium", type: "Bacterial" },
  { id: 3, name: "Potato Late Blight", nameBn: "আলুর লেট ব্লাইট", crop: "Potato", severity: "High", type: "Fungal" },
  { id: 4, name: "Tomato Mosaic", nameBn: "টমেটো মোজাইক", crop: "Tomato", severity: "Medium", type: "Viral" },
  { id: 5, name: "Aphid Infestation", nameBn: "জাব পোকার আক্রমণ", crop: "Multiple", severity: "Low", type: "Pest" },
];

const steps = [
  { icon: Camera, title: "Capture or Upload", desc: "Take a clear photo of affected plant part" },
  { icon: Brain, title: "AI Analysis", desc: "Dhenu-vision model processes image" },
  { icon: FileCheck, title: "Get Results", desc: "Receive diagnosis and treatment plan" },
  { icon: CheckSquare, title: "Take Action", desc: "Follow recommendations and track progress" },
];

const DiseaseScanner = () => {
  const [scanState, setScanState] = useState<"idle" | "uploading" | "analyzing" | "results">("idle");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultTab, setResultTab] = useState("overview");

  const simulateScan = () => {
    setScanState("uploading");
    setTimeout(() => {
      setScanState("analyzing");
      setTimeout(() => {
        setScanState("results");
      }, 2500);
    }, 1000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        simulateScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const resetScanner = () => {
    setScanState("idle");
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary/90 to-accent/80">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            AI-Powered Disease Detection
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Identify crop diseases instantly with your smartphone camera
          </p>
        </div>
      </section>

      {/* Scanner Interface */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-6">
          <Card className="max-w-4xl mx-auto overflow-hidden shadow-strong rounded-card-xl">
            {scanState === "idle" && (
              <div className="p-8">
                {/* Camera Area */}
                <div className="relative aspect-video bg-muted rounded-card-lg overflow-hidden mb-6 border-2 border-dashed border-border hover:border-primary transition-colors">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="relative">
                      <Crosshair className="w-24 h-24 text-primary/30" />
                      <Camera className="w-12 h-12 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-muted-foreground mt-4">Position the affected plant part within the frame</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="flex-1 sm:flex-none" onClick={simulateScan}>
                    <Camera className="w-5 h-5 mr-2" /> Capture Photo
                  </Button>
                  <label>
                    <Button size="lg" variant="outline" className="flex-1 sm:flex-none w-full" asChild>
                      <span>
                        <Upload className="w-5 h-5 mr-2" /> Upload from Gallery
                      </span>
                    </Button>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                  </label>
                </div>

                {/* Tips */}
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-primary">Tips:</strong> Ensure good lighting, focus on the affected area, 
                    and capture close-up images for better accuracy.
                  </p>
                </div>
              </div>
            )}

            {(scanState === "uploading" || scanState === "analyzing") && (
              <div className="p-12 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin" />
                  <div className="absolute inset-4 bg-primary/10 rounded-full flex items-center justify-center">
                    {scanState === "uploading" ? (
                      <Upload className="w-10 h-10 text-primary" />
                    ) : (
                      <Brain className="w-10 h-10 text-primary" />
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {scanState === "uploading" ? "Uploading Image..." : "Analyzing with AI..."}
                </h3>
                <p className="text-muted-foreground">
                  {scanState === "uploading" 
                    ? "Please wait while we upload your image" 
                    : "Dhenu-vision model is processing your image"}
                </p>
                <Progress value={scanState === "uploading" ? 50 : 85} className="mt-6 max-w-xs mx-auto" />
              </div>
            )}

            {scanState === "results" && (
              <div className="p-6">
                {/* Result Header */}
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {/* Image Preview */}
                  <div className="w-full md:w-48 h-48 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    {selectedImage ? (
                      <img src={selectedImage} alt="Scanned" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                        <Camera className="w-12 h-12 text-primary/50" />
                      </div>
                    )}
                  </div>

                  {/* Disease Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">Rice Blast</h2>
                        <p className="text-lg text-muted-foreground">ধানের ব্লাস্ট রোগ</p>
                      </div>
                      <span className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-medium">
                        High Severity
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Confidence</p>
                        <p className="font-semibold text-primary">94%</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="font-semibold">Fungal</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Crop</p>
                        <p className="font-semibold">Rice</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Stage</p>
                        <p className="font-semibold">Moderate</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Tabs */}
                <Tabs value={resultTab} onValueChange={setResultTab}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="overview" className="gap-1">
                      <Info className="w-4 h-4" /> Overview
                    </TabsTrigger>
                    <TabsTrigger value="treatment" className="gap-1">
                      <Pill className="w-4 h-4" /> Treatment
                    </TabsTrigger>
                    <TabsTrigger value="prevention" className="gap-1">
                      <Shield className="w-4 h-4" /> Prevention
                    </TabsTrigger>
                    <TabsTrigger value="similar" className="gap-1">
                      <Eye className="w-4 h-4" /> Similar
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-4 space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        Rice blast is caused by the fungus Magnaporthe oryzae. It affects leaves, nodes, 
                        and panicles, causing diamond-shaped lesions with gray centers and brown borders.
                      </p>
                    </div>
                    <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                      <h4 className="font-semibold mb-2 text-warning">Symptoms to Watch</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Diamond-shaped lesions on leaves</li>
                        <li>• Gray or white centers with brown margins</li>
                        <li>• Collar rot at leaf blade junction</li>
                        <li>• Panicle neck blast in severe cases</li>
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="treatment" className="mt-4 space-y-4">
                    <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                      <h4 className="font-semibold mb-2 text-destructive">Immediate Actions</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Apply Tricyclazole 75% WP @ 0.6g/L water</li>
                        <li>• Spray during early morning or late evening</li>
                        <li>• Repeat after 10-14 days if needed</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Recommended Products</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {["Tricyclazole", "Carbendazim", "Propiconazole", "Azoxystrobin"].map((product) => (
                          <div key={product} className="p-2 bg-background rounded border text-sm">{product}</div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="prevention" className="mt-4 space-y-4">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <h4 className="font-semibold mb-2 text-primary">Cultural Practices</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Use disease-resistant varieties</li>
                        <li>• Maintain proper plant spacing</li>
                        <li>• Avoid excessive nitrogen fertilization</li>
                        <li>• Ensure proper drainage in fields</li>
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="similar" className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      {["Brown Spot", "Sheath Blight"].map((disease) => (
                        <div key={disease} className="p-4 border rounded-lg">
                          <h4 className="font-semibold">{disease}</h4>
                          <p className="text-sm text-muted-foreground">Often confused with Rice Blast</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t">
                  <Button>
                    <Save className="w-4 h-4 mr-2" /> Save to Records
                  </Button>
                  <Button variant="outline">
                    <ShoppingBag className="w-4 h-4 mr-2" /> Get Treatment Products
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" /> Consult Expert
                  </Button>
                  <Button variant="ghost">
                    <Share2 className="w-4 h-4 mr-2" /> Share
                  </Button>
                  <Button variant="ghost" onClick={resetScanner} className="ml-auto">
                    Scan Another
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-primary-dark mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="w-8 h-8 mx-auto -mt-12 mb-4 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "98.5%", label: "Identification Accuracy" },
              { value: "50+", label: "Diseases Detected" },
              { value: "200K+", label: "Scans Performed" },
              { value: "15s", label: "Processing Time" },
            ].map((stat, i) => (
              <div key={i} className="p-6">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disease Library */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-primary-dark mb-12">
            Disease Library
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {diseases.map((disease) => (
              <Card key={disease.id} className="p-4 hover:shadow-hover transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{disease.name}</h3>
                    <p className="text-sm text-muted-foreground">{disease.nameBn}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    disease.severity === "High" ? "bg-destructive/10 text-destructive" :
                    disease.severity === "Medium" ? "bg-warning/10 text-warning" :
                    "bg-primary/10 text-primary"
                  }`}>
                    {disease.severity}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="text-xs bg-muted px-2 py-1 rounded">{disease.crop}</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">{disease.type}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DiseaseScanner;
