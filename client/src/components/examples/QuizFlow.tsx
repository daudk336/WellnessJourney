import QuizFlow from '../QuizFlow';

export default function QuizFlowExample() {
  return (
    <QuizFlow 
      onQuizComplete={(responses) => console.log('Quiz completed:', responses)}
      onBack={() => console.log('Back to home')}
    />
  );
}