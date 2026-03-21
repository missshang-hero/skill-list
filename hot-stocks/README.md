# Hot Stocks - A股热门股票数据

获取A股市场热门股票数据，包括涨幅排行、涨停股票、板块热点等实时行情信息。

## 功能

- 📈 **涨幅排行** - 获取当日涨幅最大的股票
- 🚀 **涨停股票** - 获取当日涨停的股票列表
- 🔥 **热门板块** - 分析市场热点板块
- 📊 **大盘指数** - 获取上证指数、深证成指、创业板指
- 💰 **个股行情** - 查询指定股票的实时行情

## 安装

```bash
npx skills add missshang-hero/my-skills@hot-stocks
```

## 使用方法

### 获取热门股票

```
User: 获取今日热门股票
Assistant: 使用 get_hot_stocks 工具获取涨幅排行
```

### 查询涨停股票

```
User: 今天有哪些涨停的股票？
Assistant: 使用 get_hot_stocks 工具，type="limit_up"
```

### 查看板块热点

```
User: 今天哪个板块最热门？
Assistant: 使用 get_hot_stocks 工具，type="sectors"
```

### 查询个股

```
User: 查询贵州茅台的股价
Assistant: 使用 get_stock_quote 工具，code="600519"
```

### 大盘概览

```
User: 今天大盘怎么样？
Assistant: 使用 get_market_overview 工具
```

## API 函数

### get_hot_stocks(type, limit)

获取热门股票列表

**参数:**
- `type` (string): 股票类型
  - `"gainers"` - 涨幅排行
  - `"limit_up"` - 涨停股票
  - `"sectors"` - 热门板块
- `limit` (number): 返回数量 (默认: 20)

**返回:** Stock[]

### get_stock_quote(code)

获取单只股票行情

**参数:**
- `code` (string): 股票代码 (如 "600519")

**返回:** Stock

### get_market_overview()

获取大盘概览

**返回:**
```typescript
{
  sh: number,  // 上证指数涨跌幅
  sz: number,  // 深证成指涨跌幅
  cy: number   // 创业板指涨跌幅
}
```

## 数据结构

### Stock

```typescript
{
  code: string          // 股票代码
  name: string          // 股票名称
  price: number         // 当前价格
  change: number        // 涨跌额
  changePercent: number // 涨跌幅%
  volume: number        // 成交量(股)
  amount: number        // 成交额(元)
  high: number          // 最高价
  low: number           // 最低价
  open: number          // 开盘价
  close: number         // 昨收价
  turnover: number      // 换手率%
  amplitude: number     // 振幅%
}
```

## 数据来源

- **数据来源**: 东方财富 (East Money)
- **更新频率**: 实时 (交易时间内)
- **交易时间**: 9:30-11:30, 13:00-15:00 (北京时间)

## 免责声明

- 数据仅供参考，不构成投资建议
- 股市有风险，投资需谨慎
- 实时数据可能存在延迟

## License

MIT
