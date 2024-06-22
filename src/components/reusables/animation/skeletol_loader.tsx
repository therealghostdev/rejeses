import React from 'react';
import PropTypes from 'prop-types';
import './Skeleton_loader.css'; // Ensure this CSS file is created

export default function SkeletalLoader({
  blockWidth = 'w-64',
  cardWidth = 'w-84',
  cardHeight = "h-auto",
  cardImageHeight = 'h-60',
  blockColor = 'bg-gray-200',
  cardColor = 'bg-white',
  cardImageColor = 'bg-gray-100',
  cardContentColor = 'bg-white'
}) {
  return (
    <div
      className={`box-border ${cardWidth} ${cardHeight} ${cardColor} relative m-auto rounded-lg py-6`}
      id="card"
      style={{ width: 'auto', backgroundColor: cardColor }}
    >
      <div
        className={`box-border ${cardImageHeight} ${cardImageColor} p-4 m-auto w-[80%]`}
        id="card-image"
        style={{ height: 'auto', backgroundColor: cardImageColor }}
      >
        <div className={`block pulsate ${blockColor} ${blockWidth} h-4 mb-2`}></div>
        <svg
          className="fpo block m-auto relative"
          width="84px"
          height="63px"
          x="0"
          y="0"
          viewBox="0 0 84 63"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            transform="translate(-964.000000, -1012.000000)"
            fillOpacity="0.06"
          >
            <g id="16---Workpaper-Loading-Copy" transform="translate(836.000000, 909.000000)" fill="#000000">
              <g id="Icons-/-Special-/-RTE-/-Image" transform="translate(100.000000, 67.000000)">
                <g id="Icons-/-RTE-/-ImageSpecial">
                  <path
                    d="M108.368088,36.5625 L30.8485565,36.5625 C29.319526,36.5625 28.0800018,37.8216991 28.0800018,39.375 L28.0800018,95.625 C28.0800018,97.1783009 29.319526,98.4375 30.8485565,98.4375 L108.368088,98.4375 C109.897118,98.4375 111.136642,97.1783009 111.136642,95.625 L111.136642,39.375 C111.136642,37.8216991 109.897118,36.5625 108.368088,36.5625 L108.368088,36.5625 Z M105.599533,42.1875 L105.599533,81.225 L96.7678436,68.68125 C96.2965986,68.0076728 95.5575991,67.5787153 94.747102,67.5082962 C93.936605,67.4378771 93.1366348,67.7331229 92.5596405,68.315625 L82.0668182,79.003125 L59.1154999,55.6875 C58.0356599,54.5970274 56.2916778,54.5970274 55.2118378,55.6875 L33.6171112,77.596875 L33.6171112,42.1875 L105.599533,42.1875 L105.599533,42.1875 Z M33.6171112,92.8125 L33.6171112,85.528125 L57.149826,61.621875 L80.1011444,84.9375 C81.1809844,86.0279726 82.9249665,86.0279726 84.0048065,84.9375 L94.1654022,74.64375 L105.599533,90.9 L105.599533,92.8125 L33.6171112,92.8125 L33.6171112,92.8125 Z M77.9139862,56.25 C77.9139862,53.1433983 80.3930345,50.625 83.4510956,50.625 C86.5091566,50.625 88.988205,53.1433983 88.988205,56.25 C88.988205,59.3566017 86.5091566,61.875 83.4510956,61.875 C80.3930345,61.875 77.9139862,59.3566017 77.9139862,56.25 L77.9139862,56.25 Z"
                    id="Shape"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div className={`clear-both box-border p-4 ${cardContentColor}`} id="card-content" style={{ backgroundColor: cardContentColor }}>
        <div className={`block2 pulsate ${blockColor} ${blockWidth} h-2 mb-2`}></div>
        <div className={`block3 pulsate ${blockColor} ${blockWidth} h-2 mb-4`}></div>
        <div className={`circle pulsate ${blockColor} w-7 h-7 rounded-full float-right`}></div>
        <div style={{ clear: 'both' }}></div>
      </div>
    </div>
  );
}

SkeletalLoader.propTypes = {
  blockWidth: PropTypes.string,
  cardWidth: PropTypes.string,
  cardHeight: PropTypes.string,
  cardImageHeight: PropTypes.string,
  blockColor: PropTypes.string,
  cardColor: PropTypes.string,
  cardImageColor: PropTypes.string,
  cardContentColor: PropTypes.string,
};
