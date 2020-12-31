import React, { Component } from 'react'
import { FormField, Navigation } from '../Component'
import loadingGif from '../Assets/Image/gif/loading-arrow.gif';

class Support extends Component{
    constructor(props){
        super(props);
        this.state = {
            emailto: '',
            ccb: '',
            subject: '',
            supportMessage: '',
            password: '',
            redirect: false,
            message: '',
            error: false,
            warning: false,
            processing: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            message: '',
            warning: false,
            error: false,
            processing: false,
            [e.target.name] : e.target.value
        })
        //console.log("coming here")
    }
    render(){
        const statusClass = this.state.error !== false ? 'message error' : 'message' || this.state.warning ? "message waring" : "message";
        const {emailto, ccb, subject, supportMessage} = this.state;
        return (
            <>
            <Navigation />
            <div className="container support-page-containr">
                <div className="container-inner small">
                    <div className="support contents-wrap">
                        <h2 class="title">Support</h2>
                        <form>
                            <FormField type="email" label="To" placeholder="Email" name="emailto"  required={true} onChange={this.handleChange} value={emailto} />
                            <FormField type="email" label="Cc/Bcc:" placeholder="Cc/Bcc Email" name="ccb"  required={true} onChange={this.handleChange} value={ccb} />
                            <FormField type="text" label="Subject:" placeholder="Enter subject" name="subject"  required={true} onChange={this.handleChange} value={subject} />
                            <label>
                                <p>Message</p>
                                <div className="form-field message-wrap">
                                    <textarea name="supportMessage" value={supportMessage} onChange={this.handleChange} placeholder="Message"></textarea>
                                </div>
                            </label>
                            <button className="btn btn-primary">Submit</button>
                        </form>
                        { this.state.message !== '' ?
                        <p className={statusClass}>{this.state.processing ? (<img src={loadingGif} alt="Loading gif" />) : ''} {this.state.message}</p> : null}
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Support;
