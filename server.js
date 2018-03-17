const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

let items = [];
let id = 0;
let title = req.body.name;

app.get('/api/' + title + 'items', (req, res) => {
  // if (req.body.toBeSorted) {
  //   items.sort(reg.body.priority);
  // }
  res.send(items);
});

app.post('/api/' + title + 'items', (req, res) => {
  id = id + 1;
  let item = {id:id, text:req.body.text, date:};
  items.push(item);
  res.send(item);
});

app.put('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items.map(item => { return item.id; });
  let index = itemsMap.indexOf(id);
  let item = items[index];
  item.completed = req.body.completed;
  if (req.body.orderChange) {
    let indexTarget = itemsMap.indexOf(req.body.orderTarget);
    items.splice(index,1);
    items.splice(indexTarget,0,item);
  }
  res.send(item);
});

app.delete('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = items.map(item => { return item.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  items.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3001, () => console.log('Server listening on port 3001!'))
