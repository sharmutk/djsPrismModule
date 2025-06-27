import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  DJSBox,
  DJSTypography,
  DJSButton,
  DJSMenu,
  DJSMenuItem,
  DJSTextField,
  DJSCard,
  DJSCardContent,
  DJSGrid,
  styled
} from '@deshaw/djs-gravity-ui';

// Generate random SPNs (Security Price Numbers)
const generateRandomSPN = () => {
  const exchanges = ['NYSE', 'NASDAQ', 'LSE', 'TSE', 'HKSE'];
  const sectors = ['TECH', 'FINC', 'HLTH', 'ENRG', 'CONS', 'INDL', 'MATL', 'UTIL', 'REAL', 'COMM'];
  
  const exchange = exchanges[Math.floor(Math.random() * exchanges.length)];
  const sector = sectors[Math.floor(Math.random() * sectors.length)];
  const number = String(Math.floor(Math.random() * 999999)).padStart(6, '0');
  
  return `${exchange}.${sector}.${number}`;
};

// Generate random price
const generateRandomPrice = (basePrice = null) => {
  if (basePrice) {
    // Generate price with some volatility around base price
    const volatility = 0.05; // 5% volatility
    const change = (Math.random() - 0.5) * 2 * volatility;
    return Math.max(0.01, basePrice * (1 + change));
  }
  return Math.round((Math.random() * 2000 + 10) * 100) / 100; // Random price between $10-$2010
};

// Generate historical prices for timeseries (last 3 months)
const generateHistoricalPrices = (currentPrice, spn) => {
  const prices = [];
  const today = new Date();
  let price = currentPrice;
  
  // Generate 90 days of historical data
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Add some randomness but keep it realistic
    price = generateRandomPrice(price);
    
    prices.push({
      date: date.toISOString().split('T')[0],
      spn: spn,
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 1000000) + 100000
    });
  }
  
  return prices;
};

// Generate initial price data
const generatePriceData = (date) => {
  const data = [];
  const spns = [];
  
  // Generate 100 unique SPNs
  for (let i = 0; i < 100; i++) {
    let spn;
    do {
      spn = generateRandomSPN();
    } while (spns.includes(spn));
    spns.push(spn);
    
    const price = generateRandomPrice();
    data.push({
      id: i + 1,
      spn: spn,
      price: price,
      date: date,
      change: Math.round((Math.random() - 0.5) * 20 * 100) / 100, // Random change between -10 and +10
      volume: Math.floor(Math.random() * 1000000) + 100000,
      lastUpdated: new Date().toLocaleTimeString()
    });
  }
  
  return data;
};

const StyledContainer = styled(DJSBox)({
  padding: '20px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const StyledFiltersContainer = styled(DJSBox)({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
});

const StyledGridContainer = styled(DJSBox)({
  flex: 1,
  minHeight: '400px',
  marginBottom: '20px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  maxHeight: '500px',
  overflow: 'auto',
});

const StyledChartContainer = styled(DJSBox)({
  height: '400px',
  marginTop: '20px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '15px',
  backgroundColor: '#fafafa',
});

const StyledGlossaryNote = styled(DJSBox)({
  marginBottom: '15px',
  padding: '10px',
  backgroundColor: '#e3f2fd',
  borderLeft: '4px solid #2196f3',
  borderRadius: '4px',
});

const SimpleLineChart = ({ data, title }) => {
  const canvasRef = React.useRef(null);
  
  React.useEffect(() => {
    if (!data || data.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up margins
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Get min/max values
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    // Draw axes
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + chartHeight);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top + chartHeight);
    ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
    ctx.stroke();
    
    // Draw price line
    ctx.strokeStyle = '#2196f3';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((point, index) => {
      const x = margin.left + (index / (data.length - 1)) * chartWidth;
      const y = margin.top + chartHeight - ((point.price - minPrice) / priceRange) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X-axis labels (dates)
    const labelStep = Math.ceil(data.length / 5);
    for (let i = 0; i < data.length; i += labelStep) {
      const x = margin.left + (i / (data.length - 1)) * chartWidth;
      const date = new Date(data[i].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      ctx.fillText(date, x, margin.top + chartHeight + 20);
    }
    
    // Y-axis labels (prices)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const price = minPrice + (priceRange / 4) * i;
      const y = margin.top + chartHeight - (i / 4) * chartHeight;
      ctx.fillText(`$${price.toFixed(2)}`, margin.left - 10, y + 4);
    }
    
  }, [data]);
  
  return (
    <DJSBox>
      <DJSTypography variant="h6" gutterBottom>
        {title}
      </DJSTypography>
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={300}
        style={{ width: '100%', height: '300px' }}
      />
    </DJSBox>
  );
};

const PriceData = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priceData, setPriceData] = useState([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, rowData: null });
  const [selectedSPN, setSelectedSPN] = useState(null);
  const [timeseriesData, setTimeseriesData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  // Initialize price data
  useEffect(() => {
    const data = generatePriceData(selectedDate.toISOString().split('T')[0]);
    setPriceData(data);
  }, [selectedDate]);

  // Handle date change
  const handleDateChange = useCallback((event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    setShowChart(false); // Hide chart when date changes
    setSelectedSPN(null);
  }, []);

  // Handle right-click context menu
  const handleContextMenu = useCallback((event, rowData) => {
    if (event) {
      event.preventDefault();
    }
    setContextMenu({
      visible: true,
      x: event ? event.clientX : 100,
      y: event ? event.clientY : 100,
      rowData: rowData
    });
  }, []);

  // Handle context menu close
  const handleContextMenuClose = useCallback(() => {
    setContextMenu({ visible: false, x: 0, y: 0, rowData: null });
  }, []);

  // Handle show timeseries
  const handleShowTimeseries = useCallback(() => {
    if (contextMenu.rowData) {
      const spn = contextMenu.rowData.spn;
      const currentPrice = contextMenu.rowData.price;
      
      // Generate historical data
      const historicalData = generateHistoricalPrices(currentPrice, spn);
      setTimeseriesData(historicalData);
      setSelectedSPN(spn);
      setShowChart(true);
    }
    handleContextMenuClose();
  }, [contextMenu.rowData, handleContextMenuClose]);

  // Close context menu when clicking elsewhere
  useEffect(() => {
    const handleClick = () => {
      if (contextMenu.visible) {
        handleContextMenuClose();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [contextMenu.visible, handleContextMenuClose]);

  // Handle row click for context menu
  const handleRowClick = useCallback((event, rowData) => {
    handleContextMenu(event, rowData);
  }, [handleContextMenu]);

  return (
    <StyledContainer>
      <DJSTypography variant="h4" fontWeight="bold" gutterBottom>
        Price Data
      </DJSTypography>

      <StyledGlossaryNote>
        <DJSTypography variant="body2" fontWeight="bold" gutterBottom>
          What is SPN? 
        </DJSTypography>
        <DJSTypography variant="body2" color="textSecondary">
          SPN (Security Price Number) is a unique identifier for financial instruments in trading systems. 
          It typically consists of exchange code, sector classification, and a unique numerical identifier 
          (e.g., NYSE.TECH.123456 represents a technology security traded on NYSE).
        </DJSTypography>
      </StyledGlossaryNote>

      <StyledFiltersContainer>
        <DJSTypography variant="body1" fontWeight="medium">
          Filter by Date:
        </DJSTypography>
        <DJSTextField
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={handleDateChange}
          variant="outlined"
          size="small"
        />
        <DJSTypography variant="body2" color="textSecondary">
          Showing {priceData.length} entries for {selectedDate.toLocaleDateString()}
        </DJSTypography>
      </StyledFiltersContainer>

      <StyledGridContainer>
        <DJSGrid container spacing={1}>
          {/* Header Row */}
          <DJSGrid item xs={12}>
            <DJSCard style={{ backgroundColor: '#f5f5f5', marginBottom: '10px' }}>
              <DJSCardContent style={{ padding: '10px', paddingBottom: '10px !important' }}>
                <DJSGrid container spacing={2} alignItems="center">
                  <DJSGrid item xs={1}>
                    <DJSTypography variant="body2" fontWeight="bold">ID</DJSTypography>
                  </DJSGrid>
                  <DJSGrid item xs={3}>
                    <DJSTypography variant="body2" fontWeight="bold">SPN</DJSTypography>
                  </DJSGrid>
                  <DJSGrid item xs={2}>
                    <DJSTypography variant="body2" fontWeight="bold" align="right">Price ($)</DJSTypography>
                  </DJSGrid>
                  <DJSGrid item xs={2}>
                    <DJSTypography variant="body2" fontWeight="bold" align="right">Change ($)</DJSTypography>
                  </DJSGrid>
                  <DJSGrid item xs={2}>
                    <DJSTypography variant="body2" fontWeight="bold" align="right">Volume</DJSTypography>
                  </DJSGrid>
                  <DJSGrid item xs={2}>
                    <DJSTypography variant="body2" fontWeight="bold">Last Updated</DJSTypography>
                  </DJSGrid>
                </DJSGrid>
              </DJSCardContent>
            </DJSCard>
          </DJSGrid>
          
          {/* Data Rows */}
          {priceData.map((row) => (
            <DJSGrid item xs={12} key={row.id}>
              <DJSCard 
                style={{ cursor: 'context-menu' }}
                onContextMenu={(event) => handleRowClick(event, row)}
              >
                <DJSCardContent style={{ padding: '10px', paddingBottom: '10px !important' }}>
                  <DJSGrid container spacing={2} alignItems="center">
                    <DJSGrid item xs={1}>
                      <DJSTypography variant="body2">{row.id}</DJSTypography>
                    </DJSGrid>
                    <DJSGrid item xs={3}>
                      <DJSTypography variant="body2" fontWeight="medium">
                        {row.spn}
                      </DJSTypography>
                    </DJSGrid>
                    <DJSGrid item xs={2}>
                      <DJSTypography variant="body2" fontWeight="medium" align="right">
                        ${row.price.toFixed(2)}
                      </DJSTypography>
                    </DJSGrid>
                    <DJSGrid item xs={2}>
                      <DJSTypography 
                        variant="body2" 
                        style={{ color: row.change >= 0 ? '#4caf50' : '#f44336' }}
                        fontWeight="medium"
                        align="right"
                      >
                        {row.change >= 0 ? '+' : ''}${row.change.toFixed(2)}
                      </DJSTypography>
                    </DJSGrid>
                    <DJSGrid item xs={2}>
                      <DJSTypography variant="body2" align="right">
                        {row.volume.toLocaleString()}
                      </DJSTypography>
                    </DJSGrid>
                    <DJSGrid item xs={2}>
                      <DJSTypography variant="body2" color="textSecondary">
                        {row.lastUpdated}
                      </DJSTypography>
                    </DJSGrid>
                  </DJSGrid>
                </DJSCardContent>
              </DJSCard>
            </DJSGrid>
          ))}
        </DJSGrid>
      </StyledGridContainer>

      {/* Context Menu */}
      {contextMenu.visible && (
        <DJSMenu
          anchorPosition={{ top: contextMenu.y, left: contextMenu.x }}
          open={contextMenu.visible}
          onClose={handleContextMenuClose}
          anchorReference="anchorPosition"
        >
          <DJSMenuItem onClick={handleShowTimeseries}>
            📈 Show Timeseries
          </DJSMenuItem>
        </DJSMenu>
      )}

      {/* Timeseries Chart */}
      {showChart && timeseriesData.length > 0 && (
        <StyledChartContainer>
          <SimpleLineChart 
            data={timeseriesData}
            title={`Historical Price Chart - ${selectedSPN} (Last 3 Months)`}
          />
        </StyledChartContainer>
      )}

      {/* Instructions */}
      <DJSBox marginTop="20px" padding="15px" backgroundColor="#f9f9f9" borderRadius="8px">
        <DJSTypography variant="body2" color="textSecondary">
          <strong>Instructions:</strong> Right-click on any row in the table above to access the context menu 
          and select "Show Timeseries" to view the 3-month price history chart for that SPN.
        </DJSTypography>
      </DJSBox>
    </StyledContainer>
  );
};

export default PriceData; 