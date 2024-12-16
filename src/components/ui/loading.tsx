import { ReactLoading } from '@/libs/react-loading';

export function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <ReactLoading type="spinningBubbles" color={'#1B3D7A'} height={90} width={90} />
    </div>
  );
}
