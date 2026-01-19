import { Card, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserProfile } from '@/types';

interface UsersTableProps {
  users: UserProfile[];
  selectedUser?: string;
  onSelectUser?: (id: string) => void;
}

export default function UsersTable({ users, selectedUser, onSelectUser }: UsersTableProps) {
  const columns: ColumnsType<UserProfile> = [
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
      width: 300,
      render: (userId: string) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!onSelectUser) return;
            if (selectedUser && String(selectedUser) === userId) onSelectUser('all');
            else onSelectUser(userId);
          }}
          aria-label={`Select user ${userId}`}
          className={`text-sm font-medium text-blue-600 hover:underline cursor-pointer ${selectedUser && String(selectedUser) === userId ? 'underline' : ''}`}
        >
          {userId}
        </button>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => name || 'N/A',
      sorter: (a, b) => String(a.name ?? '').localeCompare(String(b.name ?? '')),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => String(a.email ?? '').localeCompare(String(b.email ?? '')),
    },
    {
      title: 'Last Login',
      dataIndex: 'last_login',
      key: 'last_login',
      width: 150,
      render: (lastLogin: string | null) => {
        if (!lastLogin) return <Tag color="default">Never</Tag>;
        const date = new Date(lastLogin);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      },
      sorter: (a, b) => {
        const da = a.last_login ? Date.parse(a.last_login) : 0;
        const db = b.last_login ? Date.parse(b.last_login) : 0;
        return da - db;
      },
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      sorter: (a, b) => String(a.region ?? '').localeCompare(String(b.region ?? '')),
    },
    {
      title: 'Registered Date',
      dataIndex: 'creation_time',
      key: 'creation_time',
      width: 150,
      render: (creationTime: string) => {
        const date = new Date(creationTime);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      },
      sorter: (a, b) => {
        const da = a.creation_time ? Date.parse(a.creation_time) : 0;
        const db = b.creation_time ? Date.parse(b.creation_time) : 0;
        return da - db;
      },
    },
  ];

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-linear-to-b from-blue-500 to-purple-600 rounded-full" />
        <h2 className="text-xl font-bold heading-fade">User Information</h2>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="user_id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} users`,
        }}
        className="overflow-x-auto custom-table"
        scroll={{ x: 'max-content' }}
        rowClassName={(record) => 
          `hover:bg-blue-50/50 transition-colors duration-200 ${
            selectedUser && String(selectedUser) === String(record.user_id) 
              ? 'bg-blue-50 border-l-4 border-blue-500' 
              : ''
          }`
        }
      />
    </Card>
  );
}