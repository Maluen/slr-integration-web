const sites = ['acm', 'ieee', 'scidirect', 'springer'];
const firstYear = 1850;

export default {
  query: {
    defaultValue: '',
    description: 'Query',
    view: 'textarea',
    rows: 10,
    cols: 100,
  },
  sites: {
    defaultValue: sites.join(', '),
    description: 'Sites',
    view: 'select',
    options: sites,
    multiple: true,
  },

  startyear: {
    defaultValue: '',
    description: 'Start Year',
    view: 'yearpicker',
    firstYear,
    none: true,
  },
  endyear: {
    defaultValue: '',
    description: 'End Year',
    view: 'yearpicker',
    firstYear,
    none: true,
  },

  fastoutput: {
    defaultValue: 'false',
    description: 'Use fast output',
    view: 'checkbox',
  },
};
