import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Brain, 
  Heart, 
  Zap, 
  Shield, 
  Users, 
  Smartphone, 
  Award,
  Clock,
  Target
} from 'lucide-react';
import featuresImage from "@assets/generated_images/Wellness_program_features_infographic_10c138b2.png";

interface ProgramFeature {
  icon: any;
  title: string;
  description: string;
  benefits: string[];
}

const features: ProgramFeature[] = [
  {
    icon: Sparkles,
    title: "3D Avatar Analysis",
    description: "Revolutionary visualization of your current health state and transformation potential",
    benefits: [
      "Real-time health metrics visualization",
      "Color-coded concern area mapping", 
      "Higher Self transformation preview",
      "Progress tracking through avatar updates"
    ]
  },
  {
    icon: Brain,
    title: "AI-Powered Personalization",
    description: "Custom wellness protocols based on your unique health profile and goals",
    benefits: [
      "Personalized nutrition plans",
      "Targeted supplement recommendations",
      "Custom exercise routines",
      "Adaptive program adjustments"
    ]
  },
  {
    icon: Heart,
    title: "Holistic Health Integration",
    description: "Complete mind-body-spirit approach addressing all aspects of wellness",
    benefits: [
      "Hair & scalp restoration",
      "Skin rejuvenation protocols", 
      "Body optimization programs",
      "Mental wellness training"
    ]
  },
  {
    icon: Users,
    title: "Expert Coaching Support",
    description: "Access to certified wellness coaches and health practitioners",
    benefits: [
      "1-on-1 coaching sessions",
      "Group support meetings",
      "Expert Q&A sessions",
      "24/7 community support"
    ]
  },
  {
    icon: Smartphone,
    title: "Mobile App Integration",
    description: "Track your progress and access your program anywhere, anytime",
    benefits: [
      "Real-time progress tracking",
      "Daily wellness reminders",
      "Photo progress comparisons",
      "Offline access to materials"
    ]
  },
  {
    icon: Shield,
    title: "90-Day Guarantee",
    description: "Complete satisfaction guarantee with visible results or full refund",
    benefits: [
      "Risk-free transformation",
      "Measurable result tracking",
      "Full refund protection",
      "Extension options available"
    ]
  }
];

const programHighlights = [
  { 
    icon: Clock, 
    title: "Fast Results", 
    subtitle: "Visible changes in 2-4 weeks" 
  },
  { 
    icon: Target, 
    title: "Precision Targeting", 
    subtitle: "Address your specific concerns" 
  },
  { 
    icon: Award, 
    title: "Proven Method", 
    subtitle: "98% success rate with clients" 
  },
  { 
    icon: Zap, 
    title: "Energy Boost", 
    subtitle: "Feel 10 years younger" 
  }
];

export default function ProgramFeatures() {
  return (
    <div className="w-full py-16 bg-gradient-to-b from-accent/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">
            🌟 Premium Program Features
          </Badge>
          <h2 className="text-4xl font-serif font-bold text-primary mb-6">
            Transform Every Aspect of Your Wellness
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Our comprehensive program combines cutting-edge technology with proven 
            holistic practices to deliver unprecedented transformation results.
          </p>
          
          {/* Feature Image */}
          <div className="max-w-2xl mx-auto mb-12">
            <img 
              src={featuresImage}
              alt="Program features overview"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Program Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {programHighlights.map((highlight, index) => (
            <Card key={index} className="text-center hover-elevate">
              <CardContent className="p-6">
                <highlight.icon className="w-8 h-8 mx-auto text-accent mb-3" />
                <h3 className="font-semibold text-primary mb-1">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Features */}
        <div className="grid lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-primary">
                      {feature.title}
                    </CardTitle>
                  </div>
                </div>
                <p className="text-muted-foreground mt-2">
                  {feature.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-primary mb-3">
                    Key Benefits:
                  </h4>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <Card className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">
              Ready to Experience Your Transformation?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of others who have already discovered their Higher Self 
              through our proven wellness transformation system.
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <span>90-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <span>Expert Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                <span>Proven Results</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}