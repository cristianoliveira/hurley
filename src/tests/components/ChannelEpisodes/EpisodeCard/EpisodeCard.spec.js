import React from 'react';
import renderer from 'react-test-renderer';
import { withStore } from 'app/tests/helpers';

import { EpisodeCardList } from 'app/components/EpisodeCard';

describe('EpisodeCardList', () => {
  describe('when has no data', () => {
    it("renders the no episodes", () => {
      const component = renderer.create(<EpisodeCardList />);
      expect(component).toMatchSnapshot();
    })
  });

  describe('when has a list of episodes', () => {
    const state = {
      episodes: [
        {
          uuid: "aadwdadadwawdknaw",
          slug: "pensando-rpg-number-081-entenda-a-figura-do-bruxo-warlock",
          title: "Pensando RPG #081 - Entenda a figura do Bruxo (Warlock)",
          summary: "Neste episódio, falo sobre a figura do Bruxo e a sua respectiva classe em Dungeons & Dragons. Aqui, diferencio-o de outras classes mágicas e dou algumas ideias de jogabilidade e interpretação.",
          description: "Neste episódio, falo sobre a figura do Bruxo e a sua respectiva classe em Dungeons & Dragons. Aqui, diferencio-o de outras classes mágicas e dou algumas ideias de jogabilidade e interpretação.",
          published_at: "2017-08-10T21:58:31+00:00",
          channel: { image_url: 'http://foo/img.svg' },
          audio: {
            url: "http://feeds.soundcloud.com/stream/337354860-user-142845446-pensando-rpg-081-entenda-a-figura-do-bruxo-warlock.mp3",
            size: 12170733,
            duration: 760.633469,
            codec: "mp3",
            bitrate: 128000,
            sample_rate: 44100,
            status: "analysed",
            analysed_at: "2017-08-10T22:17:19+00:00",
            error_message: "",
            error_count: 0
          },
        }
      ]
    }

    it('render the category', () => {
      const component = renderer.create(withStore(<EpisodeCardList {...state} />));
      expect(component).toMatchSnapshot();
    });
  });
})
