const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const { getAllModel, getByIdModel, createProductModel } = require('../../../src/models/products');

describe('getAllModel Test', function () {
  afterEach(function () { return sinon.restore(); });
  it('return connection products', async function () {
    const mockConnection = sinon.stub(connection, 'execute');
    const mockProducts = [{ id: 1, name: 'product 1' }];
    mockConnection.resolves([mockProducts]);
    const products = await getAllModel();
    expect(products).to.be.deep.equal(mockProducts);
  });

  it('return connection product', async function () {
    const mockConnection = sinon.stub(connection, 'execute');
    const mockProducts = [{ id: 1, name: 'product 1' }];
    mockConnection.resolves([mockProducts]);
    const products = await getByIdModel();
    expect(products).to.be.deep.equal(mockProducts[0]);
  });

  it('createProductModel return id', async function () {
    const mockConnection = sinon.stub(connection, 'execute');
    const name = 'product 1';
    mockConnection.resolves([{ insertId: 1 }]);
    const result = await createProductModel(name);
    expect(result).to.be.deep.equal({ id: 1, name });
  });
});
