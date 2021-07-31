/* eslint-disable no-undef */
const assert = require('assert');

Feature('Canceling Like Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('Showing empty liked restaurants', ({ I }) => {
  I.seeElement('.restaurant-item__not__found');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('Canceling Like A Restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');
  I.seeElement('.restaurant__title a');

  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantTitles = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.restaurant-item');

  const cancelingLikeRestaurantTitles = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(firstRestaurantTitles, cancelingLikeRestaurantTitles);

  I.seeElement('.restaurant__title a');
  await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/like');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});
