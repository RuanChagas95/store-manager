const { expect } = require('chai');
const sinon = require('sinon');

const model = require('../../../src/models/sales');

const { getAllService, getByIdService, createService } = require('../../../src/services/sales');

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
  it('GetAllService should return an object with a status 200 and a sales array', async function () {
    sinon.stub(model, 'getAllModel').resolves(sales);

    const result = await getAllService();

    expect(result).to.be.an('object');
    expect(result).to.have.a.property('status', 200);
    expect(result).to.have.a.property('payload');
    expect(result.payload).to.be.an('array');
    expect(result.payload).to.be.deep.equal(sales);
  });

  describe('getByIdService', function () {
    it('should return an object with a status 200 and a sale array', async function () {
      sinon.stub(model, 'getByIdModel').resolves([sales[0]]);
      
      const result = await getByIdService(1);
      
      expect(result).to.be.an('object');
      expect(result).to.have.a.property('status', 200);
      expect(result).to.have.a.property('payload');
      expect(result.payload).to.be.deep.equal([sales[0]]);
    });

    it('should return an object with a status 404 and a message', async function () {
      sinon.stub(model, 'getByIdModel').resolves([]);
      
      const result = await getByIdService(1);
      
      expect(result).to.be.an('object');
      expect(result).to.have.a.property('status', 404);
      expect(result).to.have.a.property('payload');
      expect(result.payload).to.be.deep.equal({ message: 'Sale not found' });
    });
  });

  describe('createService', function () {
    it('should return an object with a status 201 and a sale array', async function () {
      sinon.stub(model, 'createSaleModel').resolves(1);
      sinon.stub(model, 'addProductModel').resolves();
      
      const result = await createService(sales);
      
      expect(result).to.be.an('object');
      expect(result).to.have.a.property('status', 201);
      expect(result).to.have.a.property('payload');
      expect(result.payload).to.be.deep.equal({ id: 1, itemsSold: sales });
      expect(model.createSaleModel.calledOnce).to.be.equal(true);
      expect(model.addProductModel.calledTwice).to.be.equal(true);
    });
  });
});