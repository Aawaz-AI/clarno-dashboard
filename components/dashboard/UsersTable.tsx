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
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-linear-to-b from-blue-500 to-purple-600 rounded-full" />
        <h2 className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          User Information
        </h2>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} users`,
        }}
        className="overflow-x-auto custom-table"
        rowClassName={(record) => 
          `hover:bg-blue-50/50 transition-colors duration-200 ${
            selectedUser && String(selectedUser) === String(record.id) 
              ? 'bg-blue-50 border-l-4 border-blue-500' 
              : ''
          }`
        }
      />
    </Card>
  );
}