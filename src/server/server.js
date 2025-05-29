const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const path = require('path');

const app = express();
const { cards } = require('../../mock/cards.json');

app.use(cors());

// Serve Angular static files
app.use(express.static(path.join(__dirname, '../../dist/bn-pokedex')));

app.get('/api/cards', (req, res) => {
  const { name, type, limit = 20 } = req.query;
  if (_.every([name, type], item => item === undefined)) {
    return res.json({ cards: cards.slice(0, limit) });
  }
  res.json({
    cards: _.filter(cards, card => {
      const nameQuery = _.toUpper(_.get(req, 'query.name', ''));
      const typeQuery = _.toUpper(_.get(req, 'query.type', ''));
      const checkName = _.includes(_.toUpper(card.name), nameQuery);
      const checkType = _.includes(_.toUpper(card.type), typeQuery);
      return checkName && checkType;
    }),
  });
});

// สำหรับ routing ของ Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/bn-pokedex/index.html'));
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
