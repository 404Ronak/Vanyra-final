require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Serve your index.html from the same folder
app.use(express.static(path.join(__dirname)));

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ─── STEP 1: Create Order ───────────────────────────────────────────────────
app.post('/api/create-order', async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;

  // amount comes in rupees from frontend, convert to paise
  const amountInPaise = Math.round(amount * 100);

  if (!amountInPaise || amountInPaise < 100) {
    return res.status(400).json({ error: 'Minimum order amount is ₹1' });
  }

  try {
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency,
      receipt: receipt || `vanyra_${Date.now()}`,
    });

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error('Razorpay create-order error:', err);
    res.status(500).json({ error: 'Could not create order. Try again.' });
  }
});

// ─── STEP 2: Verify Payment ─────────────────────────────────────────────────
app.post('/api/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, error: 'Missing payment fields' });
  }

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    // Payment is genuine
    console.log(`✅ Payment verified: ${razorpay_payment_id}`);
    res.json({ success: true, payment_id: razorpay_payment_id });
  } else {
    // Signature mismatch — do NOT mark as paid
    console.error(`❌ Signature mismatch for order: ${razorpay_order_id}`);
    res.status(400).json({ success: false, error: 'Payment verification failed' });
  }
});

// ─── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🌿 VANYRA server running at http://localhost:${PORT}`);
  console.log(`   Open your browser and go to http://localhost:${PORT}\n`);
});
