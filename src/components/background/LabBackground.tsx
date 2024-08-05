import Image from "next/image";

export interface ILabBackgroundProps {
  topLeftLeaf: boolean;
  topRightLeaf: boolean;
}

export default function LabBackground({
  topLeftLeaf,
  topRightLeaf,
}: ILabBackgroundProps) {
  return (
    <div className="w-full h-full absolute inset-0  z-[-1]">
      {topLeftLeaf && (
        <Image
          className="absolute top-0 left-0"
          src="/assets/lab/leaf-left.svg"
          alt="lab"
          width={174}
          height={160}
        />
      )}
      {topRightLeaf && (
        <Image
          className="absolute top-0 right-0"
          src="/assets/lab/leaf-right.svg"
          alt="lab"
          width={186}
          height={171}
        />
      )}
    </div>
  );
}
