import { useState } from 'react';
import WellnessHero from '@/components/WellnessHero';
import QuizFlow from '@/components/QuizFlow';
import Avatar3D from '@/components/Avatar3D';
import Testimonials from '@/components/Testimonials';
import ProgramFeatures from '@/components/ProgramFeatures';
import ProgramTiers from '@/components/ProgramTiers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, ArrowLeft } from 'lucide-react';

type AppState = 'hero' | 'quiz' | 'results' | 'program-selection';

interface QuizResults {
  responses: any;
  healthMetrics: {
    dryPercentage: number;
    oilPercentage: number;
    hairHealth: number;
    skinHealth: number;
    bodyHealth: number;
    mindHealth: number;
  };
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>('hero');
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [showTransformation, setShowTransformation] = useState(false);

  const handleStartQuiz = () => {
    setAppState('quiz');
  };

  const handleQuizComplete = (responses: any) => {
    //todo: remove mock functionality - calculate real health metrics from responses
    const mockHealthMetrics = {
      dryPercentage: 65,
      oilPercentage: 35,
      hairHealth: Math.floor(Math.random() * 40) + 30, // 30-70
      skinHealth: Math.floor(Math.random() * 40) + 40, // 40-80
      bodyHealth: Math.floor(Math.random() * 40) + 50, // 50-90
      mindHealth: Math.floor(Math.random() * 40) + 35  // 35-75
    };

    setQuizResults({
      responses,
      healthMetrics: mockHealthMetrics
    });
    setAppState('results');
  };

  const handleTransformationComplete = () => {
    setShowTransformation(false);
    setTimeout(() => {
      setAppState('program-selection');
    }, 1000);
  };

  const handleTierSelect = (tier: any, customizations?: string[]) => {
    console.log('Selected tier:', tier);
    console.log('Customizations:', customizations);
    // Here you would integrate with Stripe payment processing
    alert(`Selected ${tier.name} program! Proceeding to checkout...`);
  };

  const handleBackToHome = () => {
    setAppState('hero');
    setQuizResults(null);
    setShowTransformation(false);
  };

  const renderContent = () => {
    switch (appState) {
      case 'hero':
        return (
          <>
            <WellnessHero onStartQuiz={handleStartQuiz} />
            <ProgramFeatures />
            <Testimonials />
          </>
        );

      case 'quiz':
        return (
          <QuizFlow 
            onQuizComplete={handleQuizComplete}
            onBack={handleBackToHome}
          />
        );

      case 'results':
        return (
          <div className="min-h-screen bg-gradient-to-b from-background to-accent/5 py-16">
            <div className="container mx-auto px-4">
              {/* Back Button */}
              <Button
                variant="outline"
                className="mb-8"
                onClick={handleBackToHome}
                data-testid="button-back-home"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>

              {/* Results Header */}
              <Card className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-serif font-bold text-primary">
                    Your Wellness Assessment Results
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Based on your comprehensive health evaluation, here's your personalized transformation preview
                  </p>
                </CardHeader>
              </Card>

              {/* Avatar Display */}
              {quizResults && (
                <Avatar3D
                  healthMetrics={quizResults.healthMetrics}
                  showTransformation={showTransformation}
                  onTransformationComplete={handleTransformationComplete}
                  uploadedImages={quizResults.responses.uploadedImages}
                />
              )}

              {/* Action Buttons */}
              <div className="max-w-4xl mx-auto text-center mt-12 space-y-6">
                {!showTransformation && appState === 'results' && (
                  <div className="space-y-4">
                    <Button
                      size="lg"
                      className="text-lg px-8 py-4"
                      onClick={() => setShowTransformation(true)}
                      data-testid="button-show-transformation"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      See Your Higher Self Transformation
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Discover what's possible with our personalized wellness program
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'program-selection':
        return (
          <div className="min-h-screen bg-gradient-to-b from-background to-accent/5 py-16">
            <div className="container mx-auto px-4">
              {/* Back Button */}
              <Button
                variant="outline"
                className="mb-8"
                onClick={() => setAppState('results')}
                data-testid="button-back-results"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Results
              </Button>

              {/* Program Selection Header */}
              <Card className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-serif font-bold text-primary">
                    Choose Your Transformation Program
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Select the perfect program to achieve your Higher Self transformation
                  </p>
                </CardHeader>
              </Card>

              <Testimonials />
              <ProgramTiers onTierSelect={handleTierSelect} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderContent();
}