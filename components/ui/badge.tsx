import Image from "next/image";

type BadgeProps = {
  image: string;
  title: string;
  alt: string;
};

const Badge: React.FC<BadgeProps> = ({ image, title, alt }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 mb-3 bg-muted rounded-full flex items-center justify-center">
        <Image src={image} alt={alt} width={40} height={40} />
      </div>
      <span className="text-sm">{title}</span>
    </div>
  );
};

export default Badge;
