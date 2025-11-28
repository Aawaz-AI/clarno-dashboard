"use client"

import { Select, DatePicker } from "antd"
import React from "react"
import type { User } from "@/types"
import type { Dayjs } from "dayjs"

const { RangePicker } = DatePicker
const { Option } = Select

interface HeaderProps {
  users: User[]
  selectedUser: string
  onUserChange: (value: string) => void
  onDateChange: (dates: [string, string] | null) => void
}

export default function Header({ users, selectedUser, onUserChange, onDateChange }: HeaderProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  const handleDateChange = (dates: null | [Dayjs | null, Dayjs | null]) => {
    if (dates && dates[0] && dates[1]) {
      onDateChange([dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD")])
    } else {
      onDateChange(null)
    }
  }

  return (
   <header className="w-full h-[100px] border-b border-gray-200 bg-white">
  <div className="h-full max-w-7xl mx-auto px-8 !mx-8 flex items-center justify-between">
        {/* Logo section */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <h1 className="ml-3 text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        {/* Filters section */}
        <div className="flex items-center gap-4">
          {mounted ? (
            <Select
              value={selectedUser}
              onChange={onUserChange}
              className="w-48"
              placeholder="Select User"
            >
              <Option value="all">All Users</Option>
              {users.map((user) => (
                <Option key={user.id} value={user.id.toString()}>
                  {user.name}
                </Option>
              ))}
            </Select>
          ) : (
            <div className="w-48 h-10 rounded bg-gray-50" />
          )}

          <RangePicker
            onChange={handleDateChange}
            className="w-64"
            format="YYYY-MM-DD"
          />
        </div>
      </div>
    </header>
  )
}