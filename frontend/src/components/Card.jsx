
import React from "react";
import styled from "styled-components";
import { HelpCircle, ClipboardList, Download } from "lucide-react"; // Importing icons
import { useNavigate } from "react-router-dom";




const Card = ({ title, description }) => {
  const navigate = useNavigate();
  const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");

  // Construct the document URL from the public folder
  const infoDocUrl = `/docs/${formattedTitle}-info.pdf`;

  const handleCardClick = () => {
    navigate(`/${formattedTitle}`);
  };

  const handleQuizClick = (e) => {
    e.stopPropagation();
    navigate(`/${formattedTitle}-quiz`); // Dynamic quiz path
  };

  const handleInfoClick = (e) => {
    e.stopPropagation();
    window.open(infoDocUrl, "_blank"); // Open document in new tab
  };

  return (
    <StyledWrapper>
      <div className="card" onClick={handleCardClick}>
        <p className="array-text">{title}</p>

        <div className="card-content">
          <p className="info">{description}</p>
          <div className="icons">
            {/* Quiz Icon */}
            <div className="icon-wrapper" onClick={handleQuizClick}>
              <ClipboardList className="icon" />
              <span className="tooltip">Quizzes</span>
            </div>

            {/* Information Icon */}
            <div className="icon-wrapper" onClick={handleInfoClick}>
              <HelpCircle className="icon" />
              <span className="tooltip">Read Info</span>
            </div>

            {/* Download Icon (with same styling) */}
            <a href={infoDocUrl} download className="icon-wrapper">
              <Download className="icon" />
              <span className="tooltip">Download Info</span>
            </a>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .card {
    position: relative;
    width: 190px;
    height: 254px;
    background-color: rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    gap: 12px;
    border-radius: 15px;
    cursor: pointer;
    color: white;
    text-align: center;
    transition: transform 0.6s;
  }

  /* Background animations (No Changes Here) */
  .card::before {
    content: "";
    position: absolute;
    inset: 0;
    left: -5px;
    margin: auto;
    width: 200px;
    height: 264px;
    border-radius: 15px;
    background: linear-gradient(-45deg, #1cc2ff 0%, #ff261b 100%);
    z-index: -10;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #1cffa4 0%, #ff01aee6 100%);
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(40px);
  }

  /* Center "Array" before flip */
  .array-text {
    font-size: 24px;
    font-weight: bold;
    color: white;
    position: absolute;
    transition: opacity 0.3s ease-in-out;
    cursor: pointer;
  }

  /* After flip: Center description */
  .card-content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center along Y-axis */
    align-items: center; /* Center along X-axis */
    padding: 12px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .info {
    font-size: 14px;
    color: white;
    text-align: center;
    max-width: 80%;
  }

  .icons {
    display: flex;
    gap: 15px;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    color: white;
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .icon:hover {
    color: #1cc2ff;
  }

  /* Tooltip Styles */
  .tooltip {
    position: absolute;
    bottom: 35px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 12px;
    padding: 5px 8px;
    border-radius: 5px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    transform: translateY(5px);
  }

  .icon-wrapper:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  /* Keep existing animations */
  .card:hover::after {
    filter: blur(50px);
  }

  .card:hover::before {
    transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
  }

  .card:hover {
    transform: scale(1);
  }

  /* Hide "Array" text on hover and show card content */
  .card:hover .array-text {
    opacity: 0;
  }

  .card:hover .card-content {
    opacity: 1;
  }
`;

export default Card;



/*import React from 'react';
import styled from 'styled-components';

const Card = () => {
    return (
        <StyledWrapper>
            <div className="myCard">
                <div className="innerCard">
                    <div className="frontSide">
                        <p className="title">FRONT SIDE</p>
                        <p>Hover Me</p>
                    </div>
                    <div className="backSide">
                        <p className="title">BACK SIDE</p>
                        <p>Leave Me</p>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .myCard {
    background-color: transparent;
    width: 190px;
    height: 254px;
    perspective: 1000px;
  }

  .title {
    font-size: 1.5em;
    font-weight: 900;
    text-align: center;
    margin: 0;
  }

  .innerCard {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    cursor: pointer;
  }

  .myCard:hover .innerCard {
    transform: rotateY(180deg);
  }

  .frontSide,
  .backSide {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 1rem;
    color: white;
    box-shadow: 0 0 0.3em rgba(255, 255, 255, 0.5);
    font-weight: 700;
  }

  .frontSide,
  .frontSide::before {
    background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
  }

  .backSide,
  .backSide::before {
    background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
  }

  .backSide {
    transform: rotateY(180deg);
  }

  .frontSide::before,
  .backSide::before {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    width: 110%;
    height: 110%;
    position: absolute;
    z-index: -1;
    border-radius: 1em;
    filter: blur(20px);
    animation: animate 5s linear infinite;
  }

  @keyframes animate {
    0% {
      opacity: 0.3;
    }

    80% {
      opacity: 1;
    }

    100% {
      opacity: 0.3;
    }
  }`;

export default Card;*/

/*import React from 'react';
import styled from 'styled-components';

const Card = () => {
    return (
        <StyledWrapper>
            <div className="card">
                <div className="content">
                    <div className="back">
                        <div className="back-content">
                            <svg stroke="#ffffff" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" height="50px" width="50px" fill="#ffffff">
                                <g strokeWidth={0} id="SVGRepo_bgCarrier" />
                                <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" />
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M20.84375 0.03125C20.191406 0.0703125 19.652344 0.425781 19.21875 1.53125C18.988281 2.117188 18.5 3.558594 18.03125 4.9375C17.792969 5.636719 17.570313 6.273438 17.40625 6.75C17.390625 6.796875 17.414063 6.855469 17.40625 6.90625C17.398438 6.925781 17.351563 6.949219 17.34375 6.96875L17.25 7.25C18.566406 7.65625 19.539063 8.058594 19.625 8.09375C22.597656 9.21875 28.351563 11.847656 33.28125 16.78125C38.5 22 41.183594 28.265625 42.09375 30.71875C42.113281 30.761719 42.375 31.535156 42.75 32.84375C42.757813 32.839844 42.777344 32.847656 42.78125 32.84375C43.34375 32.664063 44.953125 32.09375 46.3125 31.625C47.109375 31.351563 47.808594 31.117188 48.15625 31C49.003906 30.714844 49.542969 30.292969 49.8125 29.6875C50.074219 29.109375 50.066406 28.429688 49.75 27.6875C49.605469 27.347656 49.441406 26.917969 49.25 26.4375C47.878906 23.007813 45.007813 15.882813 39.59375 10.46875C33.613281 4.484375 25.792969 1.210938 22.125 0.21875C21.648438 0.0898438 21.234375 0.0078125 20.84375 0.03125 Z M 16.46875 9.09375L0.0625 48.625C-0.09375 48.996094 -0.00390625 49.433594 0.28125 49.71875C0.472656 49.910156 0.738281 50 1 50C1.128906 50 1.253906 49.988281 1.375 49.9375L40.90625 33.59375C40.523438 32.242188 40.222656 31.449219 40.21875 31.4375C39.351563 29.089844 36.816406 23.128906 31.875 18.1875C27.035156 13.34375 21.167969 10.804688 18.875 9.9375C18.84375 9.925781 17.8125 9.5 16.46875 9.09375 Z M 17 16C19.761719 16 22 18.238281 22 21C22 23.761719 19.761719 26 17 26C15.140625 26 13.550781 24.972656 12.6875 23.46875L15.6875 16.1875C16.101563 16.074219 16.550781 16 17 16 Z M 31 22C32.65625 22 34 23.34375 34 25C34 25.917969 33.585938 26.730469 32.9375 27.28125L32.90625 27.28125C33.570313 27.996094 34 28.949219 34 30C34 32.210938 32.210938 34 30 34C27.789063 34 26 32.210938 26 30C26 28.359375 26.996094 26.960938 28.40625 26.34375L28.3125 26.3125C28.117188 25.917969 28 25.472656 28 25C28 23.34375 29.34375 22 31 22 Z M 21 32C23.210938 32 25 33.789063 25 36C25 36.855469 24.710938 37.660156 24.25 38.3125L20.3125 39.9375C18.429688 39.609375 17 37.976563 17 36C17 33.789063 18.789063 32 21 32 Z M 9 34C10.65625 34 12 35.34375 12 37C12 38.65625 10.65625 40 9 40C7.902344 40 6.960938 39.414063 6.4375 38.53125L8.25 34.09375C8.488281 34.03125 8.742188 34 9 34Z" />
                                </g>
                            </svg>
                            <strong>Hover Me</strong>
                        </div>
                    </div>
                    <div className="front">
                        <div className="img">
                            <div className="circle">
                            </div>
                            <div className="circle" id="right">
                            </div>
                            <div className="circle" id="bottom">
                            </div>
                        </div>
                        <div className="front-content">
                            <small className="badge">Pasta</small>
                            <div className="description">
                                <div className="title">
                                    <p className="title">
                                        <strong>Spaguetti Bolognese</strong>
                                    </p>
                                    <svg fillRule="nonzero" height="15px" width="15px" viewBox="0,0,256,256" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g style={{ mixBlendMode: 'normal' }} textAnchor="none" fontSize="none" fontWeight="none" fontFamily="none" strokeDashoffset={0} strokeDasharray strokeMiterlimit={10} strokeLinejoin="miter" strokeLinecap="butt" strokeWidth={1} stroke="none" fillRule="nonzero" fill="#20c997"><g transform="scale(8,8)"><path d="M25,27l-9,-6.75l-9,6.75v-23h18z" /></g></g></svg>
                                </div>
                                <p className="card-footer">
                                    30 Mins &nbsp; | &nbsp; 1 Serving
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    width: 190px;
    height: 254px;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0px 0px 10px 1px #000000ee;
    border-radius: 5px;
  }

  .front, .back {
    background-color: #151515;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
  }

  .back {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .back::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(90deg, transparent, #ff9966, #ff9966, #ff9966, #ff9966, transparent);
    animation: rotation_481 5000ms infinite linear;
  }

  .back-content {
    position: absolute;
    width: 99%;
    height: 99%;
    background-color: #151515;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }

  .card:hover .content {
    transform: rotateY(180deg);
  }

  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }

    0% {
      transform: rotateZ(360deg);
    }
  }

  .front {
    transform: rotateY(180deg);
    color: white;
  }

  .front .front-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .front-content .badge {
    background-color: #00000055;
    padding: 2px 10px;
    border-radius: 10px;
    backdrop-filter: blur(2px);
    width: fit-content;
  }

  .description {
    box-shadow: 0px 0px 10px 5px #00000088;
    width: 100%;
    padding: 10px;
    background-color: #00000099;
    backdrop-filter: blur(5px);
    border-radius: 5px;
  }

  .title {
    font-size: 11px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .title p {
    width: 50%;
  }

  .card-footer {
    color: #ffffff88;
    margin-top: 5px;
    font-size: 8px;
  }

  .front .img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #ffbb66;
    position: relative;
    filter: blur(15px);
    animation: floating 2600ms infinite linear;
  }

  #bottom {
    background-color: #ff8866;
    left: 50px;
    top: 0px;
    width: 150px;
    height: 150px;
    animation-delay: -800ms;
  }

  #right {
    background-color: #ff2233;
    left: 160px;
    top: -80px;
    width: 30px;
    height: 30px;
    animation-delay: -1800ms;
  }

  @keyframes floating {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(10px);
    }

    100% {
      transform: translateY(0px);
    }
  }`;

export default Card;*/


/*import React from 'react';
import styled from 'styled-components';

const Card = () => {
    return (
        <StyledWrapper>
            <div className="card">
                <p className="heading">Popular this month</p>
                <p>Powered By</p>
                <p>Array</p>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 190px;
    height: 254px;
    background-color: rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 12px;
    gap: 12px;
    border-radius: 15px;
    cursor: pointer;
    color: #000000;
  }

  .card::before {
    content: "";
    position: absolute;
    inset: 0;
    left: -5px;
    margin: auto;
    width: 200px;
    height: 264px;
    border-radius: 15px;
    background: linear-gradient(-45deg, #1cc2ff 0%, #ff261b 100%);
    z-index: -10;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #1cffa4 0%, #ff01aee6 100%);
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(40px);
  }

  


  .heading {
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 800;
  }

  .card p:not(.heading) {
    font-size: 20px;
    color: #000000;
    text-align: center;

  }

  .card p:not::after) {
    font-size: 0px;
    color: #ffffff;
  }

  .card p:last-child {
    color: #ffffff;
  }

  .card:hover::after {
    filter: blur(50px);
  }

  .card:hover::before {
    transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
  }

  .card:hover {
    transform: scale(1);
  }`;

export default Card;*/
