import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, Sparkles, Zap } from 'lucide-react';

interface HealthMetrics {
  dryPercentage: number;
  oilPercentage: number;
  hairHealth: number;
  skinHealth: number;
  bodyHealth: number;
  mindHealth: number;
}

interface Avatar3DProps {
  healthMetrics: HealthMetrics;
  showTransformation?: boolean;
  onTransformationComplete?: () => void;
  uploadedImages?: {
    scalp?: string;
    face?: string;
    body?: string;
  };
}

export default function Avatar3D({ 
  healthMetrics, 
  showTransformation = false,
  onTransformationComplete,
  uploadedImages 
}: Avatar3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationProgress, setTransformationProgress] = useState(0);
  const [showHigherSelf, setShowHigherSelf] = useState(false);

  // Mock 3D avatar rendering - in real implementation would use Three.js
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    const drawAvatar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Basic avatar representation
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      if (isRotating) {
        ctx.rotate(rotation);
        rotation += 0.01; // Slow rotation
      }
      
      // Draw avatar body with health-based coloring
      const healthColor = getHealthColor(
        (healthMetrics.hairHealth + healthMetrics.skinHealth + 
         healthMetrics.bodyHealth + healthMetrics.mindHealth) / 4
      );
      
      // Head
      ctx.fillStyle = showHigherSelf ? '#fbbf24' : healthColor; // Golden glow for higher self
      ctx.beginPath();
      ctx.arc(0, -80, 40, 0, Math.PI * 2);
      ctx.fill();
      
      // Body
      ctx.fillStyle = showHigherSelf ? '#10b981' : healthColor;
      ctx.fillRect(-30, -40, 60, 100);
      
      // Health mesh overlay
      if (!showHigherSelf) {
        drawHealthMesh(ctx, healthMetrics);
      }
      
      ctx.restore();
      
      if (isRotating || isTransforming) {
        animationId = requestAnimationFrame(drawAvatar);
      }
    };

    drawAvatar();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [healthMetrics, isRotating, isTransforming, showHigherSelf]);

  // Handle transformation animation
  useEffect(() => {
    if (showTransformation && !isTransforming) {
      setIsTransforming(true);
      setTransformationProgress(0);
      
      const interval = setInterval(() => {
        setTransformationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsTransforming(false);
            setShowHigherSelf(true);
            onTransformationComplete?.();
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
  }, [showTransformation, onTransformationComplete]);

  const getHealthColor = (healthScore: number): string => {
    if (healthScore < 30) return '#ef4444'; // Red - critical
    if (healthScore < 60) return '#f59e0b'; // Yellow - moderate
    return '#10b981'; // Green - healthy
  };

  const drawHealthMesh = (ctx: CanvasRenderingContext2D, metrics: HealthMetrics) => {
    // Draw color-coded mesh overlay based on health metrics
    ctx.globalAlpha = 0.3;
    
    // Hair area (top of head)
    ctx.fillStyle = getHealthColor(metrics.hairHealth);
    ctx.fillRect(-30, -120, 60, 40);
    
    // Face area
    ctx.fillStyle = getHealthColor(metrics.skinHealth);
    ctx.fillRect(-40, -80, 80, 60);
    
    // Body area
    ctx.fillStyle = getHealthColor(metrics.bodyHealth);
    ctx.fillRect(-30, -40, 60, 100);
    
    ctx.globalAlpha = 1;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* 3D Avatar Display */}
      <Card className="overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif">
            {showHigherSelf ? (
              <span className="flex items-center justify-center gap-2 text-accent">
                <Sparkles className="w-6 h-6" />
                Your Higher Self
                <Sparkles className="w-6 h-6" />
              </span>
            ) : (
              "Your Current Health State"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {/* Avatar Canvas */}
          <div className="relative bg-gradient-to-b from-primary/10 to-accent/5 rounded-xl p-8 mb-6">
            <canvas 
              ref={canvasRef}
              width={400}
              height={400}
              className="w-full h-96 mx-auto"
              data-testid="avatar-canvas"
            />
            
            {/* Transformation Effect */}
            {isTransforming && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl">
                <div className="text-center text-white space-y-4">
                  <Zap className="w-12 h-12 mx-auto animate-pulse text-accent" />
                  <h3 className="text-xl font-semibold">Transforming...</h3>
                  <Progress value={transformationProgress} className="w-48" />
                  <p className="text-sm">Nano-molecular restructuring in progress</p>
                </div>
              </div>
            )}
            
            {/* Rotation Control */}
            <Button
              size="sm"
              variant="outline"
              className="absolute top-4 right-4"
              onClick={() => setIsRotating(!isRotating)}
              data-testid="button-toggle-rotation"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {isRotating ? 'Pause' : 'Rotate'}
            </Button>
          </div>

          {/* Health Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard 
              title="Hair Health" 
              value={healthMetrics.hairHealth} 
              color="chart-1"
            />
            <MetricCard 
              title="Skin Health" 
              value={healthMetrics.skinHealth} 
              color="chart-2"
            />
            <MetricCard 
              title="Body Health" 
              value={healthMetrics.bodyHealth} 
              color="chart-3"
            />
            <MetricCard 
              title="Mind Health" 
              value={healthMetrics.mindHealth} 
              color="chart-4"
            />
          </div>

          {/* Hydration Metrics */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Dry %</span>
                  <span className="text-lg font-bold text-chart-2">
                    {healthMetrics.dryPercentage}%
                  </span>
                </div>
                <Progress 
                  value={healthMetrics.dryPercentage} 
                  className="h-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Oil %</span>
                  <span className="text-lg font-bold text-chart-1">
                    {healthMetrics.oilPercentage}%
                  </span>
                </div>
                <Progress 
                  value={healthMetrics.oilPercentage} 
                  className="h-2"
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: number;
  color: string;
}

function MetricCard({ title, value, color }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">{title}</h4>
        <div className="relative">
          <div className={`text-2xl font-bold text-${color}`}>{value}%</div>
          <Progress value={value} className="h-2 mt-2" />
        </div>
      </CardContent>
    </Card>
  );
}