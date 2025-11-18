import type { CustomComponentType } from '../../lib/custom-component/is-custom-component';
import ImageUrl from './custom-components/ImageUrl';

interface Props {
  component: CustomComponentType;
  props: any;
}

export default function CustomComponent({ component, props }: Props) {
  return (
    <>
      {component === 'ImageUrl' && <ImageUrl {...props} />}
    </>
  );
}