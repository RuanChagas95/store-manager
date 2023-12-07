const { expect } = require('chai');
const sinon = require('sinon');

const { verifySales } = require('../../../src/middlewares/sales');

describe('verifySales Middleware', function () {
  afterEach(function () { return sinon.restore(); });
  it('if there are no products return 400 and a "productId" is required', async function () {
    const req = {
      body: [],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    await verifySales(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"productId" is required' })).to.be.equal(true);
  });

  it('if there are no productId return status 400 and a message', async function () {
    const req = {
      body: [
        {},
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    await verifySales(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"productId" is required' })).to.be.equal(true);
  });

  it('if there are no quantity return status 400 and a message', async function () {
    const req = {
      body: [
        { productId: 1 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    await verifySales(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"quantity" is required' })).to.be.equal(true);
  });

  it('if the quantity is less than zero return status 422 and a message', async function () {
    const req = {
      body: [
        { productId: 1, quantity: -1 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    
    await verifySales(req, res, next);
    
    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.be.equal(true);
  });

  it('if quantity is zero return status 422 and a message', async function () {
    const req = {
      body: [
        { productId: 1, quantity: 0 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    
    await verifySales(req, res, next);
    
    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.be.equal(true);
  });

  it('next to be called if all is ok', async function () {
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
    
    await verifySales(req, res, next);
    
    expect(next.calledOnce).to.be.equal(true);
  });
});
