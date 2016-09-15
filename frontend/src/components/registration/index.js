import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as RegistrationActions from '../../actions/registration';

class Registration extends Component {

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.actions.CLEAR();
    }

    render() {
        return (
            <div className="grid__container">
                <form action="" method="post" className="form form--registration">
                    <div className="form__field">
                        <label className="fontawesome-user" htmlFor="login__username">
                            <span className="hidden">Username</span>
                        </label>
                        <input id="login__username" type="text" className="form__input" placeholder="Username"
                               required
                               onChange={this.handleChangeUsername}
                        />
                    </div>
                    <div className="form__field">
                        <label className="fontawesome-lock" htmlFor="login__password">
                            <span className="hidden">Password</span>
                        </label>
                        <input id="login__password" type="password" className="form__input" placeholder="Password"
                               required
                               onChange={this.handleChangePassword}
                        />
                    </div>
                    <div className="form__field">
                        <input type="submit" value="Sign Up"
                               onClick={this.handleSignUp}
                        />
                    </div>
                </form>
                {this.props.registration.isRegistered ?
                    <div className="form__field form__success">
                        <span>You are successfully registered. Please Sign In.</span>
                    </div>
                    : null
                }
                <p className="text--center">
                    <a href="#"
                       onClick={this.handleSignIn}
                    >
                        Go to Sign in
                    </a>
                    <span className="fontawesome-arrow-right"></span>
                </p>
            </div>
        );
    }

    handleChangeUsername = (e) => {
        this.props.actions.SET_USERNAME(e.target.value);
    }

    handleChangePassword = (e) => {
        this.props.actions.SET_PASSWORD(e.target.value);
    }

    handleSignIn = (e) => {
        e.preventDefault();
        this.context.router.push('login');
    }

    handleSignUp = (e) => {
        e.preventDefault();
        const {username, password} = this.props.registration;
        this.props.actions.REGISTER(username, password);
    }
}

Registration.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(store) {
    return {
        app: store.app,
        registration: store.registration
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(RegistrationActions, dispatch);
}
function mergeProps(mapState, mapDispatch, ownProps) {
    return {
        ...mapState,
        ...ownProps,
        actions: {
            ...mapDispatch
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Registration);