var smartgrid = require('smart-grid');

var settings = {
  filename: '_smartgrid',
  outputStyle: 'scss', /* less || scss || sass || styl */
  columns: 12, /* number of grid columns */
  offset: '30px', /* gutter width px || % */
  container: {
    maxWidth: '1170px', /* max-width оn very large screen */
    fields: '30px' /* side fields */
  },
  breakPoints: {
    lg: {
      width: "1100px",
      fields: "30px"
    },
    md: {
      width: "992px",
      fields: "30px"
    },
    sm: {
      width: "768px",
      fields: "15px"
    },
    xs: {
      width: "576px",
      fields: "15px"
    },
    xxs: {
      width: "380px",
      fields: "15px"
    }
  },
  properties: [],
  oldSizeStyle: false
};

smartgrid('./source/style/_misc', settings);
