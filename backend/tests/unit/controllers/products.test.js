const { expect } = require('chai');
const { stub, restore } = require('sinon');
const { getAllController, getByidController, createProductController } = require('../../../src/controllers/products');
const productsService = require('../../../src/services/products');

describe('Products controller', function () {
  describe('getAllController', function () {
    afterEach(function () {
      restore();
    });
    it('getAllController responds with status and payload keys informed by service', async function () {
      const mockReq = {};
      const mockRes = {
        status: stub().returnsThis(),
        json: stub(),
      };
      stub(productsService, 'getAllService').resolves({ status: 'status', payload: 'payload' });
      await getAllController(mockReq, mockRes);
      expect(mockRes.status.calledWith('status')).to.be.equal(true);
      expect(mockRes.json.calledWith('payload')).to.be.equal(true);
    });
  });

  describe('getByidController', function () {
    afterEach(function () {
      restore();
    });
    it('getByidController responds with status and payload keys informed by service', async function () {
      const mockReq = { params: { id: 'id' } };
      const mockRes = {
        status: stub().returnsThis(),
        json: stub(),
      };
      stub(productsService, 'getByIdService').resolves({ status: 'status', payload: 'payload' });
      await getByidController(mockReq, mockRes);
      expect(mockRes.status.calledWith('status')).to.be.equal(true);
      expect(mockRes.json.calledWith('payload')).to.be.equal(true);
    });
  });

  describe('createProductController', function () {
    afterEach(function () {
      restore();
    });
    it('createProductController responds with status and payload keys informed by service', async function () {
      const mockReq = { body: { name: 'name' } };
      const mockRes = {
        status: stub().returnsThis(),
        json: stub(),
      };
      stub(productsService, 'createProductService').resolves({ status: 'status', payload: 'payload' });
      await createProductController(mockReq, mockRes);
      expect(mockRes.status.calledWith('status')).to.be.equal(true);
      expect(mockRes.json.calledWith('payload')).to.be.equal(true);
    });
  });
});