"use client";

import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, Circle } from "lucide-react";

export interface AiTaskItem {
  id: string;
  label: string;
}

interface AiTaskListProps {
  tasks: AiTaskItem[];
  completedCount: number;
}

export default function AiTaskList({ tasks, completedCount }: AiTaskListProps) {
  return (
    <div className="bg-white rounded-3xl p-4 border-2 border-[#141413] shadow-[4px_4px_0px_#141413] space-y-2.5">
      <div className="flex items-center justify-between pb-1 border-b border-[#141413]/10">
        <span className="text-xs font-black text-[#141413]">تحلیل هوشمند قیمت...</span>
        <span className="text-[11px] font-bold text-[#EA580C] tabular-nums">
          {Math.min(completedCount, tasks.length)} از {tasks.length}
        </span>
      </div>

      <div className="space-y-2">
        {tasks.map((task, idx) => {
          const isDone = idx < completedCount;
          const isActive = idx === completedCount;

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0.4, x: 6 }}
              animate={{
                opacity: isDone || isActive ? 1 : 0.45,
                x: 0,
              }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
                isDone
                  ? "bg-emerald-50 text-emerald-900 font-bold"
                  : isActive
                    ? "bg-[#FAF6EE] text-[#141413] font-bold"
                    : "text-[#141413]/50"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isActive ? (
                <Loader2 className="w-4 h-4 text-[#FF7A18] animate-spin shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-[#141413]/25 shrink-0" />
              )}
              <span>{task.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
