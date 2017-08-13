import React from 'react';
import renderer from 'react-test-renderer';
import { withStore } from 'app/tests/helpers';

import { Channel } from 'app/pages/channel';

describe('Channel', () => {
  describe('when has no data', () => {
    it("renders the no episode", () => {
      const component = renderer.create(withStore(<Channel />));
      expect(component).toMatchSnapshot();
    })
  });

  describe('when has a list of channels', () => {
    const state = {
      channels: [
        {
          uuid: "asdasdadasda",
          slug: "pensando-rpg",
          title: "Pensando RPG",
          description: "",
          feed_url: "http://feeds.soundcloud.com/users/soundcloud:users:257525576/sounds.rss",
          image_url: "https://img.feedcast.io/http%3A%2F%2Fi.imgur.com%2FmYRfJk7.png/300/300",
          listed: true,
          synchronization_status: "success",
          synchronization_status_message: "",
          categories: [],
        }
      ],
      page: 1,
      perPage: 130,
      total: 1000,
    }

    it('render the channels', () => {
      const component = renderer.create(withStore(<Channel {...state} />));
      expect(component).toMatchSnapshot();
    });
  });
})
