import { Row } from '../types';

export function downsample(data: Row[], step = 5): Row[] {
  return data.filter((_, index) => index % step === 0);
}
