const TabTitle = ({ title, icon, children }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
};

export default TabTitle;
