export const Controls = () => {
  return (
    <div className='settings' style='margin-bottom:1.5rem;'>
      <div className='form-panel'>
        <div className='form-panel__item'>
          <div className='form-panel__title'>Gamepad Panel</div>
          <div className='form-panel__desc'>
            <small>Disable & hide the gamepad panel</small>
          </div>
        </div>
        <div className='form-panel__slider'>
          <input type='checkbox' className='toggle-switch' />
        </div>
      </div>
      <hr />
      <div className='two-columns'>
        <div className='form__title'>
          <div style='display:flex;flex-direction:column;row-gap:0.25rem;'>
            <span style='color:var(--c-font-prim);font-weight:500;'>
              Gamepad controls
            </span>
            <small>Assign gamepad buttons to FTP actions</small>
          </div>
        </div>
        <div className='form__content'>
          <div className='form-group' data-before='Backup savegame'>
            <input
              id='input-user'
              placeholder='Press any button'
              type='text'
              className='ifta-field'
            />
            <label for='input-user' className='label-after smaller'>
              Focus the input and press any gamepad button
            </label>
          </div>
          <div className='form-group' data-before='Restore savegame'>
            <input
              id='input-user'
              placeholder='Press any button'
              type='text'
              className='ifta-field'
            />
            <label for='input-user' className='label-after smaller'>
              Focus the input and press any gamepad button
            </label>
          </div>
        </div>
      </div>
      <div className='btn-container-right'>
        <button type='reset' className='btn'>
          Reset
        </button>
        <button type='submit' className='btn'>
          Save
        </button>
      </div>
    </div>
  )
}
