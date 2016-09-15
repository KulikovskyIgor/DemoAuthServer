import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as LoginActions from '../../actions/login';

class Login extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.app.user){
            this.context.router.push('home');
        }
    }

    componentWillUnmount() {
        this.props.actions.CLEAR();
    }

    render() {
        return (
            <div className="grid__container">
                <form action="" method="post" className="form form--login">
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
                        <input type="submit" value="Sign In"
                               onClick={this.handleSignIn}
                        />
                    </div>
                </form>
                {this.props.login.error ?
                    <div className="form__field form__error">
                        <span>{this.props.login.error}</span>
                    </div>
                    : null
                }
                <p className="text--center">Not a member?
                    <a href="#">Sign up now</a>
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
        const {username, password} = this.props.login;
        this.props.actions.LOGIN(username, password);
    }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(store) {
    return {
        app: store.app,
        login: store.login
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(LoginActions, dispatch);
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
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login);