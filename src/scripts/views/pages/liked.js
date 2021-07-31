/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
import LikeRestaurantIdb from '../../data/likedrestaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import FavoriteRestaurantSearchView from './liked-movies/favorite-restaurant-search-view';
import FavoriteRestaurantSearchPresenter from './liked-movies/favorite-restaurant-search-presenter';
import FavoriteRestaurantPresenter from './liked-movies/favorite-restaurant-presenter';

const view = new FavoriteRestaurantSearchView();

const Like = {
  async render() {
    return `
    <div class="content">
            <h2 class="content__heading">Liked Restaurants</h2>
            <div id="restaurants" class="restaurants">

            </div>
        </div>
    `;
  },

  async afterRender() {
    new FavoriteRestaurantPresenter({ view, favoriteRestaurants: LikeRestaurantIdb });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: LikeRestaurantIdb });
  },
};

export default Like;
