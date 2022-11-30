const express = require("express");
const cors = require("cors");
const devices = require("./products.json");

const app = express();
const PORT = 3001;

function filterDevices(products, query) {
  let filteredProducts = products;

  if(query.type == '') return filteredProducts
  if(query.type) filteredProducts = filteredProducts.filter((product) => query.type.includes(product.type));

  if(query.brand) filteredProducts = filteredProducts.filter((product) => query.brand.includes(product.brand.toLowerCase()));

  if(query.cpu) filteredProducts = filteredProducts.filter(product => query.cpu.includes(product.charcs['CPU'].toLowerCase()))

  if(query.ram) filteredProducts = filteredProducts.filter(product => query.ram.toString().includes(product.charcs['RAM']))

  if(query.storage) filteredProducts = filteredProducts.filter(product => query.storage.toString().includes(product.charcs['Storage']))

  if(query.display) filteredProducts = filteredProducts.filter(product => query.display.includes(product.charcs['Display'].toLowerCase()))

  if(query.resistance) filteredProducts = filteredProducts.filter(product => query.resistance.toString().includes(product.charcs['Resistance']))

  if(query.sensitivity) filteredProducts = filteredProducts.filter(product => query.sensitivity.toString().includes(product.charcs['Sensitivity']))

  if(query.keys) filteredProducts = filteredProducts.filter(product => query.keys.toString().includes(product.charcs['Keys']))

  if(query.connection) filteredProducts = filteredProducts.filter(product => query.connection.includes(product.charcs['Connection']))

  if(query.resolution) filteredProducts = filteredProducts.filter(product => query.resolution.includes(product.charcs['Resolution']))

  if (query.startCost || query.finalCost) {
    if (!query.startCost) query.startCost = 0;
    if (!query.finalCost) query.finaltCost = Infinity;
    filteredProducts = filteredProducts.filter((product) => product.cost >= query.startCost && product.cost <= query.finalCost);
  }

  return filteredProducts;
}

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
app.use(cors());
app.get("/products", (req, res) => {
  console.log(req.query);
  res.send(filterDevices(devices, req.query));
});
