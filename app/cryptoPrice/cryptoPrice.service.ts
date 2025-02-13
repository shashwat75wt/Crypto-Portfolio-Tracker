import WebSocket from "ws";
import { CryptoPriceHistory } from "./cryptoPriceHistory.schema";

const BINANCE_WS_URL = "wss://stream.binance.com:9443/ws";
const priceCache: Record<string, number> = {}; // Store latest prices

/**
 * Initialize Binance WebSocket connection for real-time price updates.
 * @param symbols - An array of cryptocurrency symbols (e.g., ["BTCUSDT", "ETHUSDT"])
 */
export const subscribeToBinancePrice = (symbols: string[]) => {
  const ws = new WebSocket(BINANCE_WS_URL);

  ws.on("open", () => {
    console.log(`WebSocket connected to Binance`);
    
    ws.send(
      JSON.stringify({
        method: "SUBSCRIBE",
        params: symbols.map((s) => `${s.toLowerCase()}@ticker`),
        id: 1,
      })
    );
  });

  ws.on("message", async (data) => {
    try {
      const parsedData = JSON.parse(data.toString());

      if (parsedData.s && parsedData.c) {
        const symbol = parsedData.s.toLowerCase();
        const price = parseFloat(parsedData.c);

        priceCache[symbol] = price; // Store in memory
        await saveCryptoPriceToDB(symbol, price); // Save to MongoDB
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  });

  ws.on("error", (err) => console.error(`WebSocket error: ${err.message}`));
  ws.on("close", () => {
    console.log(`⚠️ WebSocket closed. Reconnecting in 5 seconds...`);
    setTimeout(() => subscribeToBinancePrice(symbols), 5000); // Retry after 5 sec
  });
};

/**
 * Save crypto price to MongoDB.
 * @param symbol - The crypto symbol (e.g., "BTCUSDT").
 * @param price - The latest price.
 */
const saveCryptoPriceToDB = async (symbol: string, price: number) => {
  try {
    await CryptoPriceHistory.create({ symbol, price });
    // console.log(`✅ Saved ${symbol} price: ${price} to MongoDB`);
  } catch (error) {
    console.error("❌ Error saving price to DB:", error);
  }
};

/**
 * Get the latest price from the cache.
 * @param symbol - The crypto symbol (e.g., "BTCUSDT").
 * @returns Latest price or null if not available.
 */
export const getCryptoPriceDetails = (symbol: string) => {
  const lowerSymbol = symbol.toLowerCase();
  return priceCache[lowerSymbol] || null;
};
