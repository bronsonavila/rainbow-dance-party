import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

const ColorGrids = () => {
  const autoIncrementTimerRef = useRef(null);
  const [cellSize, setCellSize] = useState(16);
  const [colorRange, setColorRange] = useState(360);
  const [columns, setColumns] = useState(16);
  const [isAutoIncrementing, setIsAutoIncrementing] = useState(false);
  const [maxColorGrids, setMaxColorGrids] = useState(8);
  const [multiplier, setMultiplier] = useState(2.333);
  const [rows, setRows] = useState(16);
  const [showBorders, setShowBorders] = useState(true);
  const [step, setStep] = useState('0.001');

  const getDecimalPlaces = () => step.split('.')[1]?.length || 0;

  const handleInputFocus = (e) => e.target.select();

  // Toggle auto incrementer on/off.
  useEffect(() => {
    clearInterval(autoIncrementTimerRef.current);
    if (isAutoIncrementing) {
      autoIncrementTimerRef.current = setInterval(() => {
        setMultiplier((multiplier) =>
          (Number(multiplier) + Number(step)).toFixed(getDecimalPlaces())
        );
      }, 100);
    }
  }, [isAutoIncrementing, step]);

  // Adjust multiplier's decimal places based on chosen step value.
  useEffect(() => {
    setMultiplier(Number(multiplier).toFixed(getDecimalPlaces()));
  }, [step]);

  return (
    <>
      <Head>
        <title>Rainbow Dance Party</title>
        <meta name="description" content="Rainbow Dance Party" />
        <meta name="author" content="Bronson Avila" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="controls">
          <label>
            <span>Cell Size</span>
            <input
              min="1"
              onChange={(e) => setCellSize(e.target.value)}
              onFocus={handleInputFocus}
              type="number"
              value={cellSize}
            />
          </label>
          <label>
            <span>Columns</span>
            <input
              min="1"
              onChange={(e) =>
                setColumns(e.target.value ? Number(e.target.value) : '')
              }
              onFocus={handleInputFocus}
              type="number"
              value={columns}
            />
          </label>
          <label>
            <span>Rows</span>
            <input
              min="1"
              onChange={(e) =>
                setRows(e.target.value ? Number(e.target.value) : '')
              }
              onFocus={handleInputFocus}
              type="number"
              value={rows}
            />
          </label>
          <label>
            <span>Max Grids</span>
            <input
              min="1"
              onChange={(e) =>
                setMaxColorGrids(e.target.value ? Number(e.target.value) : '')
              }
              onFocus={handleInputFocus}
              type="number"
              value={maxColorGrids}
            />
          </label>
          <label>
            <span>Multiplier</span>
            <input
              min="0"
              onChange={(e) =>
                setMultiplier(e.target.value ? Number(e.target.value) : '')
              }
              onFocus={handleInputFocus}
              step={step}
              type="number"
              value={multiplier}
            />
          </label>
          <label>
            <span>Step</span>
            <select onChange={(e) => setStep(e.target.value)} value={step}>
              <option value="1">1</option>
              <option value="0.1">0.1</option>
              <option value="0.01">0.01</option>
              <option value="0.001">0.001</option>
              <option value="0.0001">0.0001</option>
              <option value="0.00001">0.00001</option>
            </select>
          </label>
          <label>
            <span>Auto Increment</span>
            <input
              checked={isAutoIncrementing}
              onChange={() => setIsAutoIncrementing(!isAutoIncrementing)}
              type="checkbox"
            />
          </label>
          <label>
            <span>Show Borders</span>
            <input
              checked={showBorders}
              onChange={(e) => setShowBorders(e.target.checked)}
              type="checkbox"
            />
          </label>
        </div>
        <div className="color-grids">
          {[...Array(maxColorGrids)].map((colorGrid, index) => (
            <ColorGrid
              cellSize={cellSize}
              colorRange={colorRange}
              columns={columns}
              index={index}
              key={index}
              multiplier={multiplier}
              rows={rows}
              showBorders={showBorders}
            />
          ))}
        </div>
      </main>

      <style jsx>{`
        .color-grids {
          display: flex;
          flex-wrap: wrap;
          margin: 1rem 0 1rem 1rem;
        }

        .controls {
          background-color: #f5f7f9;
          border-bottom: 1px solid #3c3c3c;
          display: flex;
          flex-wrap: wrap;
          padding: 1rem 1rem 0.5rem;
          position: fixed;
          top: 0;
          width: 100%;
        }

        input[type='checkbox'] {
          margin: 0.3rem 3rem 0.2rem 0;
        }

        input:not([type='checkbox']) {
          margin-right: 3rem;
          width: 5rem;
        }

        label {
          align-items: center;
          display: flex;
          margin-bottom: 0.5rem;
        }

        label span {
          color: #1a1a1a;
          display: inline-block;
          margin-right: 0.75rem;
        }

        main {
          margin: 17rem auto 0;
        }

        select {
          margin-right: 3rem;
          width: 5rem;
        }

        @media (min-width: 391px) {
          main {
            margin-top: 16rem;
          }
        }

        @media (min-width: 414px) {
          main {
            margin-top: 14rem;
          }
        }

        @media (min-width: 519px) {
          main {
            margin-top: 10rem;
          }
        }

        @media (min-width: 720px) {
          main {
            margin-top: 8rem;
          }
        }

        @media (min-width: 1568px) {
          main {
            margin-top: 6rem;
          }
        }
      `}</style>
    </>
  );
};

const ColorGrid = ({
  cellSize,
  colorRange,
  columns,
  index,
  multiplier,
  rows,
  showBorders,
}) => {
  const setHue = (cellNumber) =>
    Math.round(
      ((cellNumber * colorRange) / (columns * rows)) *
        Math.pow(multiplier, index)
    ) % colorRange || 0; // Default to `0` if value of `Infinity` is reached.

  return (
    <>
      <div className="color-grid">
        {[...Array(columns)].map((column, columnIndex) => (
          <div className="color-grid__column" key={columnIndex}>
            {[...Array(rows)].map((row, rowIndex) => {
              const cellNumber = columnIndex * rows + (rowIndex + 1);
              return (
                <div
                  className="color-grid__cell"
                  key={cellNumber}
                  style={{
                    backgroundColor: `hsl(${setHue(cellNumber)}, 100%, 50%)`,
                  }}
                ></div>
              );
            })}
          </div>
        ))}
      </div>

      <style jsx>{`
        .color-grid {
          border-left: ${showBorders ? '1px solid #3c3c3c' : 0};
          border-top: ${showBorders ? '1px solid #3c3c3c' : 0};
          display: flex;
          flex-direction: row;
          margin-bottom: 1rem;
          margin-right: 1rem;
          width: fit-content;
        }

        .color-grid__column {
          display: flex;
          flex-direction: column;
          width: fit-content;
        }

        .color-grid__cell {
          border-bottom: ${showBorders ? '1px solid #3c3c3c' : 0};
          border-right: ${showBorders ? '1px solid #3c3c3c' : 0};
          height: ${cellSize}px;
          width: ${cellSize}px;
        }
      `}</style>
    </>
  );
};

export default ColorGrids;
