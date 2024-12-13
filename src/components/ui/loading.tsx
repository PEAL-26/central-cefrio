import { ReactLoading } from "@/libs/react-loading";

export function Loading() {
  return (
    <div className="flex-1 flex justify-center items-center">
      <ReactLoading
        type="spinningBubbles"
        color={"#1B3D7A"}
        height={90}
        width={90}
      />
    </div>
  );
}
