import React from 'react';
import {CircleProgress} from './CircleProgress';

interface GoalCardProps {
  goalName: string;
  percentage: number;
  color?: 'blue' | 'green' | 'pink';
  current?: number;
  target?: number;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goalName,
  percentage,
  color = 'blue',
  current,
  target
}) => {
  return (
    <div className="flex-1 bg-bg-bg-subtle border border-fg-border rounded-xl p-3 flex flex-col gap-3 items-center justify-center min-w-0">
      <CircleProgress percentage={percentage} color={color} size={72} />
      <p className="text-xs-medium text-fg-default-fg text-center w-full">
        {goalName}
      </p>
    </div>
  );
};

