import spinner from '../../assets/spinner.gif';

export default function Searching() {
  return (
    <div className="searching ma2 pa2 center tc">
      <div className="center flex flex-column items-center">
        <img src={spinner} alt="spinner" style={{ height: 100, width: 100 }} />
      </div>
    </div>
  );
}
