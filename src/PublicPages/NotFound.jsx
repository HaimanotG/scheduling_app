import React from 'react';
import styled, { keyframes } from 'styled-components';
import Container from "../_styled-components/Container";
const noise_anim = keyframes`
    0% {
      clip: rect(31px, 9999px, 91px, 0);
    }
    5% {
      clip: rect(70px, 9999px, 29px, 0);
    }
    10% {
      clip: rect(3px, 9999px, 56px, 0);
    }
    15% {
      clip: rect(7px, 9999px, 78px, 0);
    }
    20% {
      clip: rect(97px, 9999px, 4px, 0);
    }
    25% {
      clip: rect(24px, 9999px, 60px, 0);
    }
    30% {
      clip: rect(80px, 9999px, 41px, 0);
    }
    35% {
      clip: rect(78px, 9999px, 14px, 0);
    }
    40% {
      clip: rect(20px, 9999px, 23px, 0);
    }
    45% {
      clip: rect(70px, 9999px, 61px, 0);
    }
    50% {
      clip: rect(65px, 9999px, 89px, 0);
    }
    55% {
      clip: rect(74px, 9999px, 25px, 0);
    }
    60% {
      clip: rect(76px, 9999px, 84px, 0);
    }
    65% {
      clip: rect(56px, 9999px, 10px, 0);
    }
    70% {
      clip: rect(85px, 9999px, 58px, 0);
    }
    75% {
      clip: rect(46px, 9999px, 71px, 0);
    }
    80% {
      clip: rect(6px, 9999px, 64px, 0);
    }
    85% {
      clip: rect(20px, 9999px, 84px, 0);
    }
    90% {
      clip: rect(57px, 9999px, 26px, 0);
    }
    95% {
      clip: rect(36px, 9999px, 92px, 0);
    }
    100% {
      clip: rect(12px, 9999px, 53px, 0);
    }
`;

const noise_anim_2 = keyframes`
0% {
    clip: rect(68px, 9999px, 1px, 0);
  }
  5% {
    clip: rect(44px, 9999px, 53px, 0);
  }
  10% {
    clip: rect(72px, 9999px, 43px, 0);
  }
  15% {
    clip: rect(18px, 9999px, 16px, 0);
  }
  20% {
    clip: rect(6px, 9999px, 72px, 0);
  }
  25% {
    clip: rect(18px, 9999px, 16px, 0);
  }
  30% {
    clip: rect(93px, 9999px, 46px, 0);
  }
  35% {
    clip: rect(100px, 9999px, 33px, 0);
  }
  40% {
    clip: rect(27px, 9999px, 29px, 0);
  }
  45% {
    clip: rect(5px, 9999px, 64px, 0);
  }
  50% {
    clip: rect(40px, 9999px, 65px, 0);
  }
  55% {
    clip: rect(72px, 9999px, 49px, 0);
  }
  60% {
    clip: rect(44px, 9999px, 39px, 0);
  }
  65% {
    clip: rect(84px, 9999px, 45px, 0);
  }
  70% {
    clip: rect(99px, 9999px, 56px, 0);
  }
  75% {
    clip: rect(87px, 9999px, 20px, 0);
  }
  80% {
    clip: rect(52px, 9999px, 8px, 0);
  }
  85% {
    clip: rect(64px, 9999px, 22px, 0);
  }
  90% {
    clip: rect(51px, 9999px, 69px, 0);
  }
  95% {
    clip: rect(2px, 9999px, 11px, 0);
  }
  100% {
    clip: rect(19px, 9999px, 40px, 0);
  }
`;
const Error = styled.h2`
    color: #5a5c69;
    font-size: 7rem;
    position: relative;
    line-height: 1;
    width: 12.5rem;

    ::after {
        content: attr(data-text);
        position: absolute;
        left: 2px;
        text-shadow: -1px 0 #e74a3b;
        top: 0;
        color: #5a5c69;
        background: #f8f9fc;
        overflow: hidden;
        clip: rect(0, 900px, 0, 0);
        animation: ${noise_anim} 2s infinite linear alternate-reverse;
      }
      ::before {
        content: attr(data-text);
        position: absolute;
        left: -2px;
        text-shadow: 1px 0 #4e73df;
        top: 0;
        color: #5a5c69;
        background: #f8f9fc;
        overflow: hidden;
        clip: rect(0, 900px, 0, 0);
        animation: ${noise_anim_2} 3s infinite linear alternate-reverse;
      }
`;

const NotFoundWrapper = styled.div`
        
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
`;

const NotFound = () => {
    return (
        <Container>
            <NotFoundWrapper>
                <Error data-text="404">
                    404
                </Error>
                <h2>Oops! You're lost.</h2>
                <p>The page you are looking for was not found.</p>
            </NotFoundWrapper>
        </Container>
    )
};

export default NotFound;