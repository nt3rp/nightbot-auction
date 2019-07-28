const express = require('express');
const app = express();
const port = 3000;

let topBid = -1.0;
let topBidder = undefined;

app.get('/auction/', (req, res) => {
  return res.send(`Top bidder is ${topBidder}: $${topBid}CAD`);
});

app.get('/auction/:user', (req, res) => {
  const user = req.params.user;
  if (!user) {
    return res.send(`Need to supply a user.`);
  }

  const bid = parseFloat(req.query.bid) || -1;
  if (bid <= 0) {
    return res.send(`Need to supply a bid for ${user}.`);
  }

  // TODO: Come up with a better way to track bids, or invalidate bad bids.
  console.log(`${(new Date()).toISOString()}: ${user} bid $${bid} CAD`);
  if (bid <= topBid) {
    return res.send(`Sorry, you've been outbid by ${topBidder}: ${topBid}`);
  } else {
    topBid = bid;
    topBidder = user;
    return res.send(`You are the top bidder: $${topBid}CAD`)
  }
});

app.listen(port, () => console.log(`Auction bot listening on port ${port}!`));
