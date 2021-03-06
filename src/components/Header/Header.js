import React from 'react';
import { connect } from 'react-redux';

import classes from './Header.module.css';
import mutualClasses from "../../App.module.css";

import { Link } from 'react-router-dom';

import avatar from '../../img/avatr.jpg';

import Scroll from 'react-scroll';

import { withRouter } from 'react-router-dom';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SearchIcon from '@material-ui/icons/Search';

class Header extends React.Component {

    Overlay = React.createRef();

    state = {
        hiddenMenuClasses: [classes.HiddenMenu],
        boxShadow: 'none'
    }

    showHiddenMenu = () => {
        let updatedClasses = this.state.hiddenMenuClasses;
        updatedClasses = [classes.HiddenMenu, classes.ShowHiddenMenu].join(' ')
        this.setState({ hiddenMenuClasses: updatedClasses });
        this.Overlay.current.style.display = 'block';
    }

    closeHiddenMenu = () => {
        let updatedClasses = this.state.hiddenMenuClasses;
        updatedClasses = [classes.HiddenMenu];
        this.setState({ hiddenMenuClasses: updatedClasses });
        this.Overlay.current.style.display = 'none';
    }

    listenScrollEvent = e => {
        if (window.scrollY > 10 && window.innerWidth >= 600) {
            this.setState({ boxShadow: 'rgb(204, 204, 204) 0px 2px 10px' })
        } else {
            this.setState({ boxShadow: 'none' })
        }
    }

    scrollToClothing = () => {
        if (this.props.location.pathname !== "/") {
            this.props.history.push('/');
            setTimeout(() => Scroll.animateScroll.scrollTo(parseInt(this.props.clothes.current.offsetTop - 90)), 500)
        } else Scroll.animateScroll.scrollTo(parseInt(this.props.clothes.current.offsetTop - 90));
    }

    scrollToAccessories = () => {
        if (this.props.location.pathname !== "/") {
            this.props.history.push('/');
            setTimeout(() => Scroll.animateScroll.scrollTo(parseInt(this.props.accessories.current.offsetTop - 90)), 500)
        } else Scroll.animateScroll.scrollTo(parseInt(this.props.accessories.current.offsetTop - 90));
    }

    ifCartNotEmpty = (e) => {
        if (this.props.totCount === 0) {
            e.preventDefault();
        }
    }

    render() {

        let CounterClass = "";

        if (localStorage[('amountOfProducts')] > 0) {
            CounterClass = classes.Counter;
        }

        return (

            <header style={{ boxShadow: this.state.boxShadow }}>

                <div className={[mutualClasses.Container, classes.HeaderWrap].join(' ')}>

                    <div onClick={this.showHiddenMenu} className={classes.Hamb}>
                        <div className={classes.Bar1}></div>
                        <div className={classes.Bar2}></div>
                        <div className={classes.Bar3}></div>
                    </div>

                    <div className={classes.HiddenCart}>

                        <Link onClick={(e) => this.ifCartNotEmpty(e)} to='/checkout'>
                            <ShoppingCartIcon />
                            <span className={CounterClass}>
                                {this.props.totCount > 0 ? this.props.totCount : localStorage[('amountOfProducts')]}
                            </span>
                        </Link>

                        <img className={classes.Avatar} src={avatar} alt="Avatar" />
                    </div>

                    <div className={this.state.hiddenMenuClasses}>

                        <div className={classes.Logo}>
                            <Link onClick={this.closeHiddenMenu} to="/">Shop<span>Lane</span></Link>
                        </div>
                        <nav className={classes.TopMenu}>
                            <ul>
                                <li><Link onClick={() => { this.closeHiddenMenu(); this.scrollToClothing() }} to="/">Clothing</Link></li>
                                <li><Link onClick={() => { this.closeHiddenMenu(); this.scrollToAccessories() }} to="/">Accessories</Link></li>
                            </ul>
                        </nav>

                        <div onClick={this.closeHiddenMenu}>
                            <HighlightOffIcon />
                        </div>

                        <form>
                            <SearchIcon />
                            <input type="search" name="search" placeholder="Search for Clothing and Accessories" />
                        </form>

                    </div>

                    <div className={classes.HeaderLeft}>

                        <div className={classes.Logo}>
                            <Link to="/">Shop<span>Lane</span></Link>
                        </div>
                        <nav className={classes.TopMenu}>
                            <ul>
                                <li><Link onClick={this.scrollToClothing} to="/">Clothing</Link></li>
                                <li><Link onClick={this.scrollToAccessories} to="/">Accessories</Link></li>
                            </ul>
                        </nav>

                    </div>

                    <div className={classes.HeaderRight}>

                        <form>
                            <SearchIcon />
                            <input type="search" name="search" placeholder="Search for Clothing and Accessories" />
                        </form>

                        <div className={classes.Cart}>

                            <Link onClick={(e) => this.ifCartNotEmpty(e)} to='/checkout'>
                                <ShoppingCartIcon />
                                <span className={CounterClass}>
                                    {this.props.totCount > 0 ? this.props.totCount : localStorage[('amountOfProducts')]}
                                </span>
                            </Link>

                            <img className={classes.Avatar} src={avatar} alt="Avatar" />
                        </div>

                    </div>

                </div>

                <div ref={this.Overlay} onClick={this.closeHiddenMenu} className={classes.Overlay}></div>

            </header>

        );

    }
}

const mapGlobalStateToProps = (globalState) => {
    return {
        totCount: globalState.totalCount
    }
}

export default connect(mapGlobalStateToProps)(withRouter(Header));