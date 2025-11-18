import type { Image } from "../strapi/types";

export const getImageUrl = (image: Image): string => {
    return `${import.meta.env.STRAPI_IMAGES_URL}${image.url}`;
};
