export const Controls = () => {
  return (
    <div className='settings'>
      <div className='form-panel'>
        <div className='form-panel__item'>
          <div className='form-panel__title'>Gamepad Panel</div>
          <div className='form-panel__desc'>
            <small>Disable & hide the gamepad panel</small>
          </div>
        </div>
        <div className='form-panel__element'>
          <input
            type='checkbox'
            className='toggle-switch'
            id='gamepanel-state'
          />
        </div>
      </div>
      <hr />
      <div className='two-columns'>
        <div className='form-panel__item'>
          <div className='form-panel__title'>Gamepad controls</div>
          <div className='form-panel__desc'>
            <small>Assign gamepad buttons to FTP actions</small>
          </div>
        </div>
        <div className='form__content'>
          <div className='form-group' data-before='Backup savegame'>
            <input
              id='input-button-backup'
              placeholder='Press any button'
              type='text'
              className='ifta-field'
            />
            <label for='input-button-backup' className='label-after smaller'>
              Focus the input and press any gamepad button
            </label>
          </div>
          <div className='form-group' data-before='Restore savegame'>
            <input
              id='input-button-restore'
              placeholder='Press any button'
              type='text'
              className='ifta-field'
            />
            <label for='input-button-restore' className='label-after smaller'>
              Focus the input and press any gamepad button
            </label>
          </div>
        </div>
      </div>
      <div className='btn-container-right'>
        <button type='reset' className='btn btn-outline'>
          Reset
        </button>
        <button type='submit' className='btn'>
          Save
        </button>
      </div>
    </div>
  )
}
