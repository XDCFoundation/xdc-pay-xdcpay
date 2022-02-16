const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')


module.exports = connect(mapStateToProps)(InfoScreen)

function mapStateToProps (state) {
  return {}
}

inherits(InfoScreen, Component)
function InfoScreen () {
  Component.call(this)
}

InfoScreen.prototype.render = function () {
  const state = this.props
  const version = global.platform.getVersion()
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  return (
    h('.flex-column.flex-grow', {
      style: {
        maxWidth: '400px',
      },
    }, [
      
      // subtitle and nav
      h('.section-title.flex-row.flex-center', [
        h('img.cursor-pointer', {
          src: "/images/Assets/BackArrow.svg",
          onClick: (event) => {
            state.dispatch(actions.goHome())
          },
          style: {
            position: 'absolute',
            left: '15px',
          },
        }),
        h('h2', {
          style: {
            fontFamily: 'Inter-Bold',
          }
        }, 'Info/Help'),
      ]),
        
      // main view
      h('.flex-column.flex-justify-center.flex-grow.select-none', [
        h('.flex-space-around', {
          style: {
            padding: '25px 38px',
          },
        }, [
          // current version number
            
          h('.info', [
            h('div', { style: { fontSize: '12px', fontWeight: '600', }, }, 'XDCPay Version'),
            h('div', { style: { color: '#848484', fontSize: '12', }, }, `${version}`),
            h('div', { style: { color: '#848484', width: '300px', height: '45px', textAlign: 'left', fontSize: '12', margin: '36px 0', lineHeight: '14px', }, }, 'The XDCPay is an extension for accessing XDC’s XDPoS enabled distributed applications, or “Dapps” in your browser!'),
          ]),
          h('div', {style:{fontSize:'12',}},[
            h('div', { style: {fontWeight:'600', }, },'Link: '),
            h('div', {
              onClick: () => {
                openInNewTab('https://xinfin.org/privacy')
                
              },
              style: {
                marginBottom: '10px',
                cursor: 'pointer',
                color:'#2049B9',
              },
            }, `Privacy Policy `),
            
          
            // h('div', {
            //   onClick: () => {
            //     openInNewTab('https://github.com/XinFinOrg/XDCPay')
              
            //   },
            //   style: {
            //     marginBottom: '10px',
            //     cursor: 'pointer',
            //     color:'#2049B9',
            //   },
            // }, `Support Center`),
          
        
            h('div', {
              onClick: () => {
                openInNewTab('https://xinfin.org/')
            
              },
              style: {
                marginBottom: '10px',
                cursor: 'pointer',
                color:'#2049B9',
              },
            }, `Visit Our Website`),
        
      
            h('div', {
              onClick: () => {
                openInNewTab('https://xinfin.org/contactus')
              
              },
              style: {
                marginBottom: '10px',
                cursor: 'pointer',
                color:'#2049B9',
              },
            }, `Contact Us `),
          
          ]),

          
        ]),
      
      ]),
    ])
  )
}



InfoScreen.prototype.navigateTo = function (url) {
global.platform.openWindow({ url })
}


            
            
            

