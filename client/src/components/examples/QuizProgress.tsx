import QuizProgress from '../QuizProgress';

export default function QuizProgressExample() {
  return (
    <div className="p-8 bg-background">
      <QuizProgress 
        currentStep={2}
        totalSteps={5}
        stepTitles={['Hair', 'Skin', 'Body', 'Mind', 'Personal']}
      />
    </div>
  );
}