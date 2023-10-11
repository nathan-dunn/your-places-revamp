const Searching = ({ places }) => {
  return (
    <div className="searching ma2 pa2 center tc">
      <div className="center">
        <span className="f5 ">Searching for </span>
        <span className="f5 b">{places}</span>
      </div>
    </div>
  );
};

export default Searching;
