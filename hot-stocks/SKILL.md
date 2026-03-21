---
name: hot-stocks
description: 获取A股市场热门股票数据，包括涨幅排行、涨停股票、板块热点等实时行情信息。
---

# Hot Stocks - A股热门股票数据

## Overview

This skill provides real-time A-share stock market data, including:
- Top gainers (涨幅排行)
- Limit-up stocks (涨停股票)
- Hot sectors (热门板块)
- Dragon head stocks (龙头股)

Data source: East Money (东方财富)

## Tools

### get_hot_stocks

Get the most active stocks in the A-share market.

**Parameters:**
- `type` (string, optional): Type of hot stocks to fetch
  - `"gainers"` - Top gainers (涨幅排行)
  - `"limit_up"` - Limit-up stocks (涨停股票)
  - `"sectors"` - Hot sectors (热门板块)
  - `"dragon"` - Dragon head stocks (龙头股)
- `limit` (number, optional): Number of stocks to return (default: 20, max: 50)

**Returns:**
Array of stock objects with:
- `code` - Stock code (股票代码)
- `name` - Stock name (股票名称)
- `price` - Current price (当前价格)
- `change` - Price change (涨跌额)
- `changePercent` - Change percentage (涨跌幅%)
- `volume` - Trading volume (成交量)
- `amount` - Trading amount (成交额)
- `turnover` - Turnover rate (换手率)

### get_stock_quote

Get real-time quote for a specific stock.

**Parameters:**
- `code` (string, required): Stock code (e.g., "600519", "000001")

**Returns:**
Stock object with detailed quote information.

### get_market_overview

Get overall market overview including index data.

**Returns:**
- `shIndex` - Shanghai Composite Index (上证指数)
- `szIndex` - Shenzhen Component Index (深证成指)
- `cyIndex` - ChiNext Index (创业板指)
- `upCount` - Number of rising stocks (上涨家数)
- `downCount` - Number of falling stocks (下跌家数)

## Usage Examples

### Get top gainers
```
User: 获取今日涨幅最大的股票
Assistant: [Uses get_hot_stocks with type="gainers"]
```

### Get limit-up stocks
```
User: 今天有哪些涨停的股票？
Assistant: [Uses get_hot_stocks with type="limit_up"]
```

### Get hot sectors
```
User: 今天哪个板块最热门？
Assistant: [Uses get_hot_stocks with type="sectors"]
```

### Get specific stock quote
```
User: 查询贵州茅台的股价
Assistant: [Uses get_stock_quote with code="600519"]
```

### Get market overview
```
User: 今天大盘怎么样？
Assistant: [Uses get_market_overview]
```

## Response Format

**For stock lists:**
```
📈 热门股票 (Top Gainers)

1. 股票名称 (CODE) - ¥XX.XX +X.XX% ⬆️
   成交量: XX万手  成交额: XX亿

2. ...
```

**For market overview:**
```
📊 大盘概览

上证指数: XXXX.XX (+X.XX%)
深证成指: XXXX.XX (+X.XX%)
创业板指: XXXX.XX (+X.XX%)

涨跌分布: 涨 XXXX 家 / 跌 XXXX 家
```

## Data Source

- Real-time data from East Money (东方财富)
- Update frequency: Real-time during trading hours
- Trading hours: 9:30-11:30, 13:00-15:00 (Beijing Time)

## Notes

- Data is for reference only, not investment advice
- Market data may have slight delays
- Some stocks may be suspended from trading
