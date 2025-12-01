"use client"

import { Select, DatePicker } from "antd"
import React from "react"
import type { Dayjs } from "dayjs"

const { RangePicker } = DatePicker
const { Option } = Select

interface HeaderProps {
  userIds: string[]
  selectedUser: string
  onUserChange: (value: string) => void
  onDateChange: (dates: [string, string] | null) => void
}

export default function Header({ userIds, selectedUser, onUserChange, onDateChange }: HeaderProps) {
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
   <header className="w-full h-[90px] border-b border-gray-200/50 bg-white/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
  <div className="h-full max-w-7xl mx-auto px-8 flex items-center justify-between" style={{ marginLeft: '2rem', marginRight: '2rem' }}>
        {/* Logo section */}
        <div className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-linear-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-2xl">D</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-xs text-gray-500">Analytics & Insights</p>
          </div>
        </div>

        {/* Filters section */}
        <div className="flex items-center gap-3">
          {mounted ? (
            <Select
              value={selectedUser}
              onChange={onUserChange}
              className="w-52 hover:shadow-md transition-shadow"
              placeholder="Select User"
              size="large"
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="all">All Users</Option>
              {userIds.map((userId) => (
                <Option key={userId} value={userId} label={userId}>
                  {userId}
                </Option>
              ))}
            </Select>
          ) : (
            <div className="w-52 h-10 rounded-lg bg-gray-100 animate-pulse" />
          )}

          <RangePicker
            onChange={handleDateChange}
            className="w-72 hover:shadow-md transition-shadow"
            format="YYYY-MM-DD"
            size="large"
          />
        </div>
      </div>
    </header>
  )
}