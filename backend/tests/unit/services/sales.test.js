const { expect } = require('chai');
const sinon = require('sinon');

const model = require('../../../src/models/sales');

const { getAllService, getByIdService } = require('../../../src/services/sales');

const sales = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 3,
  },
];
describe('sales Service', function () {
  afterEach(function () { return sinon.restore(); });
  it('should return an object with a status 200 and a sales array', async function () {
    sinon.stub(model, 'getAllModel').resolves(sales);

    const result = await getAllService();

    expect(result).to.be.an('object');
    expect(result).to.have.a.property('status', 200);
    expect(result).to.have.a.property('payload');
    expect(result.payload).to.be.an('array');
    expect(result.payload).to.be.deep.equal(sales);
  });

  it('should return an object with a status 200 and a sale array', async function () {
    sinon.stub(model, 'getByIdModel').resolves([sales[0]]);

    const result = await getByIdService(1);

    expect(result).to.be.an('object');
    expect(result).to.have.a.property('status', 200);
    expect(result).to.have.a.property('payload');
    expect(result.payload).to.be.deep.equal([sales[0]]);
  });
});