module.exports = {
  theme: {},
  variants: {},
  plugins: [],
  purge: {
    enabled: process.env.NODE_EN === 'production',
    content: ['src/components/**/*.tsx', 'src/pages/**/*.tsx'],
  },
}
