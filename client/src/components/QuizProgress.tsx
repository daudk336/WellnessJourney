import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export default function QuizProgress({ currentStep, totalSteps, stepTitles }: QuizProgressProps) {
  const progressPercentage = ((currentStep) / totalSteps) * 100;
  
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <Progress 
          value={progressPercentage} 
          className="h-3 bg-secondary"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
      </div>
      
      {/* Step Indicators */}
      <div className="flex justify-between items-center">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
              ${index < currentStep 
                ? 'bg-primary text-primary-foreground' 
                : index === currentStep 
                ? 'bg-accent text-primary' 
                : 'bg-secondary text-secondary-foreground'
              }
            `}>
              {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
            </div>
            <span className={`text-xs text-center max-w-16 leading-tight ${
              index === currentStep ? 'text-primary font-semibold' : 'text-muted-foreground'
            }`}>
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}