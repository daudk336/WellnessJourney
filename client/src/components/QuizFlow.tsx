import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import QuizProgress from './QuizProgress';
import QuizQuestion, { Question } from './QuizQuestion';
import ImageUpload from './ImageUpload';

//todo: remove mock functionality - replace with real quiz data
const quizSections = [
  {
    id: 'hair',
    title: 'Hair',
    description: 'Hair health assessment',
    questions: [
      {
        id: 'hair_primary',
        title: 'What is your primary hair concern?',
        type: 'radio' as const,
        required: true,
        options: [
          { value: 'hair_fall', label: 'Hair fall/thinning' },
          { value: 'scalp_issues', label: 'Scalp problems' },
          { value: 'greying', label: 'Premature greying' },
          { value: 'texture', label: 'Hair texture/elasticity' },
          { value: 'no_concerns', label: 'No major concerns' }
        ]
      },
      {
        id: 'hair_fall',
        title: 'Are you experiencing hair fall or thinning?',
        type: 'radio' as const,
        options: [
          { 
            value: 'yes', 
            label: 'Yes, significant hair fall',
            conditional: {
              question: 'How long have you been experiencing this?',
              type: 'radio' as const,
              options: [
                { value: 'less_6_months', label: 'Less than 6 months' },
                { value: '6_months_1_year', label: '6 months to 1 year' },
                { value: '1_2_years', label: '1-2 years' },
                { value: 'more_2_years', label: 'More than 2 years' }
              ]
            }
          },
          { value: 'mild', label: 'Mild hair fall' },
          { value: 'no', label: 'No hair fall issues' }
        ]
      },
      {
        id: 'scalp_issues',
        title: 'Do you have any scalp issues?',
        type: 'radio' as const,
        options: [
          { 
            value: 'dandruff', 
            label: 'Dandruff/flaky scalp',
            conditional: {
              question: 'How often do you experience this?',
              type: 'radio' as const,
              options: [
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'seasonal', label: 'Seasonally' }
              ]
            }
          },
          { value: 'itchy', label: 'Itchy scalp' },
          { value: 'oily', label: 'Excessively oily scalp' },
          { value: 'dry', label: 'Very dry scalp' },
          { value: 'no_issues', label: 'No scalp issues' }
        ]
      }
    ]
  },
  {
    id: 'skin',
    title: 'Skin',
    description: 'Skin health evaluation',
    questions: [
      {
        id: 'skin_concern',
        title: 'What is your primary skin concern?',
        type: 'radio' as const,
        required: true,
        options: [
          { value: 'acne', label: 'Acne/breakouts' },
          { value: 'wrinkles', label: 'Wrinkles/aging' },
          { value: 'pigmentation', label: 'Dark spots/pigmentation' },
          { value: 'dryness', label: 'Dry/flaky skin' },
          { value: 'sensitivity', label: 'Sensitive/reactive skin' }
        ]
      },
      {
        id: 'skin_type',
        title: 'How would you characterize your skin type?',
        type: 'radio' as const,
        options: [
          { value: 'oily', label: 'Oily' },
          { value: 'dry', label: 'Dry' },
          { value: 'combination', label: 'Combination' },
          { value: 'normal', label: 'Normal' },
          { value: 'sensitive', label: 'Sensitive' }
        ]
      },
      {
        id: 'skin_conditions',
        title: 'Do you have any specific skin conditions?',
        type: 'checkbox' as const,
        options: [
          { value: 'eczema', label: 'Eczema' },
          { value: 'psoriasis', label: 'Psoriasis' },
          { value: 'rosacea', label: 'Rosacea' },
          { value: 'melasma', label: 'Melasma' },
          { value: 'none', label: 'None of the above' }
        ]
      }
    ]
  },
  {
    id: 'body',
    title: 'Body',
    description: 'Physical wellness assessment',
    questions: [
      {
        id: 'physical_discomfort',
        title: 'Do you experience any physical discomfort?',
        type: 'radio' as const,
        options: [
          { 
            value: 'yes', 
            label: 'Yes, regular discomfort',
            conditional: {
              question: 'Where do you primarily feel discomfort?',
              type: 'checkbox' as const,
              options: [
                { value: 'back', label: 'Back' },
                { value: 'joints', label: 'Joints' },
                { value: 'muscles', label: 'Muscles' },
                { value: 'neck_shoulders', label: 'Neck/Shoulders' },
                { value: 'digestive', label: 'Digestive issues' }
              ]
            }
          },
          { value: 'occasional', label: 'Occasional discomfort' },
          { value: 'no', label: 'No regular discomfort' }
        ]
      },
      {
        id: 'energy_levels',
        title: 'How would you describe your energy levels?',
        type: 'radio' as const,
        options: [
          { value: 'very_low', label: 'Very low - constantly tired' },
          { value: 'low', label: 'Below average' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'high', label: 'High energy' },
          { value: 'very_high', label: 'Excellent energy levels' }
        ]
      },
      {
        id: 'physical_goals',
        title: 'What are your main physical goals?',
        type: 'checkbox' as const,
        options: [
          { value: 'weight_loss', label: 'Weight loss' },
          { value: 'muscle_gain', label: 'Build muscle' },
          { value: 'flexibility', label: 'Improve flexibility' },
          { value: 'endurance', label: 'Increase endurance' },
          { value: 'strength', label: 'Build strength' },
          { value: 'balance', label: 'Better balance' }
        ]
      }
    ]
  },
  {
    id: 'mind',
    title: 'Mind',
    description: 'Mental wellness evaluation',
    questions: [
      {
        id: 'stress_frequency',
        title: 'How often do you experience stress or anxiety?',
        type: 'radio' as const,
        options: [
          { 
            value: 'daily', 
            label: 'Daily',
            conditional: {
              question: 'What are your main stress triggers?',
              type: 'checkbox' as const,
              options: [
                { value: 'work', label: 'Work pressure' },
                { value: 'relationships', label: 'Relationships' },
                { value: 'finances', label: 'Financial concerns' },
                { value: 'health', label: 'Health worries' },
                { value: 'family', label: 'Family responsibilities' }
              ]
            }
          },
          { value: 'weekly', label: 'Several times per week' },
          { value: 'monthly', label: 'Few times per month' },
          { value: 'rarely', label: 'Rarely' }
        ]
      },
      {
        id: 'sleep_quality',
        title: 'How would you rate your sleep quality?',
        type: 'radio' as const,
        options: [
          { 
            value: 'poor', 
            label: 'Poor - frequent sleep issues',
            conditional: {
              question: 'What specific sleep challenges do you face?',
              type: 'checkbox' as const,
              options: [
                { value: 'falling_asleep', label: 'Difficulty falling asleep' },
                { value: 'staying_asleep', label: 'Waking up frequently' },
                { value: 'early_waking', label: 'Waking up too early' },
                { value: 'restless', label: 'Restless/unrefreshing sleep' }
              ]
            }
          },
          { value: 'fair', label: 'Fair - some issues' },
          { value: 'good', label: 'Good quality sleep' },
          { value: 'excellent', label: 'Excellent sleep' }
        ]
      },
      {
        id: 'mental_clarity',
        title: 'How is your focus and mental clarity?',
        type: 'radio' as const,
        options: [
          { value: 'poor', label: 'Poor - frequent brain fog' },
          { value: 'below_average', label: 'Below average' },
          { value: 'average', label: 'Average' },
          { value: 'good', label: 'Good focus' },
          { value: 'excellent', label: 'Excellent clarity' }
        ]
      }
    ]
  },
  {
    id: 'personal',
    title: 'Personal',
    description: 'Contact information',
    questions: [
      {
        id: 'name',
        title: 'Full Name',
        type: 'text' as const,
        required: true,
        placeholder: 'Enter your full name'
      },
      {
        id: 'age',
        title: 'Age',
        type: 'number' as const,
        required: true,
        placeholder: 'Enter your age'
      },
      {
        id: 'email',
        title: 'Email Address',
        type: 'text' as const,
        required: true,
        placeholder: 'Enter your email address'
      },
      {
        id: 'phone',
        title: 'Phone Number',
        type: 'text' as const,
        required: true,
        placeholder: 'Enter your phone number'
      },
      {
        id: 'location',
        title: 'Location (City, State)',
        type: 'text' as const,
        required: true,
        placeholder: 'Enter your location'
      }
    ]
  }
];

interface QuizFlowProps {
  onQuizComplete: (responses: any) => void;
  onBack: () => void;
}

export default function QuizFlow({ onQuizComplete, onBack }: QuizFlowProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [conditionalResponses, setConditionalResponses] = useState<Record<string, any>>({});
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});

  const currentSection = quizSections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];
  const totalQuestions = quizSections.reduce((total, section) => total + section.questions.length, 0) + 3; // +3 for image uploads
  const currentQuestionNumber = quizSections
    .slice(0, currentSectionIndex)
    .reduce((total, section) => total + section.questions.length, 0) + currentQuestionIndex + 1;

  const stepTitles = quizSections.map(section => section.title);

  const isImageUploadStep = () => {
    return currentQuestionIndex >= currentSection.questions.length;
  };

  const getImageUploadType = () => {
    const imageIndex = currentQuestionIndex - currentSection.questions.length;
    const imageTypes = ['scalp', 'face', 'body'];
    return imageTypes[imageIndex];
  };

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleConditionalResponse = (questionId: string, value: any) => {
    setConditionalResponses(prev => ({ ...prev, [`${questionId}_conditional`]: value }));
  };

  const handleImageUpload = (type: string, file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImages(prev => ({ ...prev, [type]: imageUrl }));
  };

  const canProceed = () => {
    if (isImageUploadStep()) {
      const imageType = getImageUploadType();
      return uploadedImages[imageType];
    }
    
    if (currentQuestion.required) {
      return responses[currentQuestion.id] !== undefined && responses[currentQuestion.id] !== '';
    }
    return true;
  };

  const handleNext = () => {
    const isLastQuestionInSection = currentQuestionIndex >= currentSection.questions.length + 2; // +3 for images, -1 for index
    
    if (isLastQuestionInSection) {
      if (currentSectionIndex < quizSections.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1);
        setCurrentQuestionIndex(0);
      } else {
        // Quiz complete
        const allResponses = {
          ...responses,
          ...conditionalResponses,
          uploadedImages
        };
        onQuizComplete(allResponses);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(quizSections[currentSectionIndex - 1].questions.length + 2);
    } else {
      onBack();
    }
  };

  const renderImageUpload = () => {
    const imageType = getImageUploadType();
    const imageConfig = {
      scalp: {
        title: 'Upload Scalp Photo',
        description: 'Please upload a clear photo of your scalp/hair',
        alignmentGuide: 'Position your head straight, hair parted to show scalp clearly'
      },
      face: {
        title: 'Upload Face Photo',
        description: 'Please upload a clear front-facing photo',
        alignmentGuide: 'Face the camera directly, ensure good lighting on your face'
      },
      body: {
        title: 'Upload Body Photo',
        description: 'Please upload a full-body photo',
        alignmentGuide: 'Stand straight, arms at sides, full body visible in frame'
      }
    }[imageType];

    return (
      <div className="max-w-2xl mx-auto">
        <ImageUpload
          title={imageConfig?.title || ''}
          description={imageConfig?.description || ''}
          alignmentGuide={imageConfig?.alignmentGuide}
          uploadedImage={uploadedImages[imageType]}
          onImageUpload={(file) => handleImageUpload(imageType, file)}
          onImageRemove={() => {
            setUploadedImages(prev => {
              const updated = { ...prev };
              delete updated[imageType];
              return updated;
            });
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5 py-8">
      <div className="container mx-auto px-4">
        {/* Progress */}
        <QuizProgress 
          currentStep={currentSectionIndex + 1}
          totalSteps={quizSections.length}
          stepTitles={stepTitles}
        />

        {/* Question Progress */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestionNumber} of {totalQuestions}</span>
            <span>{Math.round((currentQuestionNumber / totalQuestions) * 100)}%</span>
          </div>
          <Progress value={(currentQuestionNumber / totalQuestions) * 100} className="h-2" />
        </div>

        {/* Section Header */}
        <Card className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-serif font-bold text-primary mb-2">
              {currentSection.title} Assessment
            </h2>
            <p className="text-muted-foreground">{currentSection.description}</p>
          </CardContent>
        </Card>

        {/* Question or Image Upload */}
        <div className="max-w-4xl mx-auto mb-8">
          {isImageUploadStep() ? (
            renderImageUpload()
          ) : (
            <QuizQuestion
              question={currentQuestion}
              value={responses[currentQuestion.id]}
              conditionalValue={conditionalResponses[`${currentQuestion.id}_conditional`]}
              onValueChange={(value) => handleResponse(currentQuestion.id, value)}
              onConditionalValueChange={(value) => handleConditionalResponse(currentQuestion.id, value)}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack}
            data-testid="button-quiz-back"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
            data-testid="button-quiz-next"
          >
            {currentSectionIndex === quizSections.length - 1 && 
             currentQuestionIndex >= currentSection.questions.length + 2 ? 'Complete Assessment' : 'Continue'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}