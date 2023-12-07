const ArrayPlus = require('../../utils/arrayPlus');

const msgs = {
  productId: '"productId" is required',
  quantity: '"quantity" is required',
  quantityLess: '"quantity" must be greater than or equal to 1',
};

const checks422 = new ArrayPlus(
  (sale) => (Number.isInteger(sale.quantity) ? null : msgs.quantity),
  (sale) => (sale.quantity >= 1 ? null : msgs.quantityLess),
);
const checks400 = new ArrayPlus(
  (sale) => (sale.productId ? null : msgs.productId),
  (sale) => (!sale.quantity && sale.quantity !== 0 ? msgs.quantity : null),
);

const verifySales = async (req, res, next) => {
  const sales = new ArrayPlus(...req.body);
  if (!sales.length) {
    return res.status(400).json({ message: msgs.productId });
  }

  const InvalidMsg400 = sales.first(
    (sale) => checks400.first((check) => check(sale)),
  );
  if (InvalidMsg400) return res.status(400).json({ message: InvalidMsg400 });
  const InvalidMsg422 = sales.first(
    (sale) => checks422.first((check) => check(sale)),
  );
  if (InvalidMsg422) return res.status(422).json({ message: InvalidMsg422 });
  next();
};

module.exports = { verifySales };