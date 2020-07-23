import React from 'react';
import { useState, useEffect, useReducer } from 'react';

const GRID_SEED = 10;
const grid = [];
[...Array(GRID_SEED).keys()].forEach(i => [...Array(GRID_SEED).keys()].reduce((_, j) => grid.push([i, j]), 0));

const App = () => {

    // const [position, setPosition] = useState([0, 0]);
    const [direction, setDirection] = useState('right');
    const [position, dispatch] = useReducer(pizza, [0, 0]);

    function pizza([x, y]) {
        const defaultPosition = [0, 0];
            switch (direction) {
                case 'up':
                   return x === 0 ? defaultPosition : [x - 1, y];
                case 'down':
                    return x === GRID_SEED - 1 ? defaultPosition : [x + 1, y];
                case 'right':
                    return y === GRID_SEED - 1 ? defaultPosition :[x, y + 1];
                case 'left':
                    return y === 0 ? defaultPosition : [x, y - 1];
            }
    }

    useEffect(() => {
        const body = document.querySelector('body');
        body.onkeydown = ({ key }) => {
            switch(key) {
                case 'ArrowUp':
                    return setDirection('up');
                case 'ArrowDown':
                    return setDirection('down');
                case 'ArrowRight':
                    return setDirection('right');
                case 'ArrowLeft':
                    return setDirection('left');
            }
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(dispatch, 1000);
        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <div style={outerStyle()}>
            <div style={makeGrid()}>
                {[...Array(GRID_SEED).keys()].map(i => (
                    <Row key={i} currentPosition={position} rowVals={grid.slice(i * GRID_SEED, i * GRID_SEED + GRID_SEED)} />
                ))}
            </div>
        </div>
    );
}

function outerStyle() {
    return {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

function makeGrid() {
    return {
        maxWidth: (40+2+2) * GRID_SEED,
        maxHeight: (40+2+2) * GRID_SEED,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
}

function Tile({ isActive }) {
    const styles = {
        width: '40px',
        height: '40px',
        border: '1px solid black',
        margin: '1px',
        backgroundColor: isActive && 'yellow'
    };
    return <div style={styles} />
}

function Row({ rowVals, currentPosition: [currentX, currentY] }) {
    return rowVals.map(([x, y]) => (
        <Tile key={x+y} isActive={currentX === x && currentY === y} />
    ))
}

export default App;
