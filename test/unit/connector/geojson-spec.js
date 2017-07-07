const {
  expect
} = require('chai');
const {
  DataSet,
  getConnector
} = require('../../../index');
const geoWorld = require('../../fixtures/countries-geo.json');

describe('DataView.source(): geojson', () => {
  const dataSet = new DataSet();
  let dataView;

  beforeEach(() => {
    dataView = dataSet.createView('test');
  });

  it('api', () => {
    expect(getConnector('geo')).to.be.a('function');
    expect(getConnector('geojson')).to.be.a('function');
    expect(getConnector('GeoJSON')).to.be.a('function');
  });

  it('default', () => {
    expect(() => {
      dataView.source(geoWorld, {
        type: 'geo'
      });
    }).to.not.throw();
  });
});
