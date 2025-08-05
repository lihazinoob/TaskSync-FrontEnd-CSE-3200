const CompanyCard = ({ company, onCardClick }) => {
  const {
    logo,
    name,
    status,
    description,
    tags,
    foundedYear,
    employeeRange,
    valuation,
  } = company;

  return (
    <div
      className="company-card bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onCardClick(company)}
    >
      <div className="flex justify-center mb-4">
        {logo ? (
          <img
            src={logo}
            alt={`${name} logo`}
            className="w-20 h-20 object-contain"
          />
        ) : (
          <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center">
            <span className="text-muted-foreground text-xl font-bold">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="text-center mb-2 flex flex-row justify-between">
        <h3 className="text-lg font-bold">{name}</h3>
        <span
          className={`inline-block px-2 py-1 text-xs rounded-full ${
            status === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              : status === "Inactive"
              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {description}
      </p>

      <div className="flex flex-wrap gap-1 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="border-t border-border pt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{foundedYear}</span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>{employeeRange}</span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <span>${valuation}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
