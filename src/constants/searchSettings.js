const sites = ['acm', 'ieee', 'scidirect', 'springer'];

export default {
  query: {
    defaultValue: '',
    description: 'Query',
  },
  sites: {
    defaultValue: sites.join(' '),
    description: 'Sites',
  },

  startyear: {
    defaultValue: '',
    description: 'Start Year',
  },
  endyear: {
    defaultValue: '',
    description: 'End Year',
  },

  fastoutput: {
    defaultValue: 'false',
    description: 'Use fast output',
  },
};
