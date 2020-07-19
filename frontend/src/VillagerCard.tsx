import React from 'react';
import './VillagerCard.css';

type VillagerCardProps = {
  villager: {
    id: string,
    name: string,
    image: string,
    personality: string
  },
  wishlist: {
    id: string,
    name: string,
    image: string,
    personality: string
  }[],
  addToWishlist: (villager: {
    id: string,
    name: string,
    image: string,
    personality: string
  }) => void,
  removeFromWishlist: (villager: {
    id: string,
    name: string,
    image: string,
    personality: string
  }) => void,
}

class VillagerCard extends React.PureComponent<VillagerCardProps> {
  constructor(props: VillagerCardProps) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }

  async handleAdd(villager: {
    id: string,
    name: string,
    image: string,
    personality: string
  }) {
    await this.props.addToWishlist(this.props.villager);
  }

  async handleRemove(villager: {
    id: string,
    name: string,
    image: string,
    personality: string
  }) {
    await this.props.removeFromWishlist(this.props.villager);
  }

  render() {
    let { name, image } = this.props.villager;

    let onWishlist = false; 

    if (this.props.wishlist.filter(villager => villager.name === name).length === 1) {
      onWishlist = true;
    } else {
      onWishlist = false;
    }

    let heart = onWishlist ? <i className="fas fa-heart filled-in-heart"
      onClick={() => this.handleRemove(this.props.villager)}
    ></i>
      : <i className="far fa-heart"
        onClick={() => this.handleAdd(this.props.villager)}
      ></i>;

    return (
      <div className="card my-auto">
        <div className="row no-gutters">
          <div className="col-lg-2 d-flex align-items-center justify-content-center">
            <img src={image} className="card-img" alt={`${name}`} />
          </div>
          <div className="col-lg-8 my-auto">
            <div className="card-body text-center">
              {name}
            </div>
          </div>
          <div className="col-lg-2 my-auto">
            <span className="heart-btn">
              {heart}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default VillagerCard;