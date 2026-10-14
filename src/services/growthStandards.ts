// WHO Child Growth Standards (0 - 24 months) reference medians and percentiles

export interface GrowthStandardPoint {
  month: number;
  weightP15: number;
  weightMedian: number;
  weightP85: number;
  heightP15: number;
  heightMedian: number;
  heightP85: number;
}

// Boys WHO standards (0 to 24 months)
export const WHO_BOYS_STANDARDS: GrowthStandardPoint[] = [
  { month: 0, weightP15: 2.9, weightMedian: 3.3, weightP85: 3.9, heightP15: 47.9, heightMedian: 49.9, heightP85: 51.8 },
  { month: 1, weightP15: 3.9, weightMedian: 4.5, weightP85: 5.1, heightP15: 52.8, heightMedian: 54.7, heightP85: 56.7 },
  { month: 2, weightP15: 4.9, weightMedian: 5.6, weightP85: 6.3, heightP15: 56.4, heightMedian: 58.4, heightP85: 60.4 },
  { month: 3, weightP15: 5.7, weightMedian: 6.4, weightP85: 7.2, heightP15: 59.4, heightMedian: 61.4, heightP85: 63.5 },
  { month: 4, weightP15: 6.2, weightMedian: 7.0, weightP85: 7.8, heightP15: 61.8, heightMedian: 63.9, heightP85: 66.0 },
  { month: 5, weightP15: 6.7, weightMedian: 7.5, weightP85: 8.4, heightP15: 63.8, heightMedian: 65.9, heightP85: 68.0 },
  { month: 6, weightP15: 7.1, weightMedian: 7.9, weightP85: 8.8, heightP15: 65.5, heightMedian: 67.6, heightP85: 69.8 },
  { month: 7, weightP15: 7.4, weightMedian: 8.3, weightP85: 9.2, heightP15: 67.0, heightMedian: 69.2, heightP85: 71.3 },
  { month: 8, weightP15: 7.7, weightMedian: 8.6, weightP85: 9.6, heightP15: 68.4, heightMedian: 70.6, heightP85: 72.8 },
  { month: 9, weightP15: 8.0, weightMedian: 8.9, weightP85: 9.9, heightP15: 69.7, heightMedian: 72.0, heightP85: 74.2 },
  { month: 10, weightP15: 8.2, weightMedian: 9.2, weightP85: 10.2, heightP15: 71.0, heightMedian: 73.3, heightP85: 75.6 },
  { month: 11, weightP15: 8.4, weightMedian: 9.4, weightP85: 10.5, heightP15: 72.2, heightMedian: 74.5, heightP85: 76.9 },
  { month: 12, weightP15: 8.6, weightMedian: 9.6, weightP85: 10.8, heightP15: 73.4, heightMedian: 75.7, heightP85: 78.1 },
  { month: 15, weightP15: 9.1, weightMedian: 10.3, weightP85: 11.5, heightP15: 76.6, heightMedian: 79.1, heightP85: 81.7 },
  { month: 18, weightP15: 9.6, weightMedian: 10.9, weightP85: 12.2, heightP15: 79.6, heightMedian: 82.3, heightP85: 85.0 },
  { month: 24, weightP15: 10.6, weightMedian: 12.2, weightP85: 13.6, heightP15: 84.8, heightMedian: 87.8, heightP85: 90.9 }
];

// Girls WHO standards (0 to 24 months)
export const WHO_GIRLS_STANDARDS: GrowthStandardPoint[] = [
  { month: 0, weightP15: 2.8, weightMedian: 3.2, weightP85: 3.7, heightP15: 47.3, heightMedian: 49.1, heightP85: 51.0 },
  { month: 1, weightP15: 3.6, weightMedian: 4.2, weightP85: 4.8, heightP15: 51.7, heightMedian: 53.7, heightP85: 55.6 },
  { month: 2, weightP15: 4.5, weightMedian: 5.1, weightP85: 5.8, heightP15: 55.0, heightMedian: 57.1, heightP85: 59.1 },
  { month: 3, weightP15: 5.2, weightMedian: 5.8, weightP85: 6.6, heightP15: 57.7, heightMedian: 59.8, heightP85: 61.9 },
  { month: 4, weightP15: 5.7, weightMedian: 6.4, weightP85: 7.3, heightP15: 60.0, heightMedian: 62.1, heightP85: 64.3 },
  { month: 5, weightP15: 6.1, weightMedian: 6.9, weightP85: 7.8, heightP15: 61.8, heightMedian: 64.0, heightP85: 66.2 },
  { month: 6, weightP15: 6.5, weightMedian: 7.3, weightP85: 8.2, heightP15: 63.5, heightMedian: 65.7, heightP85: 68.0 },
  { month: 7, weightP15: 6.8, weightMedian: 7.6, weightP85: 8.6, heightP15: 65.0, heightMedian: 67.3, heightP85: 69.6 },
  { month: 8, weightP15: 7.0, weightMedian: 7.9, weightP85: 9.0, heightP15: 66.4, heightMedian: 68.7, heightP85: 71.1 },
  { month: 9, weightP15: 7.3, weightMedian: 8.2, weightP85: 9.3, heightP15: 67.7, heightMedian: 70.1, heightP85: 72.6 },
  { month: 10, weightP15: 7.5, weightMedian: 8.5, weightP85: 9.6, heightP15: 69.0, heightMedian: 71.5, heightP85: 73.9 },
  { month: 11, weightP15: 7.7, weightMedian: 8.7, weightP85: 9.9, heightP15: 70.3, heightMedian: 72.8, heightP85: 75.3 },
  { month: 12, weightP15: 7.9, weightMedian: 8.9, weightP85: 10.1, heightP15: 71.4, heightMedian: 74.0, heightP85: 76.6 },
  { month: 15, weightP15: 8.5, weightMedian: 9.6, weightP85: 10.9, heightP15: 74.8, heightMedian: 77.5, heightP85: 80.2 },
  { month: 18, weightP15: 9.0, weightMedian: 10.2, weightP85: 11.6, heightP15: 77.9, heightMedian: 80.7, heightP85: 83.5 },
  { month: 24, weightP15: 10.1, weightMedian: 11.5, weightP85: 13.0, heightP15: 83.2, heightMedian: 86.4, heightP85: 89.6 }
];

export interface GrowthEvaluation {
  status: 'meyorda' | 'past' | 'yuqori';
  labelUz: string;
  percentileApprox: string;
  diffFromMedianKg: number;
}

export function evaluateWeightForAge(
  ageMonths: number,
  weightKg: number,
  gender: 'ogil' | 'qiz'
): GrowthEvaluation {
  const standards = gender === 'ogil' ? WHO_BOYS_STANDARDS : WHO_GIRLS_STANDARDS;
  // find closest month standard
  const closest = standards.reduce((prev, curr) => 
    Math.abs(curr.month - ageMonths) < Math.abs(prev.month - ageMonths) ? curr : prev
  );

  const diff = Math.round((weightKg - closest.weightMedian) * 10) / 10;

  if (weightKg < closest.weightP15) {
    return {
      status: 'past',
      labelUz: "O'rtacha me'yordan pastroq (P15 ostida)",
      percentileApprox: '< 15%',
      diffFromMedianKg: diff
    };
  } else if (weightKg > closest.weightP85) {
    return {
      status: 'yuqori',
      labelUz: "O'rtacha me'yordan balandroq (P85 ustida)",
      percentileApprox: '> 85%',
      diffFromMedianKg: diff
    };
  } else {
    return {
      status: 'meyorda',
      labelUz: "JSST tavsiyasiga ko'ra me'yorda (P15 - P85 oralig'ida)",
      percentileApprox: '50% (Me\'yor)',
      diffFromMedianKg: diff
    };
  }
}
