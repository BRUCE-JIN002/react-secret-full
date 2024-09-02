import { useEffect, useMemo } from "react";
import { styled, createGlobalStyle, css } from "styled-components";

const keys: Record<string, { frequency: number }> = {
  A: {
    frequency: 196
  },
  S: {
    frequency: 220
  },
  D: {
    frequency: 246
  },
  F: {
    frequency: 261
  },
  G: {
    frequency: 293
  },
  H: {
    frequency: 329
  },
  J: {
    frequency: 349
  },
  K: {
    frequency: 392
  }
};

export default function Piano() {
  const play = (key: string) => {
    const frequency = keys[key]?.frequency;
    if (!frequency) {
      return;
    }

    const osc = context.createOscillator();
    osc.type = "sine";

    const gain = context.createGain();
    osc.connect(gain);
    gain.connect(context.destination);

    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0, context.currentTime);
    gain.gain.linearRampToValueAtTime(1, context.currentTime + 0.01);

    osc.start(context.currentTime);

    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1);
    osc.stop(context.currentTime + 1);

    document.getElementById(`key-${key}`)?.classList.add("pressed");
    setTimeout(() => {
      document.getElementById(`key-${key}`)?.classList.remove("pressed");
    }, 100);
  };

  const context = useMemo(() => new AudioContext(), []);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      play(e.key.toUpperCase());
    });
  }, []);

  return (
    <KeysStyle as="section">
      {Object.keys(keys).map((item: string) => {
        return (
          <KeyStyle as="div" key={item} onClick={() => play(item)}>
            <div id={`key-${item}`}>
              <span>{item}</span>
            </div>
          </KeyStyle>
        );
      })}
      <GlobalStyles />
    </KeysStyle>
  );
}

const GlobalStyles = createGlobalStyle`
    .pressed {
      background: #aaa;
    }
  `;

const KeysStyle = styled.div`
  width: 800px;
  height: 400px;
  margin: 40px auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
`;
const textStyle = css`
  line-height: 700px;
  text-align: center;
  font-size: 24px;
`;

const KeyStyle = styled.div`
  border: 4px solid black;
  background: #fff;
  flex: 1;
  position: relative;
  ${textStyle}

  &:hover {
    background: #aaa;
  }
  &::before {
    content: "";
    position: absolute;
    z-index: 2;
    left: 70%;
    height: 60%;
    width: 70%;
    display: block;
    padding-top: 100%;
    background-color: black;
  }
  &:last-child::before {
    content: none;
  }
`;
