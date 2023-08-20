import { v2 } from 'cloudinary';
import { CLOUDINARY } from 'src/constants/constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'bookeytore',
      api_key: 'Your api key',
      api_secret: 'Your api secret',
    });
  },
};
