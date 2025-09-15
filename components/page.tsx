export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-2xl mx-auto space-y-4">{children}</div>;
}

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
