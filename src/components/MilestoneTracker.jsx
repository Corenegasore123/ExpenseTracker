import React from "react";
import { Award, Target } from "lucide-react";

const MilestoneTracker = ({ totalExpenses, milestones }) => {
  const getMilestoneStatus = () => {
    let currentMilestone = null;
    let nextMilestone = null;

    for (let i = 0; i < milestones.length; i++) {
      if (totalExpenses < milestones[i].amount) {
        currentMilestone = milestones[i - 1] || null;
        nextMilestone = milestones[i];
        break;
      }
    }

    return { currentMilestone, nextMilestone };
  };

  const { currentMilestone, nextMilestone } = getMilestoneStatus();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Target size={16} /> Expense Milestones
        </h3>
        {currentMilestone && <Award className="text-yellow-500" size={20} />}
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        {currentMilestone && (
          <div className="mb-2">
            <p className="text-sm text-gray-600">Current Milestone:</p>
            <p className="text-lg font-semibold text-green-600">
              {currentMilestone.name}
            </p>
          </div>
        )}
        {nextMilestone && (
          <div>
            <p className="text-sm text-gray-600">Next Milestone:</p>
            <p className="text-lg font-semibold text-blue-600">
              {nextMilestone.name}
            </p>
            <p className="text-xs text-gray-500">
              ${(nextMilestone.amount - totalExpenses).toFixed(2)} to go
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MilestoneTracker;
