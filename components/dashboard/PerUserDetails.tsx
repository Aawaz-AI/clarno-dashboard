 'use client';

import { useMemo, useState } from 'react';
import { Card, Space, Select, Button, Input, Table, Drawer } from 'antd';
import type { ColumnsType, ColumnGroupType } from 'antd/es/table';

type Props = {
  userRows: Array<Record<string, any>>;
  userOverallRows?: Array<Record<string, any>>;
  selectedUser?: string;
  onSelectUser?: (id: string) => void;
};

export default function PerUserDetails({ userRows, userOverallRows = [], selectedUser, onSelectUser }: Props) {
  const GROUP_OPTIONS = [
    { label: 'All Stages', value: 'all' },
    { label: 'Overall Metrics', value: 'overall' },
    { label: 'Onboarding', value: 'onboarding' },
    { label: 'Job To Be Done', value: 'job_to_be_done' },
    { label: 'Friction Analysis', value: 'friction_analysis' },
    { label: 'Root Cause Analysis', value: 'root_cause_analysis' },
    { label: 'Magnitude And Consequences', value: 'magnitude_and_consequences' },
    { label: 'Workarounds And Limitations', value: 'workarounds_and_limitations' },
    { label: 'Pain Statement', value: 'pain_statement' },
  ];

  // compute userTableColumns based on userRows
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
          render: (v: number) => <span className="ant-tag ant-tag-blue">{v ?? 0}</span>,
          sorter: (a, b) => (a.overall_total_turns ?? 0) - (b.overall_total_turns ?? 0),
        },
        {
          title: 'Internal Cost',
          dataIndex: 'overall_internal_cost',
          key: 'overall_internal_cost',
          width: 110,
          render: (v: number) => <span className="text-xs">${(v ?? 0).toFixed(4)}</span>,
          sorter: (a, b) => (a.overall_internal_cost ?? 0) - (b.overall_internal_cost ?? 0),
        },
        {
          title: 'User Cost',
          dataIndex: 'overall_user_cost',
          key: 'overall_user_cost',
          width: 110,
          render: (v: number) => <span className="text-xs">${(v ?? 0).toFixed(4)}</span>,
          sorter: (a, b) => (a.overall_user_cost ?? 0) - (b.overall_user_cost ?? 0),
        },
        {
          title: 'Charged Credits',
          dataIndex: 'overall_charged_credits',
          key: 'overall_charged_credits',
          width: 120,
          render: (v: number) => <span className="text-xs">{(v ?? 0).toFixed(2)}</span>,
          sorter: (a, b) => (a.overall_charged_credits ?? 0) - (b.overall_charged_credits ?? 0),
        },
        {
          title: 'Input Tokens',
          dataIndex: 'overall_total_input_tokens',
          key: 'overall_total_input_tokens',
          width: 110,
          render: (v: number) => <span className="text-xs">{(v ?? 0).toFixed(0)}</span>,
          sorter: (a, b) => (a.overall_total_input_tokens ?? 0) - (b.overall_total_input_tokens ?? 0),
        },
        {
          title: 'Output Tokens',
          dataIndex: 'overall_total_output_tokens',
          key: 'overall_total_output_tokens',
          width: 110,
          render: (v: number) => <span className="text-xs">{(v ?? 0).toFixed(0)}</span>,
          sorter: (a, b) => (a.overall_total_output_tokens ?? 0) - (b.overall_total_output_tokens ?? 0),
        },
        {
          title: 'Total Tokens',
          dataIndex: 'overall_total_tokens',
          key: 'overall_total_tokens',
          width: 110,
          render: (v: number) => <span className="text-xs">{(v ?? 0).toFixed(0)}</span>,
          sorter: (a, b) => (a.overall_total_tokens ?? 0) - (b.overall_total_tokens ?? 0),
        },
      ],
    } as ColumnGroupType<Record<string, any>>);

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
            render: (v: number) => <span className={`ant-tag ${v > 0 ? 'ant-tag-green' : 'ant-tag-default'}`}>{v ?? 0}</span>,
            sorter: (a, b) => (a[`${stageName}_turns`] ?? 0) - (b[`${stageName}_turns`] ?? 0),
          },
          {
            title: 'Int. Cost',
            dataIndex: `${stageName}_internal_cost`,
            key: `${stageName}_internal_cost`,
            width: 95,
            render: (v: number) => <span className="text-xs">${(v ?? 0).toFixed(4)}</span>,
            sorter: (a, b) => (a[`${stageName}_internal_cost`] ?? 0) - (b[`${stageName}_internal_cost`] ?? 0),
          },
          {
            title: 'User Cost',
            dataIndex: `${stageName}_user_cost`,
            key: `${stageName}_user_cost`,
            width: 95,
            render: (v: number) => <span className="text-xs">${(v ?? 0).toFixed(4)}</span>,
            sorter: (a, b) => (a[`${stageName}_user_cost`] ?? 0) - (b[`${stageName}_user_cost`] ?? 0),
          },
          {
            title: 'In Tokens',
            dataIndex: `${stageName}_input_tokens`,
            key: `${stageName}_input_tokens`,
            width: 95,
            render: (v: number) => <span className="text-xs">{(v ?? 0).toFixed(0)}</span>,
            sorter: (a, b) => (a[`${stageName}_input_tokens`] ?? 0) - (b[`${stageName}_input_tokens`] ?? 0),
          },
          {
            title: 'Out Tokens',
            dataIndex: `${stageName}_output_tokens`,
            key: `${stageName}_output_tokens`,
            width: 95,
            render: (v: number) => <span className="text-xs">{(v ?? 0).toFixed(0)}</span>,
            sorter: (a, b) => (a[`${stageName}_output_tokens`] ?? 0) - (b[`${stageName}_output_tokens`] ?? 0),
          },
          {
            title: 'Total Tokens',
            dataIndex: `${stageName}_total_tokens`,
            key: `${stageName}_total_tokens`,
            width: 95,
            render: (v: number) => <span className="text-xs">{(v ?? 0).toFixed(0)}</span>,
            sorter: (a, b) => (a[`${stageName}_total_tokens`] ?? 0) - (b[`${stageName}_total_tokens`] ?? 0),
          },
          {
            title: 'Charged Credits',
            dataIndex: `${stageName}_charged_credits`,
            key: `${stageName}_charged_credits`,
            width: 110,
            render: (v: number) => <span className="text-xs">{(v ?? 0).toFixed(2)}</span>,
            sorter: (a, b) => (a[`${stageName}_charged_credits`] ?? 0) - (b[`${stageName}_charged_credits`] ?? 0),
          },
        ],
      } as ColumnGroupType<Record<string, any>>);
    });

    return columns;
  }, [userRows, selectedUser, onSelectUser]);

  const defaultOverallCols = [
    'overall_total_turns',
    'overall_internal_cost',
    'overall_user_cost',
    'overall_total_input_tokens',
    'overall_total_output_tokens',
    'overall_total_tokens',
    'overall_charged_credits',
  ];

  const [selectedGroup, setSelectedGroup] = useState<string>('overall');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleOverallCols, setVisibleOverallCols] = useState<string[]>(defaultOverallCols);
  const [searchText, setSearchText] = useState('');

  const filteredColumns = useMemo(() => {
    if (!userTableColumns || userTableColumns.length === 0) return [];
    if (selectedGroup === 'all') return userTableColumns;

    const baseCols = [userTableColumns[0]];

    if (selectedGroup === 'overall') {
      const overallGroup = userTableColumns.find(c => (c as any).title === 'Overall Metrics');
      if (overallGroup) {
        const children = (overallGroup as any).children || [overallGroup];
        const visible = children.filter((ch: any) => visibleOverallCols.includes(ch.dataIndex));
        return baseCols.concat(visible);
      }
      return userTableColumns;
    }

    const titleMap: Record<string, string> = {
      onboarding: 'Onboarding',
      job_to_be_done: 'Job To Be Done',
      friction_analysis: 'Friction Analysis',
      root_cause_analysis: 'Root Cause Analysis',
      magnitude_and_consequences: 'Magnitude And Consequences',
      workarounds_and_limitations: 'Workarounds And Limitations',
      pain_statement: 'Pain Statement',
    };

    const stageTitle = titleMap[selectedGroup] || selectedGroup;
    const stageGroup = userTableColumns.find(c => (c as any).title === stageTitle);
    if (stageGroup) return baseCols.concat((stageGroup as any).children || [stageGroup]);

    return userTableColumns;
  }, [userTableColumns, selectedGroup, visibleOverallCols]);

  const displayedRows = useMemo(() => {
    let filtered = userRows || [];
    if (selectedUser && selectedUser !== 'all') {
      filtered = filtered.filter((r) => String(r.userId) === String(selectedUser));
    }
    if (searchText) {
      const q = String(searchText).toLowerCase();
      filtered = filtered.filter((r) => {
        if (!r) return false;
        if (String(r.userId).toLowerCase().includes(q)) return true;
        const keys = Object.keys(r);
        for (const k of keys) {
          const v = r[k];
          if (v === null || v === undefined) continue;
          if (String(v).toLowerCase().includes(q)) return true;
        }
        return false;
      });
    }
    return filtered;
  }, [userRows, searchText, selectedUser]);

  // helper to render expanded row for smaller tables
  const renderStageRows = (record: any) => {
    const stageRows = Object.keys(record)
      .filter(k => k.includes('_turns') || k.includes('_input_tokens') || k.includes('_output_tokens') || k.includes('_internal_cost'))
      .reduce((acc: any[], key) => {
        const parts = key.split('_');
        const stage = parts.slice(0, parts.length - 1).join('_');
        const existing = acc.find(a => a.stage === stage);
        if (!existing) acc.push({ stage });
        return acc;
      }, [])
      .map((s) => ({
        stage: s.stage.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
        turns: record[`${s.stage}_turns`] ?? 0,
        int_cost: record[`${s.stage}_internal_cost`] ?? 0,
        user_cost: record[`${s.stage}_user_cost`] ?? 0,
        in_tokens: record[`${s.stage}_input_tokens`] ?? 0,
        out_tokens: record[`${s.stage}_output_tokens`] ?? 0,
        total_tokens: record[`${s.stage}_total_tokens`] ?? 0,
        charged_credits: record[`${s.stage}_charged_credits`] ?? 0,
      }));

    return (
      <div style={{ padding: 12 }}>
        <Table
          columns={[
            { title: 'Stage', dataIndex: 'stage', key: 'stage' },
            { title: 'Turns', dataIndex: 'turns', key: 'turns' },
            { title: 'Int. Cost', dataIndex: 'int_cost', key: 'int_cost', render: (v: number) => `$${(v ?? 0).toFixed(4)}` },
            { title: 'User Cost', dataIndex: 'user_cost', key: 'user_cost', render: (v: number) => `$${(v ?? 0).toFixed(4)}` },
            { title: 'In Tokens', dataIndex: 'in_tokens', key: 'in_tokens' },
            { title: 'Out Tokens', dataIndex: 'out_tokens', key: 'out_tokens' },
            { title: 'Total Tokens', dataIndex: 'total_tokens', key: 'total_tokens' },
            { title: 'Charged Credits', dataIndex: 'charged_credits', key: 'charged_credits', render: (v: number) => (v ?? 0).toFixed(2) },
          ]}
          dataSource={stageRows}
          pagination={false}
          rowKey={(r) => r.stage}
          size="small"
        />
      </div>
    );
  };

  return (
    <Card className="shadow-sm" title={<span className="text-lg font-semibold">Per-user Detailed Metrics</span>}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 md:py-6 px-4">
        <Space>
          <span className="text-sm text-gray-700">Show:</span>
          <Select
            value={selectedGroup}
            onChange={(v) => setSelectedGroup(String(v))}
            options={GROUP_OPTIONS}
            style={{ width: 260 }}
          />

          <Button type="default" onClick={() => { setSelectedGroup('overall'); setVisibleOverallCols(defaultOverallCols); }}>Reset</Button>
        </Space>

        <Space>
          <Input.Search placeholder="Search users or metrics" allowClear onSearch={(v) => setSearchText(v)} style={{ width: 260 }} />
          <Button type="primary" onClick={() => setDrawerOpen(true)}>Open Full Table</Button>
        </Space>
      </div>

      <Table
        dataSource={displayedRows}
        columns={filteredColumns}
        rowKey={(r) => r.userId}
        pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'] }}
        bordered
        size="small"
        scroll={{ x: 'max-content' }}
        rowClassName={(record, index) => index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
        expandable={{ expandedRowRender: renderStageRows }}
      />

      <Drawer
        title="Full Per-user Detailed Metrics"
        placement="right"
        size={1100}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <Table
          dataSource={userRows}
          columns={userTableColumns}
          rowKey={(r) => r.userId}
          pagination={{ pageSize: 20 }}
          bordered
          size="small"
          scroll={{ x: 'max-content' }}
          expandable={{ expandedRowRender: renderStageRows }}
        />
      </Drawer>
    </Card>
  );
}
