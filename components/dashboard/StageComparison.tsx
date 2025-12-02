 'use client';

import StageDetailsChart from './StageDetailsChart';
import { Card } from 'antd';
import type { StageDetail } from '@/types';

type Props = { stages: Array<{ stage: string } & StageDetail> };

export default function StageComparison({ stages }: Props) {
  return (
    <Card className="shadow-sm" title={<span className="text-lg font-semibold">Stage Metrics Comparison</span>}>
      <StageDetailsChart stages={stages} />
    </Card>
  );
}
