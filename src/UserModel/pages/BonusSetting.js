import React from 'react'
import '../../css/BonusSetting.css'
const BonusSetting = () => {
    return (
        <>
            <div className='bonus_setting'>
                <div className='bonus_card'>
                    <div className='bonus_heading'>
                        <p>Bonus application setting</p>
                    </div>
                    <div className="bonuscheck">
                        <div className='bonuscheckbox'>
                            <input className="bounus_check_box" type="checkbox" defaultValue id="flexCheckChecked" />

                        </div>
                        <div className='bonuscheckbox_label'>
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                Apply further bonuses automatically
                            </label>
                        </div>
                    </div>
                    <hr />

                    <div className='bonus_check_setting_buttons'>
                        <div className='bonus_save d-grid'>
                            <button className='btn btn-secondary'>Back to Personal area</button>
                        </div>&nbsp;&nbsp;
                        <div className='bonus_save d-grid'>
                            <button className='btn btn-primary'>Save</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default BonusSetting