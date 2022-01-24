require('dotenv').config()
const stripe = require('stripe')(process.env.PPP_LIVE_STRIPE_KEY);
const express = require('express');
const key = require('./clientKey.js')
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const DOMAIN = process.env.NODE_ENV === 'dev' ? 'http://localhost:4242' : 'https://ppp-checkout.herokuapp.com/'
// const DOMAIN = 'http://localhost:4242'
const healthpreneuerFee = .97; //Stripe charges 2.9% + .30 cents per successful transaction
const calcFee = price => (price * healthpreneuerFee)

app.get('/', function(req, res) {
  res.sendFile(path.join('/public', '/index.html'));
});

app.post('/session', async (req, res) => {
  const client = req.body.client
  const salesRep = req.body.sales
  const data = {...key[client]}

  const price = await stripe.prices.retrieve(
      data.product,
      {stripeAccount: data.account}
  ).catch(error => console.log('PRICE ERROR .... Error:', error))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items:[{
      price: data.product,
      quantity: 1
    }],
    payment_intent_data: {
      application_fee_amount: calcFee(price.unit_amount),
    },
    mode: 'payment',
    success_url: `${DOMAIN}/success.html`,
    cancel_url: `${DOMAIN}/cancel.html`
    // metadata: {'sales-rep': salesRep}
  }, {
    stripeAccount: data.account,
  }).catch(error => console.log('Error:', error))

  return res.redirect(303, session.url);
})

app.listen(process.env.PORT || 4242, () => console.log(`Running at ${process.env.PORT || 'http://localhost:4242'}`))