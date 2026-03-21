// A-Share Stock Market Data API
// Data source: East Money (东方财富)

export interface Stock {
  code: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  amount: number
  high: number
  low: number
  open: number
  close: number
  turnover: number
  amplitude: number
}

export interface HotSector {
  name: string
  changePercent: number
  leadingStocks: string[]
}

// Format stock code for East Money API
export function formatCode(code: string): string {
  if (code.startsWith('6')) {
    return `1.${code}` // Shanghai
  } else if (code.startsWith('0') || code.startsWith('3')) {
    return `0.${code}` // Shenzhen
  } else if (code.startsWith('8') || code.startsWith('4')) {
    return `0.${code}` // Beijing/New OTC
  } else if (code.startsWith('68')) {
    return `1.${code}` // STAR Market
  }
  return code
}

// Parse East Money stock data
function parseStockData(data: any, code?: string): Stock | null {
  if (!data) return null

  // East Money API field mapping:
  // f12: stock code
  // f14: stock name
  // f43: latest price (÷100)
  // f44: highest price (÷100)
  // f45: lowest price (÷100)
  // f46: open price (÷100)
  // f47: volume (shares)
  // f48: amount (yuan)
  // f57: previous close (÷100)
  // f60: previous close (÷100)
  // f168: turnover rate (÷100)
  // f169: change amount (÷100)
  // f170: change percent (÷100)
  // f171: amplitude (÷100)

  const stockCode = data.f12 || code || ''
  const name = data.f14 || ''
  const price = data.f43 ? data.f43 / 100 : 0
  const prevClose = data.f57 ? data.f57 / 100 : (data.f60 ? data.f60 / 100 : price)
  const change = data.f169 ? data.f169 / 100 : 0
  const changePercent = data.f170 ? data.f170 / 100 : (prevClose > 0 ? (change / prevClose) * 100 : 0)

  // Filter abnormal data
  if (price <= 0 || price > 10000) return null

  return {
    code: stockCode,
    name: name,
    price: price,
    change: change,
    changePercent: changePercent,
    volume: (data.f47 || 0) * 100, // shares
    amount: (data.f48 || 0) * 1000, // yuan
    high: data.f44 ? data.f44 / 100 : price,
    low: data.f45 ? data.f45 / 100 : price,
    open: data.f46 ? data.f46 / 100 : prevClose,
    close: prevClose,
    turnover: data.f168 ? data.f168 / 100 : 0,
    amplitude: data.f171 ? data.f171 / 100 : 0,
  }
}

// Get real-time quote for a single stock
export async function getStockQuote(code: string): Promise<Stock | null> {
  try {
    const secid = formatCode(code)
    const url = `http://push2.eastmoney.com/api/qt/stock/get?secid=${secid}&fields=f43,f44,f45,f46,f47,f48,f57,f58,f60,f169,f170,f171,f168`

    const response = await fetch(url, {
      headers: {
        'Referer': 'http://quote.eastmoney.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (!response.ok) throw new Error('Network response was not ok')

    const data = await response.json()
    return parseStockData(data.data, code)
  } catch (error) {
    console.error(`Failed to get stock ${code} data:`, error)
    return null
  }
}

// Get batch stock quotes
export async function getBatchStocks(codes: string[]): Promise<Stock[]> {
  const batchSize = 5
  const results: Stock[] = []

  for (let i = 0; i < codes.length; i += batchSize) {
    const batch = codes.slice(i, i + batchSize)
    const batchResults = await Promise.all(
      batch.map(code => getStockQuote(code))
    )
    results.push(...batchResults.filter(Boolean) as Stock[])
  }

  return results
}

// Get top gainers
export async function getTopGainers(limit: number = 20): Promise<Stock[]> {
  const hotStocks = [
    '000001', '000002', '000858', '002594', '002475',
    '300059', '300750', '300498', '600036', '600519',
    '600900', '601012', '601318', '601888', '688981',
    '688009', '600276', '000333', '002415', '600309',
    '601166', '600887', '000568', '002714', '300124',
    '601398', '601288', '601988', '600028', '601628',
    '600030', '601668', '601669', '601390', '601857',
    '601088', '601899', '600111', '600048', '601818',
    '601328', '601998', '601169', '600016', '601229',
    '000725', '000766', '600050', '600016', '601166'
  ]

  const stocks = await getBatchStocks(hotStocks.slice(0, limit))
  return stocks.sort((a, b) => b.changePercent - a.changePercent)
}

// Get limit-up stocks (stocks with >= 9.5% gain)
export async function getLimitUpStocks(): Promise<Stock[]> {
  const hotStocks = [
    '000001', '000002', '000858', '002594', '002475',
    '300059', '300750', '300498', '600036', '600519',
    '600900', '601012', '601318', '601888', '688981',
    '688009', '600276', '000333', '002415', '600309',
    '601166', '600887', '000568', '002714', '300124',
  ]

  const stocks = await getBatchStocks(hotStocks)

  return stocks
    .filter(stock => stock.changePercent >= 9.5)
    .sort((a, b) => b.changePercent - a.changePercent)
}

// Get hot sectors
export async function getHotSectors(): Promise<HotSector[]> {
  const hotStocks = await getTopGainers(10)

  const sectorMap = new Map<string, { changePercent: number, count: number }>()

  for (const stock of hotStocks) {
    let sector = '其他'
    if (stock.code.startsWith('688') || stock.code.startsWith('300')) {
      sector = '科技'
    } else if (['600519', '600887', '000858', '000568'].includes(stock.code)) {
      sector = '消费'
    } else if (stock.code.startsWith('000')) {
      sector = '深市主板'
    } else if (stock.code.startsWith('600')) {
      sector = '沪市主板'
    }

    const existing = sectorMap.get(sector) || { changePercent: 0, count: 0 }
    sectorMap.set(sector, {
      changePercent: existing.changePercent + stock.changePercent,
      count: existing.count + 1
    })
  }

  return Array.from(sectorMap.entries())
    .map(([name, data]) => ({
      name,
      changePercent: data.count > 0 ? data.changePercent / data.count : 0,
      leadingStocks: []
    }))
    .sort((a, b) => b.changePercent - a.changePercent)
}

// Get market index data
export async function getMarketIndex(): Promise<{ sh: number; sz: number; cy: number }> {
  try {
    const codes = ['000001', '399001', '399006'] // Shanghai, Shenzhen, ChiNext
    const stocks = await getBatchStocks(codes)

    return {
      sh: stocks.find(s => s.code === '000001')?.changePercent || 0,
      sz: stocks.find(s => s.code === '399001')?.changePercent || 0,
      cy: stocks.find(s => s.code === '399006')?.changePercent || 0,
    }
  } catch (error) {
    console.error('Failed to get market index:', error)
    return { sh: 0, sz: 0, cy: 0 }
  }
}

// Format stock data for display
export function formatStockList(stocks: Stock[], title: string): string {
  if (stocks.length === 0) {
    return `📊 ${title}\n\n暂无数据`
  }

  let output = `📈 ${title}\n\n`

  stocks.slice(0, 20).forEach((stock, index) => {
    const emoji = stock.change >= 0 ? '🟢' : '🔴'
    const arrow = stock.change >= 0 ? '⬆️' : '⬇️'
    output += `${index + 1}. ${stock.name} (${stock.code}) - ¥${stock.price.toFixed(2)} ${arrow} ${stock.changePercent >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%\n`
    output += `   成交量: ${(stock.volume / 10000).toFixed(0)}万手  成交额: ${(stock.amount / 100000000).toFixed(2)}亿  换手: ${stock.turnover.toFixed(2)}%\n\n`
  })

  return output
}

// Format market overview
export function formatMarketOverview(indexData: { sh: number; sz: number; cy: number }): string {
  const shEmoji = indexData.sh >= 0 ? '🟢' : '🔴'
  const szEmoji = indexData.sz >= 0 ? '🟢' : '🔴'
  const cyEmoji = indexData.cy >= 0 ? '🟢' : '🔴'

  return `📊 大盘概览

上证指数: ${shEmoji} ${indexData.sh >= 0 ? '+' : ''}${indexData.sh.toFixed(2)}%
深证成指: ${szEmoji} ${indexData.sz >= 0 ? '+' : ''}${indexData.sz.toFixed(2)}%
创业板指: ${cyEmoji} ${indexData.cy >= 0 ? '+' : ''}${indexData.cy.toFixed(2)}%`
}
