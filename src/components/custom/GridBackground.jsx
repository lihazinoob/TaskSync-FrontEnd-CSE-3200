const GridBackground = () => {
  return (
    <div className="absolute inset-0 -z-50 overflow-hidden">
      {/* Add radial gradient as a sibling before the grid */}
      {/* <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent 0%, rgb(0, 0,0) 100%)`,
          opacity: 0.4,
          zIndex: 1,
        }}
      /> */}

      <div
        style={{
          width: "100%",
          height: "100%",
          background: "var(--background)",
          "--gap": "5em",
          "--line": "1px",
          "--color": "var(--border)",
          backgroundImage: `
              linear-gradient(
                -90deg,
                transparent calc(var(--gap) - var(--line)),
                var(--color) calc(var(--gap) - var(--line) + 1px),
                var(--color) var(--gap)
              ),
              linear-gradient(
                0deg,
                transparent calc(var(--gap) - var(--line)),
                var(--color) calc(var(--gap) - var(--line) + 1px),
                var(--color) var(--gap)
              )
            `,
          backgroundSize: "var(--gap) var(--gap)",
          position: "relative",
        }}
        className="transition-colors duration-300 ease-in-out"
      >
        {" "}
        {/* Top fade overlay */}
        {/* <div
          className="absolute top-0 left-0 w-full h-[12vh] pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, 
                         var(--background) 0%, 
                         color-mix(in srgb, var(--background) 70%, transparent) 70%, 
                         transparent 100%)`,
          }}
        /> */}
        {/* Bottom fade overlay */}
        <div
          className="absolute bottom-0 left-0 w-full h-[15vh] pointer-events-none"
          style={{
            background: `linear-gradient(to top, 
                         var(--background) 0%, 
                         color-mix(in srgb, var(--background) 70%, transparent) 70%, 
                         transparent 100%)`,
          }}
        />
      </div>
    </div>
  );
};

export default GridBackground;
