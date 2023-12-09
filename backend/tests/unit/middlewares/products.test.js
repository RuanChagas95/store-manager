const { expect } = require('chai');
const sinon = require('sinon');

const { validateName, productsExist } = require('../../../src/middlewares/products');
const productsModel = require('../../../src/models/products');

describe('validateName Middleware', function () {
  it('if there are no name return status 400 and a message', async function () {
    const req = { body: { name: '' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    await validateName(req, res, next);
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('if name is not a string return status 400 and a message', async function () {
    const req = { body: { name: 123 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    await validateName(req, res, next);
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('if name length is less than 5 return status 422 and a message', async function () {
    const req = { body: { name: '1234' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    await validateName(req, res, next);
    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('if name is ok call next', async function () {
    const req = { body: { name: '12345' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    await validateName(req, res, next);
    expect(next.called).to.be.equal(true);
  });
  describe('productsExist Middleware', function () {
    afterEach(function () { return sinon.restore(); });
    it('if there are no products return 404 and a "Product not found"', async function () {
      const req = {
        body: [
          { productId: 1, quantity: 1 },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub();
      sinon.stub(productsModel, 'getByIdModel').resolves(null);
      await productsExist(req, res, next);
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      expect(next.notCalled).to.be.equal(true);
    });

    it('if one product broken return 404 and a "Product not found"', async function () {
      const req = {
        body: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 1 },
          { productId: 3, quantity: 1 },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub();
      const getByIdModel = sinon.stub(productsModel, 'getByIdModel');
      getByIdModel.onCall(0).resolves(true);
      getByIdModel.onCall(1).resolves(true);
      getByIdModel.onCall(2).resolves(false);
      await productsExist(req, res, next);
      expect(res.status.calledWith(404)).to.be.equal(true); 
    });
  });
});