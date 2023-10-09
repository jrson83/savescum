import { syntaxHighlight } from '@/utils'
import { Button, Tab, Tabs } from '@shrtcss/react'
import NetworkTab from './network'

const SettingsView: React.FC = () => {
  return (
    <div className="container">
      <div className="heading">
        <h3>Settings</h3>
      </div>
      <Tabs ariaLabel="Settings Tabs">
        <Tab title="Network">
          <NetworkTab />
        </Tab>
        <Tab title="Control">
          <div className="container">Work in progress</div>
        </Tab>
        <Tab title="Debug">
          <div className="containerx">
            <div className="two-columns">
              <div className="form-panel__item">
                <div className="form-panel__title">
                  <code>localStorage</code> data
                </div>
                <div className="form-panel__desc">
                  <small>
                    Debug savescum <code>localStorage</code> data.
                  </small>
                </div>
              </div>
              {/* <div className='textarea' contentEditable={true}>
                {testData}
              </div> */}
              <pre
                contentEditable
                className="fake-textarea"
                // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
                tabIndex={0}
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{
                  __html: syntaxHighlight(
                    JSON.stringify(
                      JSON.parse(
                        localStorage.getItem('savescumstore') ||
                          '{"error":"localStorage","message": "No data available"}'
                      ),
                      undefined,
                      2
                    )
                  ),
                }}
              />
            </div>
          </div>
          <br />
          <div className="containerx">
            <div className="form-panel">
              <div className="form-panel__item">
                <div className="form-panel__title">Reset fetched data</div>
                <div className="form-panel__desc">
                  <small>
                    Reset savescum fetched data to <code>initialState</code>.
                  </small>
                </div>
              </div>
              <div className="form-panel__element">
                <Button color={'warning'}>Reset</Button>
              </div>
            </div>
          </div>
          <br />
          <div className="containerx">
            <div className="form-panel">
              <div className="form-panel__item">
                <div className="form-panel__title">Clear localStorage</div>
                <div className="form-panel__desc">
                  <small>
                    Clear savescum data from Web-Browser{' '}
                    <code>localStorage</code>.
                  </small>
                </div>
              </div>
              <div className="form-panel__element">
                <Button color={'danger'}>Clear</Button>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default SettingsView
