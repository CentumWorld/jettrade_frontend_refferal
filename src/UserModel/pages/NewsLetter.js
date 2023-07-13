import React from 'react'
import '../../css/NewsLetter.css'

const NewsLetter = () => {
    return (
        <>
            <div className='newsletter'>
                <div className='news_cards'>
                    <div className='news_heading'>
                        <p>Subscribe to newsletters</p>
                    </div>
                    <div className='news_para'>
                        <p>You can subscribe or unsubscribe to our newsletters and promotional emails here</p>
                    </div>
                    <div className='row subscription_form'>
                        <div className='col-md-4'>
                            <div className='head_name'>
                                <p>Newsletter subscription</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='subscription'>
                                <select class="form-select">
                                    <option value="">Enabled</option>
                                    <option value="">Disabled</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='head_name'>
                                <p>Daily MT reports subscription</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='subscription'>
                                <select class="form-select">
                                    <option value="">Enabled</option>
                                    <option value="">Disabled</option>
                                </select>
                            </div>
                        </div>
                    </div>

                   <div className='news_letter'>
                        <div className='back_to_dashboard'>
                            <button className='btn btn-secondary'>Back to Personal area</button>
                        </div>
                        <div className='newslatter_save'>
                            <button className='btn btn-primary'>Save</button>
                        </div>
                   </div>

                </div>
            </div>
        </>
    )
}

export default NewsLetter

                    // <div className='newsletter_subscription'>
                    //    <div className='head_name'>
                    //         <p>Newsletter subscription</p>
                    //    </div>
                    //    <div className='form-group'>
                    //         <select name="" id="">
                    //             <option value="">Enabled</option>
                    //             <option value="">Disabled</option>
                    //         </select>
                    //    </div>
                    // </div>      

