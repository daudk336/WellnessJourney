import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface QuestionOption {
  value: string;
  label: string;
  conditional?: {
    question: string;
    type: 'radio' | 'checkbox' | 'text' | 'textarea';
    options?: QuestionOption[];
  };
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'radio' | 'checkbox' | 'text' | 'textarea' | 'number';
  options?: QuestionOption[];
  required?: boolean;
  placeholder?: string;
}

interface QuizQuestionProps {
  question: Question;
  value: any;
  conditionalValue?: any;
  onValueChange: (value: any) => void;
  onConditionalValueChange?: (value: any) => void;
}

export default function QuizQuestion({ 
  question, 
  value, 
  conditionalValue,
  onValueChange, 
  onConditionalValueChange 
}: QuizQuestionProps) {
  const selectedOption = question.options?.find(opt => opt.value === value);
  const showConditional = selectedOption?.conditional && value === selectedOption.value;

  const renderInput = () => {
    switch (question.type) {
      case 'radio':
        return (
          <RadioGroup 
            value={value} 
            onValueChange={onValueChange}
            className="space-y-3"
            data-testid={`radio-group-${question.id}`}
          >
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem 
                  value={option.value} 
                  id={`${question.id}-${option.value}`}
                  data-testid={`radio-${question.id}-${option.value}`}
                />
                <Label 
                  htmlFor={`${question.id}-${option.value}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <Checkbox
                  id={`${question.id}-${option.value}`}
                  checked={Array.isArray(value) ? value.includes(option.value) : false}
                  onCheckedChange={(checked) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    if (checked) {
                      onValueChange([...currentValues, option.value]);
                    } else {
                      onValueChange(currentValues.filter(v => v !== option.value));
                    }
                  }}
                  data-testid={`checkbox-${question.id}-${option.value}`}
                />
                <Label 
                  htmlFor={`${question.id}-${option.value}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );
      
      case 'text':
        return (
          <Input
            value={value || ''}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder={question.placeholder}
            data-testid={`input-${question.id}`}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            data-testid={`textarea-${question.id}`}
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onValueChange(parseInt(e.target.value) || 0)}
            placeholder={question.placeholder}
            data-testid={`input-number-${question.id}`}
          />
        );
      
      default:
        return null;
    }
  };

  const renderConditionalQuestion = () => {
    if (!showConditional || !selectedOption?.conditional) return null;

    const conditional = selectedOption.conditional;

    return (
      <Card className="mt-4 bg-accent/5 border-accent/20">
        <CardContent className="p-4">
          <Label className="text-sm font-medium text-primary mb-3 block">
            {conditional.question}
          </Label>
          
          {conditional.type === 'radio' && conditional.options && (
            <RadioGroup 
              value={conditionalValue} 
              onValueChange={onConditionalValueChange}
              className="space-y-2"
            >
              {conditional.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem 
                    value={option.value} 
                    id={`${question.id}-conditional-${option.value}`}
                  />
                  <Label 
                    htmlFor={`${question.id}-conditional-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
          
          {conditional.type === 'text' && (
            <Input
              value={conditionalValue || ''}
              onChange={(e) => onConditionalValueChange?.(e.target.value)}
              placeholder="Please specify..."
            />
          )}
          
          {conditional.type === 'textarea' && (
            <Textarea
              value={conditionalValue || ''}
              onChange={(e) => onConditionalValueChange?.(e.target.value)}
              placeholder="Please describe..."
              rows={3}
            />
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Card className="w-full hover-elevate">
      <CardHeader>
        <CardTitle className="text-lg text-primary">
          {question.title}
          {question.required && <span className="text-destructive ml-1">*</span>}
        </CardTitle>
        {question.description && (
          <p className="text-sm text-muted-foreground">{question.description}</p>
        )}
      </CardHeader>
      <CardContent>
        {renderInput()}
        {renderConditionalQuestion()}
      </CardContent>
    </Card>
  );
}