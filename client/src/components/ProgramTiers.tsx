import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Crown, Star, Zap, Check, Timer } from 'lucide-react';

interface ProgramTier {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  billing: 'annual' | 'monthly';
  features: string[];
  popular?: boolean;
  premium?: boolean;
  customizable?: boolean;
}

interface ProgramTiersProps {
  onTierSelect: (tier: ProgramTier, customizations?: string[]) => void;
  selectedTier?: string;
}

const tiers: ProgramTier[] = [
  {
    id: 'premium',
    name: 'Higher Self Transformation',
    description: 'Complete holistic transformation program',
    price: 2997,
    originalPrice: 4997,
    billing: 'annual',
    premium: true,
    customizable: true,
    features: [
      'Personalized 3D Avatar Analysis',
      'Complete Hair Restoration Protocol',
      'Advanced Skin Rejuvenation System',
      'Body Optimization Program',
      'Mindfulness & Mental Clarity Training',
      '1-on-1 Wellness Coaching (12 sessions)',
      'Premium Supplement Bundle',
      'Mobile App with Progress Tracking',
      'Priority Support & Community Access',
      '90-Day Transformation Guarantee'
    ]
  },
  {
    id: 'transformation',
    name: 'Wellness Transformation',
    description: 'Comprehensive wellness improvement',
    price: 1497,
    originalPrice: 2497,
    billing: 'annual',
    popular: true,
    features: [
      'Personalized Health Assessment',
      'Hair & Skin Improvement Protocol',
      'Body Wellness Program',
      'Basic Mental Wellness Training',
      'Group Coaching Sessions (6 sessions)',
      'Essential Supplement Package',
      'Mobile App Access',
      'Community Support'
    ]
  },
  {
    id: 'basic',
    name: 'Wellness Foundation',
    description: 'Essential wellness basics',
    price: 97,
    billing: 'monthly',
    features: [
      'Basic Health Assessment',
      'Wellness Guidelines',
      'Monthly Group Sessions',
      'Mobile App Access',
      'Community Forum'
    ]
  }
];

const customizationOptions = [
  { id: 'hair-advanced', label: 'Advanced Hair Restoration', price: 497 },
  { id: 'skin-premium', label: 'Premium Skin Rejuvenation', price: 397 },
  { id: 'body-intensive', label: 'Intensive Body Transformation', price: 597 },
  { id: 'mind-mastery', label: 'Mind Mastery Program', price: 297 },
  { id: 'nutrition-custom', label: 'Custom Nutrition Plan', price: 197 },
  { id: 'supplements-premium', label: 'Premium Supplement Stack', price: 397 }
];

export default function ProgramTiers({ onTierSelect, selectedTier }: ProgramTiersProps) {
  const [customizations, setCustomizations] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [showCustomizer, setShowCustomizer] = useState(false);

  // Countdown timer effect (mock implementation)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateCustomPrice = (basePrice: number) => {
    const customizationCost = customizations.reduce((total, customId) => {
      const option = customizationOptions.find(opt => opt.id === customId);
      return total + (option?.price || 0);
    }, 0);
    return basePrice + customizationCost;
  };

  const handleTierSelect = (tier: ProgramTier) => {
    if (tier.customizable && tier.id === 'premium') {
      setShowCustomizer(true);
    } else {
      onTierSelect(tier);
    }
  };

  const handleCustomizedSelect = (tier: ProgramTier) => {
    onTierSelect(tier, customizations);
    setShowCustomizer(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Countdown Timer */}
      <Card className="bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/20">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-destructive">
            <Timer className="w-5 h-5" />
            <span className="font-semibold">Limited Time Offer Expires In: </span>
            <Badge variant="destructive" className="font-mono text-lg px-3 py-1">
              {formatTime(timeLeft)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Exclusive bonuses and pricing available for a limited time only
          </p>
        </CardContent>
      </Card>

      {/* Tier Cards */}
      {!showCustomizer ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <Card 
              key={tier.id}
              className={`relative hover-elevate ${
                tier.premium 
                  ? 'border-accent shadow-lg ring-2 ring-accent/20' 
                  : tier.popular 
                  ? 'border-primary shadow-md' 
                  : ''
              }`}
            >
              {tier.premium && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-primary px-4 py-1">
                    <Crown className="w-4 h-4 mr-1" />
                    PREMIUM
                  </Badge>
                </div>
              )}
              
              {tier.popular && !tier.premium && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    POPULAR
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
                
                <div className="py-4">
                  {tier.originalPrice && (
                    <div className="text-lg text-muted-foreground line-through">
                      ${tier.originalPrice}
                    </div>
                  )}
                  <div className="text-4xl font-bold text-primary">
                    ${tier.price}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    /{tier.billing}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full"
                  variant={tier.premium ? "default" : tier.popular ? "outline" : "secondary"}
                  size="lg"
                  onClick={() => handleTierSelect(tier)}
                  data-testid={`button-select-${tier.id}`}
                >
                  {tier.premium && <Zap className="w-4 h-4 mr-2" />}
                  {tier.customizable ? 'Customize Program' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Program Customizer */
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Customize Your Premium Program
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Build your perfect transformation journey
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Base Program */}
            <div className="bg-accent/5 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Base Program Included
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {tiers[0].features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customization Options */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">
                Additional Enhancements
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {customizationOptions.map((option) => (
                  <Card key={option.id} className="hover-elevate">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={option.id}
                          checked={customizations.includes(option.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setCustomizations([...customizations, option.id]);
                            } else {
                              setCustomizations(customizations.filter(c => c !== option.id));
                            }
                          }}
                          data-testid={`checkbox-${option.id}`}
                        />
                        <div className="flex-1">
                          <Label htmlFor={option.id} className="font-medium cursor-pointer">
                            {option.label}
                          </Label>
                          <div className="text-sm text-primary font-semibold mt-1">
                            +${option.price}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg">Base Program:</span>
                  <span className="text-lg">${tiers[0].price}</span>
                </div>
                {customizations.length > 0 && (
                  <>
                    <div className="space-y-2 mb-4">
                      {customizations.map(customId => {
                        const option = customizationOptions.find(opt => opt.id === customId);
                        return option ? (
                          <div key={customId} className="flex justify-between text-sm">
                            <span>{option.label}:</span>
                            <span>+${option.price}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total:</span>
                        <span className="text-primary">${calculateCustomPrice(tiers[0].price)}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setShowCustomizer(false)}
                className="flex-1"
                data-testid="button-back-to-tiers"
              >
                Back to Plans
              </Button>
              <Button 
                size="lg" 
                onClick={() => handleCustomizedSelect(tiers[0])}
                className="flex-1"
                data-testid="button-proceed-custom"
              >
                <Zap className="w-4 h-4 mr-2" />
                Proceed to Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}