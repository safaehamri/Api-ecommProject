// src/services/paymentService.js
// Brief: Integrates with Stripe to handle payment processing.
const Stripe = require('stripe');
const keys = require('../config/keys');
const stripe = new Stripe(keys.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (amount, currency = 'usd') => {
  return await stripe.paymentIntents.create({ amount, currency });
};
