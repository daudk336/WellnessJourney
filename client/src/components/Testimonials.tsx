import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from 'lucide-react';
import testimonialImage from "@assets/generated_images/Before_after_transformation_testimonial_ada51c10.png";

interface Testimonial {
  id: string;
  name: string;
  age: number;
  location: string;
  beforeAfterImage: string;
  testimonial: string;
  transformationTime: string;
  results: string[];
  rating: number;
}

//todo: remove mock functionality - replace with real testimonial data
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    age: 34,
    location: 'Kuala Lumpur',
    beforeAfterImage: testimonialImage,
    testimonial: "I couldn't believe the transformation! My hair grew back thicker than ever, my skin cleared up completely, and I lost 15kg. The 3D avatar showed me exactly what was possible, and the program delivered everything it promised.",
    transformationTime: '90 days',
    results: ['Hair density increased 70%', 'Acne completely cleared', '15kg weight loss', 'Energy levels doubled'],
    rating: 5
  },
  {
    id: '2', 
    name: 'Ahmad Rahman',
    age: 41,
    location: 'Johor Bahru',
    beforeAfterImage: testimonialImage,
    testimonial: "After years of trying different solutions, this program finally worked. The personalized approach based on my avatar analysis made all the difference. I look and feel 10 years younger!",
    transformationTime: '120 days',
    results: ['Eliminated gray hair', 'Reduced wrinkles 60%', 'Improved sleep quality', 'Stress levels decreased'],
    rating: 5
  },
  {
    id: '3',
    name: 'Lisa Tan',
    age: 28,
    location: 'Penang',
    beforeAfterImage: testimonialImage,
    testimonial: "The holistic approach changed everything for me. Not just my appearance, but my entire mindset and energy. The avatar transformation prediction was spot on - I achieved exactly what it showed me!",
    transformationTime: '75 days',
    results: ['Skin radiance improved 80%', 'Hair fall reduced 90%', 'Mental clarity enhanced', 'Confidence boosted'],
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <div className="w-full py-16 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 text-sm">
            ✨ Real Transformations
          </Badge>
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">
            Reverse Aging Programme Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See the incredible transformations our members have achieved through 
            personalized wellness programs
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden hover-elevate">
              {/* Before/After Image */}
              <div className="relative">
                <img 
                  src={testimonial.beforeAfterImage}
                  alt={`${testimonial.name} transformation`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-accent text-primary">
                    {testimonial.transformationTime}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Testimonial */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-accent/30 absolute -top-2 -left-2" />
                  <p className="text-sm text-muted-foreground italic pl-4">
                    "{testimonial.testimonial}"
                  </p>
                </div>

                {/* Results */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-primary">Key Results:</h4>
                  <ul className="space-y-1">
                    {testimonial.results.map((result, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Author */}
                <div className="pt-4 border-t">
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Age {testimonial.age} • {testimonial.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">45</div>
            <div className="text-sm text-muted-foreground">Avg. Days to Results</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2,847</div>
            <div className="text-sm text-muted-foreground">Lives Transformed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.9</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}