const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const PORT = 3001;
const DB_FILE = "db.json";

const server = jsonServer.create();
const router = jsonServer.router(DB_FILE);
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);

// --- Request logger ---
server.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method.padEnd(6, " ");
  console.log(`[${timestamp}] ${method} ${req.url}`);

  res.setHeader("X-API-Version", "1.0.0");
  res.setHeader("X-Powered-By", "EsApp-API");
  next();
});

// --- Simulated network latency ---
server.use((req, res, next) => {
  const latency = 200 + Math.random() * 300;
  setTimeout(() => {
    res.setHeader("X-Response-Time", `${Math.round(latency)}ms`);
    next();
  }, latency);
});

// --- Bill payment validation ---
server.use((req, res, next) => {
  if (
    (req.method === "PATCH" || req.method === "PUT") &&
    req.url.includes("/bills/")
  ) {
    const db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    const billId = req.url.split("/bills/")[1].split("?")[0];
    const bill = db.bills.find((b) => b.id === billId);

    if (!bill) {
      return res.status(404).json({
        error: "Bill not found",
        message: `No se encontró la factura con ID: ${billId}`,
        timestamp: new Date().toISOString(),
      });
    }

    if (bill.status === "paid" && req.body.status === "paid") {
      return res.status(400).json({
        error: "Bill already paid",
        message: "Esta factura ya ha sido pagada anteriormente",
        billId: bill.id,
        paidAt: bill.paidAt,
        timestamp: new Date().toISOString(),
      });
    }

    if (req.body.status === "paid" && bill.status !== "paid") {
      req.body.paidAt = new Date().toISOString();
      req.body.paymentMethod = req.body.paymentMethod || "qr_transfer";
      req.body.transactionId = req.body.transactionId || `TRX-${Date.now()}`;
      console.log(
        `[PAYMENT] Bill ${billId} paid | Amount: ${bill.amount} ${bill.currency}`
      );
    }
  }
  next();
});

// --- Health check ---
server.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "EsApp Mock API",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// --- Pending bills by customer ---
server.get("/customers/:customerId/bills/pending", (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  const { customerId } = req.params;

  const pending = db.bills.filter(
    (b) => b.customerId === customerId && b.status === "pending"
  );
  res.json({
    customerId,
    totalPending: pending.length,
    totalAmount: pending.reduce((sum, bill) => sum + bill.amount, 0),
    bills: pending,
  });
});

// --- Customer summary ---
server.get("/customers/:customerId/summary", (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  const { customerId } = req.params;

  const customer = db.customers.find((c) => c.id === customerId);
  if (!customer) {
    return res.status(404).json({
      error: "Customer not found",
      message: `No se encontró el cliente con ID: ${customerId}`,
    });
  }

  const bills = db.bills.filter((b) => b.customerId === customerId);
  const summary = {
    totalBills: bills.length,
    pending: bills.filter((b) => b.status === "pending").length,
    paid: bills.filter((b) => b.status === "paid").length,
    overdue: bills.filter((b) => b.status === "overdue").length,
    totalPendingAmount: bills
      .filter((b) => b.status === "pending")
      .reduce((s, b) => s + b.amount, 0),
    totalPaidAmount: bills
      .filter((b) => b.status === "paid")
      .reduce((s, b) => s + b.amount, 0),
  };

  res.json({ customer, summary, bills });
});

// --- Middleware & router ---
server.use(middlewares);
server.use(router);

// --- Error handler ---
server.use((err, req, res, next) => {
  console.error("[ERROR]", err.message);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// --- Start server ---
server.listen(PORT, () => {
  console.log(`\n Mock API running on http://localhost:${PORT}`);
});
