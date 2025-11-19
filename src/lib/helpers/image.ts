import type { Image } from '../strapi/types';

export const getImageUrl = (locals: App.Locals, image: Image): string => {
  return `${locals.runtime.env.STRAPI_IMAGES_URL}${image.url}`;
};
