 'use client';

import { Typography, Table, Tag, Card } from 'antd';
import type { StageDetail } from '@/types';

type Props = {
  stages: Array<{ stage: string } & StageDetail>;
};

export default function StageTable({ stages }: Props) {
  const { Text } = Typography;

  const stageColumns = [
    { title: 'Stage', dataIndex: 'stage', key: 'stage', render: (v: string) => <Text strong className="capitalize">{v.replace(/_/g, ' ')}</Text>, sorter: (a: any, b: any) => String(a.stage).localeCompare(String(b.stage)) },
    { title: 'Total Turns', dataIndex: 'total_turns', key: 'total_turns', render: (v: number) => <Tag color="processing">{v}</Tag>, sorter: (a: any, b: any) => (a.total_turns ?? 0) - (b.total_turns ?? 0) },
    { title: 'Users', dataIndex: 'users_count', key: 'users_count', render: (v: number) => <Tag color={v > 0 ? 'success' : 'default'}>{v}</Tag>, sorter: (a: any, b: any) => (a.users_count ?? 0) - (b.users_count ?? 0) },
    { title: 'Avg Turns / User', dataIndex: 'avg_turns_per_user', key: 'avg_turns_per_user', render: (v: number) => <Text>{v}</Text>, sorter: (a: any, b: any) => (a.avg_turns_per_user ?? 0) - (b.avg_turns_per_user ?? 0) },
    { title: 'User Participation %', dataIndex: 'user_participation_rate', key: 'user_participation_rate', render: (v: number) => (
      <div className="flex items-center gap-2">
        <div className="w-28 h-2 bg-gray-200 rounded overflow-hidden">
          <div style={{ width: `${v}%` }} className="h-2 bg-linear-to-r from-green-400 to-green-600" />
        </div>
        <Text type="secondary">{v}%</Text>
      </div>
    ), sorter: (a: any, b: any) => (a.user_participation_rate ?? 0) - (b.user_participation_rate ?? 0) },
    { title: 'Stage Coverage', dataIndex: 'stage_turn_percentage', key: 'stage_turn_percentage', render: (v: number) => <Text>{v}%</Text>, sorter: (a: any, b: any) => (a.stage_turn_percentage ?? 0) - (b.stage_turn_percentage ?? 0) },
  ];

  return (
    <Card className="shadow-sm" title={<span className="text-lg font-semibold">Stage Analytics</span>}>
      <Table
        dataSource={stages}
        columns={stageColumns}
        rowKey="stage"
        pagination={false}
        bordered
        size="middle"
        rowClassName={(record, index) => index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
      />
    </Card>
  );
}
