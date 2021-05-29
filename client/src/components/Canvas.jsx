import React from 'react'
import Isomer from 'isomer'

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

var iso;
export class Canvas extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        if (!iso && this.props.address) {
            const splitArr = this.props.address.split('x');
            const fortyChars = splitArr[1].toLowerCase();

            console.log('Canvas', 'fortyChars', fortyChars, fortyChars.length);

            const rgbArr = []
            for (let i = 0; i < fortyChars.length; i += 6) {
                if (i + 6 >= fortyChars.length) break
                rgbArr.push(hexToRgb(fortyChars.substring(i, i + 6)));
            }

            console.log('Canvas', 'rgbArr', rgbArr);

            iso = new Isomer(document.getElementById("canvas"));
            const cube = Isomer.Shape.Prism(Isomer.Point.ORIGIN).scale(Isomer.Point.ORIGIN, 0.3, 0.3, 0.3)
            iso.add(cube)
            let i = 0
            for (let color of rgbArr) {
                const isoColor = new Isomer.Color(color.r, color.g, color.b)
                iso.add(cube.translate(0, 0, i), isoColor)
                //isomerArr.push(Isomer.Shape.Prism(new Isomer.Point(i, 0, 0), 0.2, 0.2, 0.2))
                i = i + 0.2
            }
        }
    }

    render() {
        return (
            <div className="Canvas">
                <canvas id="canvas" width="128" height="128" />
            </div>
        );
    }
}

export default Canvas;