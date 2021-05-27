import Head from 'next/head';
import { useEffect, useState } from 'react';

const ColorGrids = () => {
  const [cellSize, setCellSize] = useState(16);
  const [colorRange, setColorRange] = useState(360);
  const [columns, setColumns] = useState(16);
  const [maxColorGrids, setMaxColorGrids] = useState(8);
  const [multiplier, setMultiplier] = useState(2.333);
  const [rows, setRows] = useState(16);
  const [showBorders, setShowBorders] = useState(true);
  const [step, setStep] = useState('0.001');

  useEffect(() => {
    switch (step) {
      case '1':
        setMultiplier(Number(multiplier).toFixed(0));
        break;
      case '0.1':
        setMultiplier(Number(multiplier).toFixed(1));
        break;
      case '0.01':
        setMultiplier(Number(multiplier).toFixed(2));
        break;
      case '0.001':
        setMultiplier(Number(multiplier).toFixed(3));
        break;
      case '0.0001':
        setMultiplier(Number(multiplier).toFixed(4));
        break;
    }
  }, [step]);

  return (
    <>
      <Head>
        <title>Color Grids</title>
        <meta name="description" content="Color Grids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="controls">
          <label>
            <span>Cell Size</span>
            <input
              min="1"
              onChange={(e) => setCellSize(e.target.value)}
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
              type="number"
              value={rows}
            />
          </label>
          <label>
            <span>Max Grids</span>
            <input
              onChange={(e) =>
                setMaxColorGrids(e.target.value ? Number(e.target.value) : '')
              }
              type="number"
              value={maxColorGrids}
            />
          </label>
          <label>
            <span>Multiplier</span>
            <input
              onChange={(e) =>
                setMultiplier(e.target.value ? Number(e.target.value) : '')
              }
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
            </select>
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
          display: flex;
          flex-direction: column;
          margin: 1rem 0 1rem 1rem;
        }

        input:not([type='checkbox']) {
          margin-bottom: 0.25rem;
          width: 7rem;
        }

        input[type='checkbox'] {
          margin: 0.5rem 0;
        }

        label span {
          display: inline-block;
          width: 7rem;
          margin-right: 1rem;
        }

        main {
          margin: 0 auto;
          max-width: 70rem;
        }

        select {
          width: 7rem;
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
    );

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
                  id={cellNumber}
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
          border: ${showBorders ? '1px solid #2b2b2b' : 0};
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
          background: #fff;
          border: ${showBorders ? '1px solid #2b2b2b' : 0};
          height: ${cellSize}px;
          width: ${cellSize}px;
        }
      `}</style>
    </>
  );
};

export default ColorGrids;
