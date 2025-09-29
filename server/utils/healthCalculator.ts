import type { InsertQuizResponse } from "@shared/schema";

/**
 * Calculate health scores based on quiz responses
 * Returns scores from 0-100 for each health category
 */
export function calculateHealthScores(responses: Partial<InsertQuizResponse>) {
  const hairScore = calculateHairHealthScore(responses);
  const skinScore = calculateSkinHealthScore(responses);  
  const bodyScore = calculateBodyHealthScore(responses);
  const mindScore = calculateMindHealthScore(responses);
  const { dryPercentage, oilPercentage } = calculateHydrationMetrics(responses);

  return {
    hairHealthScore: Math.round(hairScore),
    skinHealthScore: Math.round(skinScore),
    bodyHealthScore: Math.round(bodyScore),
    mindHealthScore: Math.round(mindScore),
    dryPercentage: Math.round(dryPercentage),
    oilPercentage: Math.round(oilPercentage)
  };
}

function calculateHairHealthScore(responses: Partial<InsertQuizResponse>): number {
  let score = 100; // Start with perfect score

  // Hair fall assessment
  if (responses.hairFall === 'yes') {
    score -= 30;
    // Additional penalty based on duration
    switch (responses.hairFallDuration) {
      case 'less_6_months':
        score -= 5;
        break;
      case '6_months_1_year':
        score -= 15;
        break;
      case '1_2_years':
        score -= 25;
        break;
      case 'more_2_years':
        score -= 40;
        break;
    }
  } else if (responses.hairFall === 'mild') {
    score -= 15;
  }

  // Scalp issues assessment
  if (responses.scalpIssues !== 'no_issues') {
    score -= 20;
    // Frequency modifier
    switch (responses.scalpIssueFrequency) {
      case 'daily':
        score -= 15;
        break;
      case 'weekly':
        score -= 10;
        break;
      case 'monthly':
        score -= 5;
        break;
    }
  }

  // Greying concerns
  if (responses.greyingConcerns && responses.greyingConcerns !== 'no_concerns') {
    score -= 10;
  }

  return Math.max(0, Math.min(100, score));
}

function calculateSkinHealthScore(responses: Partial<InsertQuizResponse>): number {
  let score = 100;

  // Primary skin concerns
  switch (responses.skinConcern) {
    case 'acne':
      score -= 25;
      break;
    case 'wrinkles':
      score -= 20;
      break;
    case 'pigmentation':
      score -= 15;
      break;
    case 'dryness':
      score -= 20;
      break;
    case 'sensitivity':
      score -= 15;
      break;
  }

  // Skin type considerations
  switch (responses.skinType) {
    case 'sensitive':
      score -= 10;
      break;
    case 'dry':
      score -= 5;
      break;
    case 'oily':
      score -= 5;
      break;
  }

  // Skin conditions - handle both array and single values
  let skinConditions: string[] = [];
  if (responses.skinConditions) {
    if (Array.isArray(responses.skinConditions)) {
      skinConditions = responses.skinConditions;
    } else if (typeof responses.skinConditions === 'string') {
      try {
        skinConditions = JSON.parse(responses.skinConditions);
      } catch {
        skinConditions = [responses.skinConditions];
      }
    }
    
    if (skinConditions.length > 0 && !skinConditions.includes('none')) {
      score -= skinConditions.length * 10; // -10 per condition
    }
  }

  // Dermatologist consultation (positive indicator)
  if (responses.dermatologistConsult === 'yes') {
    score += 5; // Bonus for professional care
  }

  return Math.max(0, Math.min(100, score));
}

function calculateBodyHealthScore(responses: Partial<InsertQuizResponse>): number {
  let score = 100;

  // Physical discomfort assessment
  if (responses.physicalDiscomfort === 'yes') {
    score -= 30;
    // Location-specific penalties - handle text/JSON data
    if (responses.discomfortLocation) {
      let locations: string[] = [];
      if (Array.isArray(responses.discomfortLocation)) {
        locations = responses.discomfortLocation;
      } else if (typeof responses.discomfortLocation === 'string') {
        try {
          locations = JSON.parse(responses.discomfortLocation);
        } catch {
          locations = [responses.discomfortLocation];
        }
      }
      score -= locations.length * 5; // -5 per affected area
    }
  } else if (responses.physicalDiscomfort === 'occasional') {
    score -= 15;
  }

  // Energy levels assessment
  switch (responses.energyLevels) {
    case 'very_low':
      score -= 40;
      break;
    case 'low':
      score -= 25;
      break;
    case 'moderate':
      score -= 10;
      break;
    case 'high':
      score += 5;
      break;
    case 'very_high':
      score += 10;
      break;
  }

  // Physical goals (positive indicator of proactive health)
  if (responses.physicalGoals) {
    let goals: string[] = [];
    if (Array.isArray(responses.physicalGoals)) {
      goals = responses.physicalGoals;
    } else if (typeof responses.physicalGoals === 'string') {
      try {
        goals = JSON.parse(responses.physicalGoals);
      } catch {
        goals = [responses.physicalGoals];
      }
    }
    score += Math.min(goals.length * 3, 15); // Bonus for having goals, max +15
  }

  return Math.max(0, Math.min(100, score));
}

function calculateMindHealthScore(responses: Partial<InsertQuizResponse>): number {
  let score = 100;

  // Stress frequency assessment
  switch (responses.stressFrequency) {
    case 'daily':
      score -= 35;
      break;
    case 'weekly':
      score -= 20;
      break;
    case 'monthly':
      score -= 10;
      break;
    case 'rarely':
      score += 5;
      break;
  }

  // Stress triggers
  if (responses.stressTriggers) {
    let triggers: string[] = [];
    if (Array.isArray(responses.stressTriggers)) {
      triggers = responses.stressTriggers;
    } else if (typeof responses.stressTriggers === 'string') {
      try {
        triggers = JSON.parse(responses.stressTriggers);
      } catch {
        triggers = [responses.stressTriggers];
      }
    }
    score -= triggers.length * 3; // -3 per trigger
  }

  // Sleep quality assessment
  switch (responses.sleepQuality) {
    case 'poor':
      score -= 30;
      break;
    case 'fair':
      score -= 15;
      break;
    case 'good':
      score += 5;
      break;
    case 'excellent':
      score += 10;
      break;
  }

  // Sleep challenges
  if (responses.sleepChallenges) {
    let challenges: string[] = [];
    if (Array.isArray(responses.sleepChallenges)) {
      challenges = responses.sleepChallenges;
    } else if (typeof responses.sleepChallenges === 'string') {
      try {
        challenges = JSON.parse(responses.sleepChallenges);
      } catch {
        challenges = [responses.sleepChallenges];
      }
    }
    score -= challenges.length * 5; // -5 per challenge
  }

  // Mental clarity assessment
  switch (responses.mentalClarity) {
    case 'poor':
      score -= 25;
      break;
    case 'below_average':
      score -= 15;
      break;
    case 'average':
      // no change
      break;
    case 'good':
      score += 5;
      break;
    case 'excellent':
      score += 10;
      break;
  }

  return Math.max(0, Math.min(100, score));
}

function calculateHydrationMetrics(responses: Partial<InsertQuizResponse>): {
  dryPercentage: number;
  oilPercentage: number;
} {
  let dryScore = 0;
  let oilScore = 0;

  // Base calculations from skin type
  switch (responses.skinType) {
    case 'dry':
      dryScore += 40;
      oilScore += 10;
      break;
    case 'oily':
      dryScore += 10;
      oilScore += 40;
      break;
    case 'combination':
      dryScore += 25;
      oilScore += 25;
      break;
    case 'normal':
      dryScore += 15;
      oilScore += 15;
      break;
    case 'sensitive':
      dryScore += 30;
      oilScore += 20;
      break;
    default:
      dryScore += 20;
      oilScore += 20;
  }

  // Adjust based on skin concerns
  if (responses.skinConcern === 'dryness') {
    dryScore += 30;
  } else if (responses.skinConcern === 'acne') {
    oilScore += 25;
  }

  // Adjust based on scalp issues
  if (responses.scalpIssues === 'dry') {
    dryScore += 15;
  } else if (responses.scalpIssues === 'oily') {
    oilScore += 15;
  }

  // Add some variability based on age (if available)
  if (responses.age) {
    const age = responses.age;
    if (age > 40) {
      dryScore += Math.min((age - 40) * 0.5, 15); // Increase dryness with age
    }
    if (age < 25) {
      oilScore += Math.min((25 - age) * 0.3, 10); // More oil in younger people
    }
  }

  // Ensure percentages don't exceed 100 and maintain some balance
  const total = dryScore + oilScore;
  if (total > 100) {
    const factor = 100 / total;
    dryScore *= factor;
    oilScore *= factor;
  }

  // Ensure minimum values
  dryScore = Math.max(5, dryScore);
  oilScore = Math.max(5, oilScore);

  // Final adjustment to ensure they roughly add up to a reasonable total
  const finalTotal = dryScore + oilScore;
  if (finalTotal < 50) {
    const boost = (50 - finalTotal) / 2;
    dryScore += boost;
    oilScore += boost;
  }

  return {
    dryPercentage: Math.min(85, dryScore),
    oilPercentage: Math.min(85, oilScore)
  };
}