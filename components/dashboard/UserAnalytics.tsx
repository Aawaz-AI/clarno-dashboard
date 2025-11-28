// import { Card, Table, Tag, Typography } from 'antd';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
// import type { StageDetail } from '@/types';
// import type { ColumnsType, ColumnGroupType } from 'antd/es/table';


// interface UserAnalyticsProps {
//   stages: Array<{ stage: string } & StageDetail>;
//   userRows: Array<Record<string, any>>;
//   userOverallRows?: Array<Record<string, any>>;
//   chartData: Array<{ name: string; totalTurns: number }>;
//   selectedUser?: string;
//   onSelectUser?: (id: string) => void;
// }

// export default function UserAnalytics({ stages, userRows, userOverallRows = [], chartData, selectedUser, onSelectUser }: UserAnalyticsProps) {
//   const { Text } = Typography;

//   const COLORS = ['#2563eb', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#f43f5e'];

//   // stacked chart metric options
//   const METRIC_OPTIONS = [
//     { key: 'total_turns', label: 'Turns', color: '#2563eb' },
//     { key: 'internal_cost', label: 'Internal Cost', color: '#06b6d4' },
//     { key: 'user_cost', label: 'User Cost', color: '#10b981' },
//     { key: 'total_input_tokens', label: 'Input Tokens', color: '#f59e0b' },
//     { key: 'total_output_tokens', label: 'Output Tokens', color: '#ef4444' },
//   ];

//   const [selectedMetrics, setSelectedMetrics] = React.useState<string[]>(METRIC_OPTIONS.map(m => m.key));

//   const toggleMetric = (key: string) => {
//     setSelectedMetrics(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
//   };

//   const stageColumns = [
//     { title: 'Stage', dataIndex: 'stage', key: 'stage', render: (v: string) => <Text strong className="capitalize">{v.replace(/_/g, ' ')}</Text>, sorter: (a: any, b: any) => String(a.stage).localeCompare(String(b.stage)) },
//     { title: 'Total Turns', dataIndex: 'total_turns', key: 'total_turns', render: (v: number) => <Tag color="processing">{v}</Tag>, sorter: (a: any, b: any) => (a.total_turns ?? 0) - (b.total_turns ?? 0) },
//     { title: 'Users', dataIndex: 'users_count', key: 'users_count', render: (v: number) => <Tag color={v > 0 ? 'success' : 'default'}>{v}</Tag>, sorter: (a: any, b: any) => (a.users_count ?? 0) - (b.users_count ?? 0) },
//     { title: 'Avg Turns / User', dataIndex: 'avg_turns_per_user', key: 'avg_turns_per_user', render: (v: number) => <Text>{v}</Text>, sorter: (a: any, b: any) => (a.avg_turns_per_user ?? 0) - (b.avg_turns_per_user ?? 0) },
//     { title: 'User Participation %', dataIndex: 'user_participation_rate', key: 'user_participation_rate', render: (v: number) => (
//       <div className="flex items-center gap-2">
//         <div className="w-28 h-2 bg-gray-200 rounded overflow-hidden">
//           <div style={{ width: `${v}%` }} className="h-2 bg-linear-to-r from-green-400 to-green-600" />
//         </div>
//         <Text type="secondary">{v}%</Text>
//       </div>
//     ), sorter: (a: any, b: any) => (a.user_participation_rate ?? 0) - (b.user_participation_rate ?? 0) },
//     { title: 'Stage Coverage', dataIndex: 'stage_turn_percentage', key: 'stage_turn_percentage', render: (v: number) => <Text>{v}%</Text>, sorter: (a: any, b: any) => (a.stage_turn_percentage ?? 0) - (b.stage_turn_percentage ?? 0) },
//   ];

//   // Create user table columns dynamically from first row keys (except userId)
//   const userColumns = React.useMemo(() => {
//     if (!userRows || userRows.length === 0) return [{ title: 'User ID', dataIndex: 'userId', key: 'userId' }];
//     const keys = Object.keys(userRows[0]);
//       return keys.map(k => {
//       const raw = k === 'userId' ? 'User ID' : k.replace(/_/g, ' ');
//       const title = raw.charAt(0).toUpperCase() + raw.slice(1);
//       return {
//         title,
//         dataIndex: k,
//         key: k,
//         render: (v: any) => {
//           if (k === 'userId') {
//             const id = String(v);
//             return (
//               <button
//                 type="button"
//                 onClick={(e) => { e.stopPropagation(); if (!onSelectUser) return; if (selectedUser && String(selectedUser) === id) onSelectUser('all'); else onSelectUser(id); }}
//                 aria-label={`Select user ${id}`}
//                 className={`text-sm font-medium text-blue-600 hover:underline cursor-pointer ${selectedUser && String(selectedUser) === id ? 'underline' : ''}`}
//               >
//                 {id}
//               </button>
//             );
//           }

//           // If the cell value is an object (complex metrics), render a readable JSON code block
//           if (v && typeof v === 'object') {
//             return <Text code>{JSON.stringify(v)}</Text>;
//           }

//           // Otherwise render as a Tag with stringified value
//           return <Tag color={Number(v) > 0 ? 'blue' : 'default'}>{String(v ?? '')}</Tag>;
//         },
//         sorter: (a: Record<string, any>, b: Record<string, any>) => {
//           const va = a[k];
//           const vb = b[k];
//           const na = typeof va === 'number' ? va : Number(va);
//           const nb = typeof vb === 'number' ? vb : Number(vb);
//           if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
//           return String(va ?? '').localeCompare(String(vb ?? ''));
//         }
//       };
//     });
//   }, [userRows]);

//   return (
//     <div className="flex flex-col gap-6">
     
//       <Card className="shadow-sm" title={<span className="text-lg font-semibold">Stage Analytics</span>}>
//         <Table
//           dataSource={stages}
//           columns={stageColumns}
//           rowKey="stage"
//           pagination={false}
//           bordered
//           size="middle"
//           rowClassName={(record, index) => index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
//         />
//       </Card>

//       <Card className="shadow-sm" title={<span className="text-lg font-semibold">Stage Totals</span>}>
//         <div className="flex gap-6 items-start">
//           <div style={{ flex: 1, height: 260 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-20} textAnchor="end" interval={0} tickMargin={12} height={60} />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="totalTurns" fill="#1890ff" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//           <div style={{ width: 360, height: 260 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={stages.map(s => ({ name: s.stage.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), value: s.total_turns ?? 0 }))}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="48%"
//                   cy="50%"
//                   innerRadius={0}
//                   outerRadius={90}
//                   labelLine={false}
//                   label={(props: any) => {
//                     const RADIAN = Math.PI / 180;
//                     const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
//                     const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
//                     const xPos = cx + radius * Math.cos(-midAngle * RADIAN);
//                     const yPos = cy + radius * Math.sin(-midAngle * RADIAN);

//                     // pick the slice color by index and compute luminance to decide text color
//                     const hex = COLORS[index % COLORS.length] || '#000000';
//                     const r = parseInt(hex.slice(1, 3), 16);
//                     const g = parseInt(hex.slice(3, 5), 16);
//                     const b = parseInt(hex.slice(5, 7), 16);
//                     const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
//                     const textColor = luminance > 0.55 ? '#111827' : '#ffffff';

//                     return (
//                       <text
//                         x={xPos}
//                         y={yPos}
//                         fill={textColor}
//                         fontSize={12}
//                         textAnchor="middle"
//                         dominantBaseline="central"
//                         stroke={textColor === '#ffffff' ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.35)'}
//                         strokeWidth={0.6}
//                         opacity={0.95}
//                       >
//                         {`${(percent * 100).toFixed(0)}%`}
//                       </text>
//                     );
//                   }}
//                 >
//                   {stages.map((_, i) => (
//                     <Cell key={`slice-${i}`} fill={COLORS[i % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(v: any, name: any) => [`${v}`, `${name}`]} />
//                 <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 12, width: 140 }} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </Card>

//        <Card className="shadow-sm" title={<span className="text-lg font-semibold">Per-user Overview (Stacked)</span>}>
//         <div className="mb-3 flex items-center gap-4">
//           <span className="text-sm text-gray-700">Metrics:</span>
//           {METRIC_OPTIONS.map(opt => (
//             <label key={opt.key} className="flex items-center gap-2 text-sm">
//               <input type="checkbox" checked={selectedMetrics.includes(opt.key)} onChange={() => toggleMetric(opt.key)} />
//               <span style={{ width: 12, height: 12, background: opt.color, display: 'inline-block', borderRadius: 2 }} />
//               <span>{opt.label}</span>
//             </label>
//           ))}
//         </div>

//         <div style={{ width: '100%', height: 300 }}>
//           <ResponsiveContainer width="100%" height="100%">
//             {
//               // If a user is selected, show only that user's row in the stacked chart
//             }
//             <BarChart data={(selectedUser && userOverallRows && userOverallRows.length) ? userOverallRows.filter(u => String(u.userId) === String(selectedUser)) : userOverallRows} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="userId" tick={{ fontSize: 12 }} angle={-20} textAnchor="end" interval={0} height={60} />
//               <YAxis />
//               <Tooltip />
//               {METRIC_OPTIONS.filter(m => selectedMetrics.includes(m.key)).map(m => (
//                 <Bar key={m.key} dataKey={m.key} stackId="a" fill={m.color} />
//               ))}
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </Card>



//       <Card className="shadow-sm" title={<span className="text-lg font-semibold">Per-user Counts</span>}>
//         <Table
//           dataSource={userRows}
//           columns={userColumns}
//           rowKey={(r) => r.userId}
//           pagination={{ pageSize: 10 }}
//           bordered
//           size="small"
//           rowClassName={(record, index) => index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
//         />
//       </Card>
//     </div>
//   );
// }


'use client';

import { useMemo, useState } from 'react';

import { Card, Table, Tag, Typography } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import type { StageDetail } from '@/types';
import type { ColumnsType, ColumnGroupType } from 'antd/es/table';

interface UserAnalyticsProps {
  stages: Array<{ stage: string } & StageDetail>;
  userRows: Array<Record<string, any>>;
  userOverallRows?: Array<Record<string, any>>;
  chartData: Array<{ name: string; totalTurns: number }>;
  selectedUser?: string;
  onSelectUser?: (id: string) => void;
}

export default function UserAnalytics({ stages, userRows, userOverallRows = [], chartData, selectedUser, onSelectUser }: UserAnalyticsProps) {
  const { Text } = Typography;

  const COLORS = ['#2563eb', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#f43f5e'];

  // stacked chart metric options
  const METRIC_OPTIONS = [
    { key: 'total_turns', label: 'Turns', color: '#2563eb' },
    { key: 'internal_cost', label: 'Internal Cost', color: '#06b6d4' },
    { key: 'user_cost', label: 'User Cost', color: '#10b981' },
    { key: 'total_input_tokens', label: 'Input Tokens', color: '#f59e0b' },
    { key: 'total_output_tokens', label: 'Output Tokens', color: '#ef4444' },
  ];

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(METRIC_OPTIONS.map(m => m.key));

  const toggleMetric = (key: string) => {
    setSelectedMetrics(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

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

  // Create grouped columns for user table
  const userTableColumns: ColumnsType<Record<string, any>> = useMemo(() => {
    if (!userRows || userRows.length === 0) return [];

    const columns: ColumnsType<Record<string, any>> = [
      {
        title: 'User ID',
        dataIndex: 'userId',
        key: 'userId',
        fixed: 'left',
        width: 280,
        render: (v: any) => {
          const id = String(v);
          return (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!onSelectUser) return;
                if (selectedUser && String(selectedUser) === id) onSelectUser('all');
                else onSelectUser(id);
              }}
              aria-label={`Select user ${id}`}
              className={`text-sm font-medium text-blue-600 hover:underline cursor-pointer ${
                selectedUser && String(selectedUser) === id ? 'underline font-bold' : ''
              }`}
            >
              {id}
            </button>
          );
        },
      },
    ];

    // Add Overall metrics group
    columns.push({
      title: 'Overall Metrics',
      children: [
        {
          title: 'Turns',
          dataIndex: 'overall_total_turns',
          key: 'overall_total_turns',
          width: 90,
          render: (v: number) => <Tag color="blue">{v ?? 0}</Tag>,
          sorter: (a, b) => (a.overall_total_turns ?? 0) - (b.overall_total_turns ?? 0),
        },
        {
          title: 'Internal Cost',
          dataIndex: 'overall_internal_cost',
          key: 'overall_internal_cost',
          width: 110,
          render: (v: number) => <Text className="text-xs">${(v ?? 0).toFixed(4)}</Text>,
          sorter: (a, b) => (a.overall_internal_cost ?? 0) - (b.overall_internal_cost ?? 0),
        },
        {
          title: 'User Cost',
          dataIndex: 'overall_user_cost',
          key: 'overall_user_cost',
          width: 110,
          render: (v: number) => <Text className="text-xs">${(v ?? 0).toFixed(4)}</Text>,
          sorter: (a, b) => (a.overall_user_cost ?? 0) - (b.overall_user_cost ?? 0),
        },
        {
          title: 'Input Tokens',
          dataIndex: 'overall_total_input_tokens',
          key: 'overall_total_input_tokens',
          width: 110,
          render: (v: number) => <Text className="text-xs">{(v ?? 0).toFixed(0)}</Text>,
          sorter: (a, b) => (a.overall_total_input_tokens ?? 0) - (b.overall_total_input_tokens ?? 0),
        },
        {
          title: 'Output Tokens',
          dataIndex: 'overall_total_output_tokens',
          key: 'overall_total_output_tokens',
          width: 110,
          render: (v: number) => <Text className="text-xs">{(v ?? 0).toFixed(0)}</Text>,
          sorter: (a, b) => (a.overall_total_output_tokens ?? 0) - (b.overall_total_output_tokens ?? 0),
        },
        {
          title: 'Total Tokens',
          dataIndex: 'overall_total_tokens',
          key: 'overall_total_tokens',
          width: 110,
          render: (v: number) => <Text className="text-xs">{(v ?? 0).toFixed(0)}</Text>,
          sorter: (a, b) => (a.overall_total_tokens ?? 0) - (b.overall_total_tokens ?? 0),
        },
      ],
    } as ColumnGroupType<Record<string, any>>);

    // Add stage-specific metric groups
    const stageNames = [
      'onboarding',
      'job_to_be_done',
      'friction_analysis',
      'root_cause_analysis',
      'magnitude_and_consequences',
      'workarounds_and_limitations',
      'pain_statement',
    ];

    stageNames.forEach((stageName) => {
      const stageTitle = stageName
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      columns.push({
        title: stageTitle,
        children: [
          {
            title: 'Turns',
            dataIndex: `${stageName}_turns`,
            key: `${stageName}_turns`,
            width: 80,
            render: (v: number) => <Tag color={v > 0 ? 'green' : 'default'}>{v ?? 0}</Tag>,
            sorter: (a, b) => (a[`${stageName}_turns`] ?? 0) - (b[`${stageName}_turns`] ?? 0),
          },
          {
            title: 'Int. Cost',
            dataIndex: `${stageName}_internal_cost`,
            key: `${stageName}_internal_cost`,
            width: 95,
            render: (v: number) => <Text className="text-xs">${(v ?? 0).toFixed(4)}</Text>,
            sorter: (a, b) => (a[`${stageName}_internal_cost`] ?? 0) - (b[`${stageName}_internal_cost`] ?? 0),
          },
          {
            title: 'User Cost',
            dataIndex: `${stageName}_user_cost`,
            key: `${stageName}_user_cost`,
            width: 95,
            render: (v: number) => <Text className="text-xs">${(v ?? 0).toFixed(4)}</Text>,
            sorter: (a, b) => (a[`${stageName}_user_cost`] ?? 0) - (b[`${stageName}_user_cost`] ?? 0),
          },
          {
            title: 'In Tokens',
            dataIndex: `${stageName}_input_tokens`,
            key: `${stageName}_input_tokens`,
            width: 95,
            render: (v: number) => <Text className="text-xs">{(v ?? 0).toFixed(0)}</Text>,
            sorter: (a, b) => (a[`${stageName}_input_tokens`] ?? 0) - (b[`${stageName}_input_tokens`] ?? 0),
          },
          {
            title: 'Out Tokens',
            dataIndex: `${stageName}_output_tokens`,
            key: `${stageName}_output_tokens`,
            width: 95,
            render: (v: number) => <Text className="text-xs">{(v ?? 0).toFixed(0)}</Text>,
            sorter: (a, b) => (a[`${stageName}_output_tokens`] ?? 0) - (b[`${stageName}_output_tokens`] ?? 0),
          },
          {
            title: 'Total Tokens',
            dataIndex: `${stageName}_total_tokens`,
            key: `${stageName}_total_tokens`,
            width: 95,
            render: (v: number) => <Text className="text-xs">{(v ?? 0).toFixed(0)}</Text>,
            sorter: (a, b) => (a[`${stageName}_total_tokens`] ?? 0) - (b[`${stageName}_total_tokens`] ?? 0),
          },
        ],
      } as ColumnGroupType<Record<string, any>>);
    });

    return columns;
  }, [userRows, selectedUser, onSelectUser]);

  // Prepare filtered overall rows for the stacked chart (used in conditional rendering)
  const filteredOverallRows = (selectedUser && userOverallRows && userOverallRows.length)
    ? userOverallRows.filter(u => String(u.userId) === String(selectedUser))
    : (userOverallRows || []);

  return (
    <div className="flex flex-col gap-6">
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

      <Card className="shadow-sm" title={<span className="text-lg font-semibold">Stage Totals</span>}>
        <div className="flex gap-6 items-start">
          <div style={{ flex: 1, height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-20} textAnchor="end" interval={0} tickMargin={12} height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalTurns" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ width: 360, height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stages.map(s => ({ name: s.stage.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), value: s.total_turns ?? 0 }))}
                  dataKey="value"
                  nameKey="name"
                  cx="48%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={90}
                  labelLine={false}
                  label={(props: any) => {
                    const RADIAN = Math.PI / 180;
                    const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                    const xPos = cx + radius * Math.cos(-midAngle * RADIAN);
                    const yPos = cy + radius * Math.sin(-midAngle * RADIAN);

                    const hex = COLORS[index % COLORS.length] || '#000000';
                    const r = parseInt(hex.slice(1, 3), 16);
                    const g = parseInt(hex.slice(3, 5), 16);
                    const b = parseInt(hex.slice(5, 7), 16);
                    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                    const textColor = luminance > 0.55 ? '#111827' : '#ffffff';

                    return (
                      <text
                        x={xPos}
                        y={yPos}
                        fill={textColor}
                        fontSize={12}
                        textAnchor="middle"
                        dominantBaseline="central"
                        stroke={textColor === '#ffffff' ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.35)'}
                        strokeWidth={0.6}
                        opacity={0.95}
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {stages.map((_, i) => (
                    <Cell key={`slice-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any, name: any) => [`${v}`, `${name}`]} />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 12, width: 140 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card className="shadow-sm" title={<span className="text-lg font-semibold">Per-user Overview (Stacked)</span>}>
        <div className="mb-3 flex items-center gap-4">
          <span className="text-sm text-gray-700">Metrics:</span>
          {METRIC_OPTIONS.map(opt => (
            <label key={opt.key} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={selectedMetrics.includes(opt.key)} onChange={() => toggleMetric(opt.key)} />
              <span style={{ width: 12, height: 12, background: opt.color, display: 'inline-block', borderRadius: 2 }} />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>

        <div style={{ width: '100%', height: 300 }}>
          {(!filteredOverallRows || filteredOverallRows.length === 0) ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 1.343-3 3v4h6v-4c0-1.657-1.343-3-3-3z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Select a user to view details</h3>
              <p className="text-sm text-gray-500 mb-4">Click a User ID in the table below to inspect a user's per-stage metrics and costs.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredOverallRows} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="userId" tick={{ fontSize: 12 }} angle={filteredOverallRows.length > 1 ? -20 : 0} textAnchor={filteredOverallRows.length > 1 ? 'end' : 'middle'} interval={0} height={60} />
                <YAxis />
                <Tooltip />
                {METRIC_OPTIONS.filter(m => selectedMetrics.includes(m.key)).map(m => (
                  <Bar key={m.key} dataKey={m.key} stackId="a" fill={m.color} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      <Card className="shadow-sm" title={<span className="text-lg font-semibold">Per-user Detailed Metrics</span>}>
        <Table
          dataSource={userRows}
          columns={userTableColumns}
          rowKey={(r) => r.userId}
          pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'] }}
          bordered
          size="small"
          scroll={{ x: 'max-content' }}
          rowClassName={(record, index) => index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
        />
      </Card>
    </div>
  );
}
