import React from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import wishlistApi from './wishlistApi';
import Routes from './Routes';
import ReactGA from 'react-ga';
import './App.css';

ReactGA.initialize('UA-151524212-3');
ReactGA.pageview('/homepage');

type appState = {
  wishlist: {
    id: string,
    name: string,
    image: string,
    personality: string
  }[],
  villagers: {
    id: string,
    name: string,
    image: string,
    personality: string
  }[];
}

class App extends React.PureComponent<{}, appState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      wishlist: [],
      villagers: []
    };
    this.filterVillagers = this.filterVillagers.bind(this);
    this.returnVillagersSearch = this.returnVillagersSearch.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.removeFromWishlist = this.removeFromWishlist.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  async componentDidMount() {
    let wake = await wishlistApi.wakeBackend();
    console.log(wake);

    ($('[data-toggle="tooltip"]') as any).tooltip();
  }

  async filterVillagers(personalities: string[], species: string[]) {
    let result = await wishlistApi.filterVillagers(
      personalities, species);
    this.setState({ villagers: result });
  }

  returnVillagersSearch(newVillagers: {
    id: string,
    name: string,
    image: string,
    personality: string
  }[]) {
    this.setState({ villagers: newVillagers });
  }

  addToWishlist(villager: {
    id: string,
    name: string,
    image: string,
    personality: string
  }) {
    this.setState({ wishlist: [...this.state.wishlist, villager] });
  }

  removeFromWishlist(villager: {
    id: string,
    name: string,
    image: string,
    personality: string
  }) {
    this.setState({ wishlist: this.state.wishlist.filter(v => v.name !== villager.name) });
  }

  goHome() {
    this.setState({ villagers: [] });
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div className="container-fluid">
            <div className="row float-right">
              <div className="col about-link-col">
                <Link to="/about">
                  <img
                    data-toggle="tooltip" data-placement="top" title="About"
                    className="about-btn"
                    src="https://cdn.discordapp.com/attachments/709285942430531650/734388307949125742/balloon-present.png"
                    alt=""
                  ></img>
                </Link>
              </div>
            </div>
          </div>
          <div className="App container-fluid">
              <Routes
                villagers={this.state.villagers}
                wishlist={this.state.wishlist}
                returnVillagersSearch={this.returnVillagersSearch}
                addToWishlist={this.addToWishlist}
                removeFromWishlist={this.removeFromWishlist}
                filterVillagers={this.filterVillagers}
                goHome={this.goHome} />
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
