/* eslint-disable no-new */
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-movies/favorite-restaurant-search-view';
import FavoriteRestaurantPresenter from '../src/scripts/views/pages/liked-movies/favorite-restaurant-presenter';
import LikeRestaurantIdb from '../src/scripts/data/likedrestaurant-idb';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = spyOnAllFunctions(LikeRestaurantIdb);

      new FavoriteRestaurantPresenter({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurants have been liked', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length)
          .toEqual(1);

        done();
      });

      const favoriteRestaurants = spyOnAllFunctions(LikeRestaurantIdb);
      favoriteRestaurants.getAllRestaurant.and.returnValues([]);

      new FavoriteRestaurantPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
        done();
      });

      const favoriteRestaurants = spyOnAllFunctions(LikeRestaurantIdb);
      favoriteRestaurants.getAllRestaurant.and.returnValues([
        {
          id: 11, title: 'A', vote_average: 3, overview: 'Sebuah restaurant A',
        },
        {
          id: 22, title: 'B', vote_average: 4, overview: 'Sebuah restaurant B',
        },
      ]);

      new FavoriteRestaurantPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });
});
