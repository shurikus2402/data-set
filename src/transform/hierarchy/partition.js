const assign = require('lodash/assign');
const d3Hierarchy = require('d3-hierarchy');
const each = require('lodash/each');
const indexOf = require('lodash/indexOf');
const isArray = require('lodash/isArray');
const {
  HIERARCHY,
  registerTransform
} = require('../../data-set');

const DEFAULT_OPTIONS = {
  field: 'value',
  size: [ 1, 1 ], // width, height
  round: false,
  // ratio: 1.618033988749895, // golden ratio
  padding: 0,
  sort: true,
  as: [ 'x', 'y' ]
};

function transform(dataView, options) {
  if (dataView.dataType !== HIERARCHY) {
    throw new TypeError('This transform is for Hierarchy data only');
  }
  const root = dataView.root;
  options = assign({}, DEFAULT_OPTIONS, options);

  const as = options.as;
  if (!isArray(as) || as.length !== 2) {
    throw new TypeError('Invalid option: as');
  }

  if (options.field) {
    root.sum(d => d[options.field]);
  }

  const partitionLayout = d3Hierarchy.partition();
  partitionLayout
    .size(options.size)
    .round(options.round)
    .padding(options.padding);
  partitionLayout(root);

  /*
   * points:
   *   3  2
   *   0  1
   */
  const x = as[0];
  const y = as[1];
  root.each(node => {
    node[x] = [ node.x0, node.x1, node.x1, node.x0 ];
    node[y] = [ node.y1, node.y1, node.y0, node.y0 ];
    each([ 'x0', 'x1', 'y0', 'y1' ], prop => {
      if (indexOf(as, prop) === -1) {
        delete node[prop];
      }
    });
  });
}

registerTransform('hierarchy.partition', transform);
registerTransform('adjacency', transform);