import { DragToUpload } from '@/components';

import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Hero } from './Hero';

const Base = () => (
  <div className="bg-neutral-50 px-[2vw] pt-5 text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    <DragToUpload />
  </div>
);

export { Base };
