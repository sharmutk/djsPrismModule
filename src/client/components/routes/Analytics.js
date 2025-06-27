import React from 'react';
import { Prism, InMemoryPrismConnector } from '@deshaw/djs-prism';
import { DJSBox, DJSTypography, styled } from '@deshaw/djs-gravity-ui';

// Sample business data with multiple dimensions for rich analytics
const salesData = [
  // Q1 2024 data
  { region: 'North America', department: 'Technology', quarter: 'Q1 2024', month: 'January', revenue: 125000, units_sold: 450, customer_count: 85, avg_deal_size: 1470 },
  { region: 'North America', department: 'Technology', quarter: 'Q1 2024', month: 'February', revenue: 135000, units_sold: 480, customer_count: 92, avg_deal_size: 1467 },
  { region: 'North America', department: 'Technology', quarter: 'Q1 2024', month: 'March', revenue: 145000, units_sold: 510, customer_count: 98, avg_deal_size: 1479 },

  { region: 'North America', department: 'Sales', quarter: 'Q1 2024', month: 'January', revenue: 89000, units_sold: 320, customer_count: 65, avg_deal_size: 1369 },
  { region: 'North America', department: 'Sales', quarter: 'Q1 2024', month: 'February', revenue: 95000, units_sold: 340, customer_count: 71, avg_deal_size: 1338 },
  { region: 'North America', department: 'Sales', quarter: 'Q1 2024', month: 'March', revenue: 102000, units_sold: 365, customer_count: 76, avg_deal_size: 1342 },

  { region: 'Europe', department: 'Technology', quarter: 'Q1 2024', month: 'January', revenue: 78000, units_sold: 290, customer_count: 55, avg_deal_size: 1418 },
  { region: 'Europe', department: 'Technology', quarter: 'Q1 2024', month: 'February', revenue: 84000, units_sold: 310, customer_count: 58, avg_deal_size: 1448 },
  { region: 'Europe', department: 'Technology', quarter: 'Q1 2024', month: 'March', revenue: 91000, units_sold: 335, customer_count: 62, avg_deal_size: 1468 },

  { region: 'Europe', department: 'Sales', quarter: 'Q1 2024', month: 'January', revenue: 56000, units_sold: 210, customer_count: 42, avg_deal_size: 1333 },
  { region: 'Europe', department: 'Sales', quarter: 'Q1 2024', month: 'February', revenue: 61000, units_sold: 225, customer_count: 45, avg_deal_size: 1356 },
  { region: 'Europe', department: 'Sales', quarter: 'Q1 2024', month: 'March', revenue: 67000, units_sold: 245, customer_count: 48, avg_deal_size: 1396 },

  { region: 'Asia Pacific', department: 'Technology', quarter: 'Q1 2024', month: 'January', revenue: 95000, units_sold: 380, customer_count: 72, avg_deal_size: 1319 },
  { region: 'Asia Pacific', department: 'Technology', quarter: 'Q1 2024', month: 'February', revenue: 103000, units_sold: 410, customer_count: 78, avg_deal_size: 1321 },
  { region: 'Asia Pacific', department: 'Technology', quarter: 'Q1 2024', month: 'March', revenue: 112000, units_sold: 445, customer_count: 84, avg_deal_size: 1333 },

  { region: 'Asia Pacific', department: 'Sales', quarter: 'Q1 2024', month: 'January', revenue: 73000, units_sold: 285, customer_count: 58, avg_deal_size: 1259 },
  { region: 'Asia Pacific', department: 'Sales', quarter: 'Q1 2024', month: 'February', revenue: 79000, units_sold: 305, customer_count: 62, avg_deal_size: 1274 },
  { region: 'Asia Pacific', department: 'Sales', quarter: 'Q1 2024', month: 'March', revenue: 86000, units_sold: 330, customer_count: 66, avg_deal_size: 1303 },

  // Q2 2024 data - showing growth trends
  { region: 'North America', department: 'Technology', quarter: 'Q2 2024', month: 'April', revenue: 155000, units_sold: 535, customer_count: 105, avg_deal_size: 1476 },
  { region: 'North America', department: 'Technology', quarter: 'Q2 2024', month: 'May', revenue: 162000, units_sold: 550, customer_count: 108, avg_deal_size: 1500 },
  { region: 'North America', department: 'Technology', quarter: 'Q2 2024', month: 'June', revenue: 171000, units_sold: 575, customer_count: 112, avg_deal_size: 1527 },

  { region: 'North America', department: 'Sales', quarter: 'Q2 2024', month: 'April', revenue: 108000, units_sold: 385, customer_count: 82, avg_deal_size: 1317 },
  { region: 'North America', department: 'Sales', quarter: 'Q2 2024', month: 'May', revenue: 115000, units_sold: 405, customer_count: 86, avg_deal_size: 1337 },
  { region: 'North America', department: 'Sales', quarter: 'Q2 2024', month: 'June', revenue: 123000, units_sold: 425, customer_count: 91, avg_deal_size: 1351 },

  { region: 'Europe', department: 'Technology', quarter: 'Q2 2024', month: 'April', revenue: 97000, units_sold: 355, customer_count: 68, avg_deal_size: 1426 },
  { region: 'Europe', department: 'Technology', quarter: 'Q2 2024', month: 'May', revenue: 104000, units_sold: 375, customer_count: 72, avg_deal_size: 1444 },
  { region: 'Europe', department: 'Technology', quarter: 'Q2 2024', month: 'June', revenue: 112000, units_sold: 395, customer_count: 76, avg_deal_size: 1474 },

  { region: 'Europe', department: 'Sales', quarter: 'Q2 2024', month: 'April', revenue: 71000, units_sold: 260, customer_count: 52, avg_deal_size: 1365 },
  { region: 'Europe', department: 'Sales', quarter: 'Q2 2024', month: 'May', revenue: 76000, units_sold: 275, customer_count: 55, avg_deal_size: 1382 },
  { region: 'Europe', department: 'Sales', quarter: 'Q2 2024', month: 'June', revenue: 82000, units_sold: 290, customer_count: 58, avg_deal_size: 1414 },

  { region: 'Asia Pacific', department: 'Technology', quarter: 'Q2 2024', month: 'April', revenue: 118000, units_sold: 465, customer_count: 88, avg_deal_size: 1341 },
  { region: 'Asia Pacific', department: 'Technology', quarter: 'Q2 2024', month: 'May', revenue: 126000, units_sold: 485, customer_count: 92, avg_deal_size: 1370 },
  { region: 'Asia Pacific', department: 'Technology', quarter: 'Q2 2024', month: 'June', revenue: 135000, units_sold: 510, customer_count: 96, avg_deal_size: 1406 },

  { region: 'Asia Pacific', department: 'Sales', quarter: 'Q2 2024', month: 'April', revenue: 91000, units_sold: 350, customer_count: 72, avg_deal_size: 1264 },
  { region: 'Asia Pacific', department: 'Sales', quarter: 'Q2 2024', month: 'May', revenue: 97000, units_sold: 370, customer_count: 75, avg_deal_size: 1293 },
  { region: 'Asia Pacific', department: 'Sales', quarter: 'Q2 2024', month: 'June', revenue: 104000, units_sold: 390, customer_count: 79, avg_deal_size: 1316 },
];

// Customer satisfaction data for multi-dataset example
const customerSatisfactionData = [
  { region: 'North America', department: 'Technology', quarter: 'Q1 2024', satisfaction_score: 8.7, support_tickets: 45, resolution_time_hours: 2.3, nps_score: 72 },
  { region: 'North America', department: 'Sales', quarter: 'Q1 2024', satisfaction_score: 8.2, support_tickets: 67, resolution_time_hours: 3.1, nps_score: 68 },
  { region: 'Europe', department: 'Technology', quarter: 'Q1 2024', satisfaction_score: 8.9, support_tickets: 32, resolution_time_hours: 1.8, nps_score: 75 },
  { region: 'Europe', department: 'Sales', quarter: 'Q1 2024', satisfaction_score: 8.4, support_tickets: 41, resolution_time_hours: 2.7, nps_score: 71 },
  { region: 'Asia Pacific', department: 'Technology', quarter: 'Q1 2024', satisfaction_score: 8.5, support_tickets: 38, resolution_time_hours: 2.1, nps_score: 69 },
  { region: 'Asia Pacific', department: 'Sales', quarter: 'Q1 2024', satisfaction_score: 8.1, support_tickets: 54, resolution_time_hours: 3.4, nps_score: 65 },

  { region: 'North America', department: 'Technology', quarter: 'Q2 2024', satisfaction_score: 8.9, support_tickets: 41, resolution_time_hours: 2.1, nps_score: 76 },
  { region: 'North America', department: 'Sales', quarter: 'Q2 2024', satisfaction_score: 8.4, support_tickets: 59, resolution_time_hours: 2.8, nps_score: 72 },
  { region: 'Europe', department: 'Technology', quarter: 'Q2 2024', satisfaction_score: 9.1, support_tickets: 28, resolution_time_hours: 1.6, nps_score: 78 },
  { region: 'Europe', department: 'Sales', quarter: 'Q2 2024', satisfaction_score: 8.6, support_tickets: 37, resolution_time_hours: 2.4, nps_score: 74 },
  { region: 'Asia Pacific', department: 'Technology', quarter: 'Q2 2024', satisfaction_score: 8.7, support_tickets: 34, resolution_time_hours: 1.9, nps_score: 73 },
  { region: 'Asia Pacific', department: 'Sales', quarter: 'Q2 2024', satisfaction_score: 8.3, support_tickets: 48, resolution_time_hours: 3.1, nps_score: 68 },
];

// Field definitions for sales data
const salesFields = [
  {
    name: 'region',
    label: 'Region',
    dataType: 'string',
    roles: ['groupable', 'aggregatable', 'filterable'],
  },
  {
    name: 'department',
    label: 'Department',
    dataType: 'string',
    roles: ['groupable', 'aggregatable', 'filterable'],
  },
  {
    name: 'quarter',
    label: 'Quarter',
    dataType: 'string',
    roles: ['groupable', 'aggregatable', 'filterable'],
  },
  {
    name: 'month',
    label: 'Month',
    dataType: 'string',
    roles: ['groupable', 'aggregatable', 'filterable'],
  },
  {
    name: 'revenue',
    label: 'Revenue ($)',
    dataType: 'float',
    roles: ['aggregatable'],
  },
  {
    name: 'units_sold',
    label: 'Units Sold',
    dataType: 'integer',
    roles: ['aggregatable'],
  },
  {
    name: 'customer_count',
    label: 'Customer Count',
    dataType: 'integer',
    roles: ['aggregatable'],
  },
  {
    name: 'avg_deal_size',
    label: 'Average Deal Size ($)',
    dataType: 'float',
    roles: ['aggregatable'],
  },
];

// Field definitions for customer satisfaction data
const satisfactionFields = [
  {
    name: 'region',
    label: 'Region',
    dataType: 'string',
    roles: ['groupable', 'aggregatable', 'filterable'],
  },
  {
    name: 'department',
    label: 'Department',
    dataType: 'string',
    roles: ['groupable', 'aggregatable', 'filterable'],
  },
  {
    name: 'quarter',
    label: 'Quarter',
    dataType: 'string',
    roles: ['groupable', 'aggregatable', 'filterable'],
  },
  {
    name: 'satisfaction_score',
    label: 'Satisfaction Score',
    dataType: 'float',
    roles: ['aggregatable'],
  },
  {
    name: 'support_tickets',
    label: 'Support Tickets',
    dataType: 'integer',
    roles: ['aggregatable'],
  },
  {
    name: 'resolution_time_hours',
    label: 'Avg Resolution Time (hours)',
    dataType: 'float',
    roles: ['aggregatable'],
  },
  {
    name: 'nps_score',
    label: 'NPS Score',
    dataType: 'integer',
    roles: ['aggregatable'],
  },
];

const StyledContainer = styled(DJSBox)({
  padding: '20px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const StyledPrismContainer = styled(DJSBox)({
  flex: 1,
  minHeight: '600px',
  marginTop: '20px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '10px',
});

const Analytics = () => {
  // Create connector with sales data
  const connector = new InMemoryPrismConnector({
    granularData: salesData,
  });

  // Use sales fields
  const defaultFields = salesFields;

  return (
    <StyledContainer>
      <DJSTypography variant="h4" fontWeight="bold" gutterBottom>
        Business Analytics Dashboard
      </DJSTypography>
      <DJSTypography variant="body1" color="textSecondary" gutterBottom>
        Explore your sales performance data with interactive pivoting, filtering, and aggregation.
        Group by region, department, quarter, or month to analyze revenue, units sold, customer count, and deal sizes.
      </DJSTypography>

      <StyledPrismContainer>
        <Prism
          fields={defaultFields}
          defaultConnector={connector}
        />
      </StyledPrismContainer>
    </StyledContainer>
  );
};

export default Analytics;