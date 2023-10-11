import { Component } from 'react';
import { isBrowser } from 'react-device-detect';
import startCase from 'lodash/startCase';
import { HEADER, DELETION } from '../../constants/misc';

class Primary extends Component {
  render() {
    const { places, handleDeleteClick } = this.props;
    const place = places[0];
    const placeKeys = Object.keys(place);
    const { id } = place.stash;
    const { cityProper } = place.stash.queryObj;

    const deleteIcon = (
      <div className="mr1" onClick={() => handleDeleteClick(id)} role="button" onKeyDown={() => {}}>
        <i className="icon-close f4" />
      </div>
    );

    return (
      <div
        className="myList ma2 pa3 center tc"
        style={{
          width: isBrowser ? 400 : '100vw',
          // height: isBrowser ? 850 : '100vh',
          border: isBrowser ? '2px solid #787878' : 'none',
          borderRadius: 3,
        }}
      >
        {placeKeys.map((placeKey, i) => {
          const value = place[placeKey];
          if (typeof value === 'object') return null;

          const isHeader = value === HEADER;
          const isDeletion = value === DELETION;

          return (
            <div
              className={`w-100 ma1 pa1 center flex justify-between bb b--white-30 items-center ${
                isHeader && 'b mt3'
              } ${isDeletion && 'border-none'}`}
              key={i}
            >
              <div className={`dib w4 tl ${isHeader ? 'f5' : 'f7'}`}>{`${startCase(
                placeKey
              )}`}</div>
              <div className={`dib w4 tr ${isHeader ? 'f6' : 'f7'}`}>
                {isHeader ? cityProper : isDeletion ? deleteIcon : value}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Primary;
