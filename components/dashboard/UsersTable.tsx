import { Card, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { User } from '@/types';

interface UsersTableProps {
  users: User[];
  selectedUser?: string;
  onSelectUser?: (id: string) => void;
}

export default function UsersTable({ users, selectedUser, onSelectUser }: UsersTableProps) {
  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a, b) => (a.id ?? 0) - (b.id ?? 0),
      render: (id: number) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!onSelectUser) return;
            const sid = String(id);
            if (selectedUser && String(selectedUser) === sid) onSelectUser('all');
            else onSelectUser(sid);
          }}
          aria-label={`Select user ${id}`}
          className={`text-sm font-medium text-blue-600 hover:underline cursor-pointer ${selectedUser && String(selectedUser) === String(id) ? 'underline' : ''}`}
        >
          {id}
        </button>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => String(a.name ?? '').localeCompare(String(b.name ?? '')),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => String(a.email ?? '').localeCompare(String(b.email ?? '')),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status.toUpperCase()}
        </Tag>
      ),
      sorter: (a, b) => String(a.status ?? '').localeCompare(String(b.status ?? '')),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      sorter: (a, b) => {
        const da = a.lastActive ? Date.parse(String(a.lastActive)) : 0;
        const db = b.lastActive ? Date.parse(String(b.lastActive)) : 0;
        return da - db;
      },
    },
    {
      title: 'Registered Date',
      dataIndex: 'registeredDate',
      key: 'registeredDate',
      sorter: (a, b) => {
        const da = a.registeredDate ? Date.parse(String(a.registeredDate)) : 0;
        const db = b.registeredDate ? Date.parse(String(b.registeredDate)) : 0;
        return da - db;
      },
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      sorter: (a, b) => String(a.region ?? '').localeCompare(String(b.region ?? '')),
    },
  ];

  return (
    <Card className="shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        User Information
      </h2>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} users`,
        }}
        className="overflow-x-auto"
      />
    </Card>
  );
}