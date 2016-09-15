import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as HomeActions from '../../actions/home';
import * as AppConstants from '../../constants/app';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="grid__container">
                <form action="" method="post" className="form form--home">
                    <div className="form__field">
                        <label className="fontawesome-user">
                            <span className="hidden">Username</span>
                        </label>
                        <div className="user-name">
                            {this.props.app.user ? this.props.app.user.username : 'There is no user!'}
                        </div>
                    </div>
                    {this.renderUserStatus()}
                    <div className="form__field online">
                        <input type="submit" value="Check online"
                               onClick={this.checkOnline}
                        />
                    </div>
                    <div className="form__field">
                        <input type="submit" value="Go to Sign In"
                               onClick={this.handleSignIn}
                        />
                    </div>
                    <div className="form__field">
                        <input type="submit" value="Go to Sign Up"
                               onClick={this.handleSignUp}
                        />
                    </div>
                    <div className="form__field logout">
                        <input type="submit" value="LOGOUT"
                               onClick={this.handleLogout}
                        />
                    </div>
                </form>
            </div>
        );
    }

    renderUserStatus = () => {
        console.log('this.props.app.status',this.props.app.status);
        switch (this.props.app.status){
            case AppConstants.USER_STATUS_ONLINE:
                return (
                    <div className="form__field">
                        <div className="user-status online">
                            You are online!
                        </div>
                    </div>
                );
            case AppConstants.USER_STATUS_OFFLINE:
                return (
                    <div className="form__field">
                        <div className="user-status offline">
                            You are offline!
                        </div>
                    </div>
                );
            default: return null;
        }
    }

    checkOnline = (e) => {
        e.preventDefault();
        this.props.actions.CHECK_ONLINE();
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.actions.LOGOUT();
    }

    handleSignIn = (e) => {
        e.preventDefault();
        this.context.router.push('login');
    }

    handleSignUp = (e) => {
        e.preventDefault();
        this.context.router.push('registration');
    }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(store) {
    return {
        app: store.app
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(HomeActions, dispatch);
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
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home);