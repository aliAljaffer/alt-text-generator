export const Title = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold text-gray-100">{title}</h1>
      <p className="text-gray-400 text-lg">{subtitle}</p>
    </div>
  );
};
