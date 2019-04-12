import Animated from 'animated/lib/targets/react-dom';
import { withView } from 'src/components/View';

export const View = withView(Animated.div, true);

export default Animated;
