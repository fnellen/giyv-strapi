import type { Schema, Attribute } from '@strapi/strapi';

export interface SocialsInstagramPost extends Schema.Component {
  collectionName: 'components_socials_instagram_posts';
  info: {
    displayName: 'Instagram Post';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    caption: Attribute.Blocks;
  };
}

export interface SocialsSocials extends Schema.Component {
  collectionName: 'components_socials_socials';
  info: {
    displayName: 'Social-Platform';
    icon: 'thumbUp';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    platform: Attribute.Enumeration<
      ['instagram', 'facebook', 'linked-in', 'twitter / x']
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'socials.instagram-post': SocialsInstagramPost;
      'socials.socials': SocialsSocials;
    }
  }
}
