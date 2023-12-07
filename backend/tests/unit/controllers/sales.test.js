const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../src/controllers/sales');
const service = require('../../../src/services/sales');
const model = require('../../../src/models/sales');

const mockSales = [{ id: 1, productId: 1, quantity: 1 }, { id: 2, productId: 2, quantity: 2 }];

describe('Sales controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('getAllController', async function () {
    sinon.stub(model, 'getAllModel').resolves(mockSales);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await controller.getAllController({}, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(mockSales)).to.be.equal(true);
  });

  it('getByidController send the correct object', async function () {
    const id = '1';
    const req = { params: { id } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, 'getByIdService').resolves({ status: 200, payload: mockSales[0] });
    await controller.getByidController(req, res);
    expect(service.getByIdService.calledWith(id)).to.be.equal(true);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });

  it('createController send the correct object', async function () {
    const sales = [{ productId: 1, quantity: 1 }];
    const req = { body: sales };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, 'createService').resolves({ status: 200, payload: { id: 1, ...sales[0] } });
    await controller.createController(req, res);
    expect(service.createService.calledWith(sales)).to.be.equal(true);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith({ id: 1, ...sales[0] })).to.be.equal(true);
  });
});