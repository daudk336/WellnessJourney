import WellnessHero from '../WellnessHero';

export default function WellnessHeroExample() {
  return (
    <WellnessHero 
      onStartQuiz={() => console.log('Start quiz clicked')} 
    />
  );
}