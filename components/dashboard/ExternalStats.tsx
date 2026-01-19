'use client';

import { Row, Col, Statistic } from 'antd';

type Props = {
  totals: any;
};

export default function ExternalStats({ totals }: Props) {
  if (!totals) return null;

  return (
    <Row gutter={16} className="mb-6 mt-4">
      <Col span={6}>
        <div className="p-4! chart-surface hover:shadow-md transition-shadow duration-200">
          <Statistic title="Reddit Calls" value={totals.total_reddit_calls} />
        </div>
      </Col>
      <Col span={6}>
        <div className="p-4! chart-surface hover:shadow-md transition-shadow duration-200">
          <Statistic title="Tavily Calls" value={totals.total_tavily_calls} />
        </div>
      </Col>
      <Col span={6}>
        <div className="p-4! chart-surface hover:shadow-md transition-shadow duration-200">
          <Statistic title="Gemini Calls" value={totals.total_gemini_calls} />
        </div>
      </Col>
      <Col span={6}>
        <div className="p-4! chart-surface hover:shadow-md transition-shadow duration-200">
          <Statistic title="Total Calls" value={totals.total_all_calls} />
        </div>
      </Col>
    </Row>
  );
}
