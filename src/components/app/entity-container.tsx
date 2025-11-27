type EntityContainerProps = {
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
  children: React.ReactNode;
};

export const EntityContainer = ({
  header,
  search,
  pagination,
  children,
}: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6 min-h-screen">
      <div className="mx-auto max-w-7xl w-full flex flex-col gap-y-8 min-h-full">
        {header}

        <div className="flex flex-col gap-y-4 flex-1">
          {search}
          {children}
        </div>
        {pagination && <div className="pt-2">{pagination}</div>}
      </div>
    </div>
  );
};
