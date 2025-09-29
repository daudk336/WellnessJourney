import ProgramTiers from '../ProgramTiers';

export default function ProgramTiersExample() {
  return (
    <div className="p-8 bg-background">
      <ProgramTiers 
        onTierSelect={(tier, customizations) => console.log('Tier selected:', tier, customizations)}
      />
    </div>
  );
}