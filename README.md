
# 🚀 Crypto Portfolio Tracker - Backend API  

This is a **Node.js + Express + MongoDB** backend for managing cryptocurrency portfolios, tracking real-time prices, calculating profit & loss (PNL), and setting price alerts.  

It integrates with the **Binance WebSocket API** for live price updates and stores historical data in **MongoDB** for analytics.

---

## 📌 Features  

✅ **User Authentication** (JWT-based authentication)  
✅ **Portfolio Management** (Create, update, delete portfolios)  
✅ **Real-time Crypto Price Updates** (Binance WebSocket)  
✅ **Profit & Loss Calculation** (PNL based on current prices)  
✅ **Price Alerts** (Notify when price crosses a set threshold)  
✅ **MongoDB Storage** (Mongoose ODM for structured data)  

---

## 🛠 Installation  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-repo/crypto-portfolio-tracker.git
cd crypto-portfolio-tracker
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Set Up Environment Variables  
Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/crypto-portfolio
JWT_SECRET=your_secret_key
BINANCE_WS_URL=wss://stream.binance.com:9443/ws
```

### 4️⃣ Start the Server  
```sh
npm start
```

---

## 🔥 API Endpoints  

### 🔐 **Authentication**  

#### 1️⃣ **User Signup**  
`POST /auth/signup`  
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "securepassword"
}
```

#### 2️⃣ **User Login**  
`POST /auth/login`  
```json
{
  "email": "test@example.com",
  "password": "securepassword"
}
```
_Response:_  
```json
{
  "success": true,
  "token": "your_jwt_token"
}
```

---

### 📁 **Portfolio Management**  

#### 3️⃣ **Create Portfolio**  
`POST /portfolio` (JWT required)  
```json
{
  "name": "My Crypto Portfolio",
  "description": "Long-term investments",
  "assets": [
    {
      "symbol": "BTCUSDT",
      "amount": 2,
      "purchasePrice": 45000
    },
    {
      "symbol": "ETHUSDT",
      "amount": 5,
      "purchasePrice": 3000
    }
  ]
}
```

#### 4️⃣ **Get User Portfolios**  
`GET /portfolio` (JWT required)  

#### 5️⃣ **Update Portfolio**  
`PUT /portfolio/:id` (JWT required)  

#### 6️⃣ **Delete Portfolio**  
`DELETE /portfolio/:id` (JWT required)  

---

### 📈 **Real-time Crypto Prices**  

#### 7️⃣ **Get Real-time Crypto Price**  
`GET /crypto-price?symbol=BTCUSDT`  
_Response:_  
```json
{
  "success": true,
  "symbol": "BTCUSDT",
  "price": 46000
}
```

---

### 💰 **Profit & Loss Calculation**  

#### 8️⃣ **Get Portfolio PNL**  
`GET /portfolio/pnl` (JWT required)  
_Response:_  
```json
{
  "success": true,
  "data": [
    {
      "symbol": "BTCUSDT",
      "amount": 2,
      "purchasePrice": 45000,
      "latestPrice": 46000,
      "profitLoss": 2000,
      "profitLossPercentage": "4.44%"
    },
    {
      "symbol": "ETHUSDT",
      "amount": 5,
      "purchasePrice": 3000,
      "latestPrice": 3200,
      "profitLoss": 1000,
      "profitLossPercentage": "6.67%"
    }
  ]
}
```

---

### 🚨 **Price Alerts**  

#### 9️⃣ **Set a Price Alert**  
`POST /price-alert` (JWT required)  
```json
{
  "symbol": "BTCUSDT",
  "targetPrice": 47000,
  "alertType": "above"  // or "below"
}
```

#### 🔟 **Get All Alerts**  
`GET /price-alerts` (JWT required)  

#### 1️⃣1️⃣ **Delete an Alert**  
`DELETE /price-alert/:id` (JWT required)  

---

## 🔗 **External API Integration**  

### ✅ **Binance WebSocket API**  
- Fetches real-time price updates  
- Example WebSocket subscription:  
```json
{
  "method": "SUBSCRIBE",
  "params": ["btcusdt@ticker", "ethusdt@ticker"],
  "id": 1
}
```

### ✅ **MongoDB Storage**  
- **`CryptoPriceHistory`** stores price updates  
- **`Portfolio`** stores user portfolios  
- **`PriceAlerts`** stores alert configurations  

---

## 🔄 **How Price Updates Work?**  

1️⃣ **WebSocket connection to Binance**  
2️⃣ **Listen for price updates**  
3️⃣ **Store the latest price in `CryptoPriceHistory` collection**  
4️⃣ **Update the cache for fast access**  
5️⃣ **Use latest prices to calculate PNL & trigger alerts**  

---

## 🧪 **Testing the API**  

- **Use Postman** or **Thunder Client**  
- **JWT Authentication required** for secured routes  
- **Test real-time updates via WebSocket clients**  

---

## 🤖 **Tech Stack**  

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ORM)  
- **Authentication:** JWT (JSON Web Token)  
- **Real-time Data:** WebSocket (Binance API)  
- **Validation:** Express-validator  
- **Testing:** Postman  

---

## 🛠 **Future Enhancements**  

🔹 **Email & Push Notifications for Price Alerts**  
🔹 **Advanced Analytics & Reports**  
🔹 **Multi-currency Portfolio Support**  
🔹 **Automated Trading Features**  

---

## 📜 License  

This project is licensed under the **MIT License**.

---

## 💡 **Contributions & Feedback**  

💬 Feel free to open issues, suggest improvements, or contribute! 🚀  

---

