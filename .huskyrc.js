module.exports = {
  hooks: {
    'pre-commit': 'yarn lint',
    'pre-commit': 'pretty-quick --staged'
  }
};
