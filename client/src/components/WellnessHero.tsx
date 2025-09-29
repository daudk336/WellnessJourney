import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, Brain, Zap } from "lucide-react";
import heroImage from "@assets/generated_images/Wellness_consultation_room_background_a3fe4dad.png";

interface WellnessHeroProps {
  onStartQuiz: () => void;
}

export default function WellnessHero({ onStartQuiz }: WellnessHeroProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary/20 to-accent/10">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-accent animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
              Transform Into Your
              <span className="block text-accent">Higher Self</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cream/90 leading-relaxed">
              Discover your personalized wellness journey through our comprehensive 
              holistic health assessment. Transform your hair, skin, body, and mind.
            </p>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover-elevate">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h3 className="font-semibold text-lg mb-2">Hair Health</h3>
                <p className="text-sm text-cream/80">Restore thickness & vitality</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover-elevate">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h3 className="font-semibold text-lg mb-2">Skin Radiance</h3>
                <p className="text-sm text-cream/80">Achieve flawless clarity</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover-elevate">
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h3 className="font-semibold text-lg mb-2">Body Energy</h3>
                <p className="text-sm text-cream/80">Optimize physical wellness</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover-elevate">
              <CardContent className="p-6 text-center">
                <Brain className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h3 className="font-semibold text-lg mb-2">Mind Clarity</h3>
                <p className="text-sm text-cream/80">Enhance mental wellness</p>
              </CardContent>
            </Card>
          </div>
          
          {/* CTA */}
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="text-xl px-12 py-6 bg-accent hover:bg-accent/90 text-primary font-semibold rounded-xl shadow-xl"
              onClick={onStartQuiz}
              data-testid="button-start-quiz"
            >
              Start Your Transformation Journey
            </Button>
            <p className="text-sm text-cream/70">
              ✨ Free comprehensive assessment • 3D avatar visualization • Personalized program
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}