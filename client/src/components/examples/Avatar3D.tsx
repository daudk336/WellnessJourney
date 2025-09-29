import Avatar3D from '../Avatar3D';

export default function Avatar3DExample() {
  const mockHealthMetrics = {
    dryPercentage: 65,
    oilPercentage: 35,
    hairHealth: 45,
    skinHealth: 60,
    bodyHealth: 70,
    mindHealth: 55
  };

  return (
    <div className="p-8 bg-background">
      <Avatar3D 
        healthMetrics={mockHealthMetrics}
        showTransformation={false}
        onTransformationComplete={() => console.log('Transformation complete')}
      />
    </div>
  );
}