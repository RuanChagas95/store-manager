const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/products');
const { getAllService, getByIdService, createProductService } = require('../../../src/services/products');

const mockProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

describe('Products services', function () {
  describe('getAllService', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('getAllService returns an object with status and payload keys', async function () {
      sinon.stub(model, 'getAllModel').resolves(mockProducts);
      const response = await getAllService();
      expect(response).to.be.a('object');
      expect(response).to.have.all.keys('status', 'payload');
    });
    
    it('getAllService returns an object with status 200 and payload with all products', async function () {
      expect(getAllService).to.be.a('function');
      sinon.stub(model, 'getAllModel').resolves(mockProducts);
      const response = await getAllService();
      expect(response.status).to.be.equal(200);
      expect(response.payload).to.be.deep.equal(mockProducts);
    });
  });

  describe('getByIdService', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('getByIdService returns an object with status 200 and payload with the product', async function () {
      sinon.stub(model, 'getByIdModel').resolves(mockProducts[0]);
      expect(getByIdService).to.be.a('function');
      const response = await getByIdService();
      expect(response.status).to.be.equal(200);
      expect(response.payload).to.be.deep.equal(mockProducts[0]);
    });
  });

  describe('createProductService', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('createProductService returns an object with status 201 and payload with the product created', async function () {
      const product = {
        name: 'cinto do batman',
        id: 4,
      };
      expect(createProductService).to.be.a('function');
      sinon.stub(model, 'createProductModel').resolves(product);
      const response = await createProductService(product.name);
      expect(response.status).to.be.equal(201);
      expect(response.payload).to.be.equal(product);
    });
  });
});