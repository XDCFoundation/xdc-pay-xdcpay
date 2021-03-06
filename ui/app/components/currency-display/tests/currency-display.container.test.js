import assert from 'assert'
import proxyquire from 'proxyquire'

let mapStateToProps, mergeProps

proxyquire('../currency-display.container.js', {
  'react-redux': {
    connect: (ms, md, mp) => {
      mapStateToProps = ms
      mergeProps = mp
      return () => ({})
    },
  },
})

describe('CurrencyDisplay container', () => {
  describe('mapStateToProps()', () => {
    it('should return the correct props', () => {
      const mockState = {
        metamask: {
          conversionRate: 280.45,
          currentCurrency: 'usd',
        },
      }

      assert.deepEqual(mapStateToProps(mockState), {
        conversionRate: 280.45,
        currentCurrency: 'usd',
      })
    })
  })

  describe('mergeProps()', () => {
    it('should return the correct props', () => {
      const mockStateProps = {
        conversionRate: 280.45,
        currentCurrency: 'usd',
      }

      const tests = [
        {
          props: {
            value: '0x2386f26fc10000',
            numberOfDecimals: 2,
            currency: 'usd',
          },
          result: {
            displayValue: '$2.80 USD',
          },
        },
        {
          props: {
            value: '0x2386f26fc10000',
          },
          result: {
            displayValue: '$2.80 USD',
          },
        },
        {
          props: {
            value: '0x1193461d01595930',
            currency: 'ETH',
            numberOfDecimals: 3,
          },
          result: {
            displayValue: '1.266 ETH',
          },
        },
        {
          props: {
            value: '0x1193461d01595930',
            currency: 'ETH',
            numberOfDecimals: 6,
            hideLabel: true,
          },
          result: {
            displayValue: '1.266',
          },
        },
        {
          props: {
            value: '0x3b9aca00',
            currency: 'ETH',
            denomination: 'GWEI',
            hideLabel: true,
          },
          result: {
            displayValue: '1',
          },
        },
        {
          props: {
            value: '0x3b9aca00',
            currency: 'ETH',
            denomination: 'WEI',
            hideLabel: true,
          },
          result: {
            displayValue: '1000000000',
          },
        },
        {
          props: {
            value: '0x3b9aca00',
            currency: 'ETH',
            numberOfDecimals: 100,
            hideLabel: true,
          },
          result: {
            displayValue: '1e-9',
          },
        },
      ]

      tests.forEach(({ props, result }) => {
        assert.deepEqual(mergeProps(mockStateProps, {}, { ...props }), result)
      })
    })
  })
})
