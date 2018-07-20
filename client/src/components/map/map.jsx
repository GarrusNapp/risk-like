import React, { Component, PureComponent } from "react";
import "./map.css";
import { geoMercator, geoPath } from "d3-geo";

class Path extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <path
          index={this.props.index}
          d={this.props.d}
          className={this.props.className}
          onClick={this.props.clickHandler}
          neighbours={this.props.info.neighbours}
        />
        <circle
          index={this.props.index}
          neighbours={this.props.info.neighbours}
          onClick={this.props.clickHandler}
          cx={this.props.centroid[0]}
          cy={this.props.centroid[1]}
          r={2}
        />
      </React.Fragment>
    );
  }
}

export class Svg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: null,
      neighbours: null,
      matrix: [1.0, 0.0, 0.0, 1.0, 0.0, 0.0],
      dragActive: false,
      dragStartPosition: [0, 0],
      dragMovedBy: 0
    };
    // this.calculated = this.props.data.map((d, i) => {
    //   let centroid = geoPath().centroid(d);
    //   let x = this.calculate(d, centroid);
    //   return x;
    // });
  }

  // calculate(path, centroid) {
  //   //this function will calcualte LONG/LAT paths & their centroids into svg ready representation
  //   const width = 800;
  //   const height = 600;
  //   const scale = 3400;
  //   const offset = [width / 2, height / 2];
  //   const projection = geoMercator()
  //     .scale(scale)
  //     .center([19.2, 52.15])
  //     .precision(0)
  //     .translate(offset);
  //   const calculatedCentroid = projection(centroid);
  //   const generator = geoPath().projection(projection);
  //   return { path: generator(path), centroid: calculatedCentroid };
  // }

  showNeighbours = i => {
    if (this.state.clicked == i) {
      return "focused";
    } else if (
      Array.isArray(this.state.neighbours) &&
      this.state.neighbours.includes(i)
    ) {
      return "neighbour";
    }
    return "default";
  };

  wheel = e => {
    e.preventDefault();
    let zoomChange = 0;
    if (e.deltaY > 0) {
      zoomChange -= 0.2;
    } else {
      zoomChange += 0.2;
    }
    let scale = this.state.matrix[3];

    scale += zoomChange;
    scale = Number(scale.toFixed(2));
    if (scale <= 0 || scale > 2) {
      return;
    }

    let newMatrix = this.state.matrix;
    newMatrix[0] = scale;
    newMatrix[3] = scale;
    newMatrix[4] += -zoomChange * 400;
    newMatrix[5] += -zoomChange * 300;

    this.setState({
      matrix: newMatrix
    });
  };

  startDrag = e => {
    e.preventDefault();
    this.setState({
      dragActive: true,
      dragStartPosition: [e.clientX, e.clientY],
      dragMovedBy: 0
    });
  };

  drag = e => {
    e.preventDefault();
    if (!this.state.dragActive) {
      return;
    }
    let newMatrix = this.state.matrix;
    let dx = this.state.dragStartPosition[0] - e.clientX;
    let dy = this.state.dragStartPosition[1] - e.clientY;
    newMatrix[4] -= dx;
    newMatrix[5] -= dy;
    let movedBy = this.state.dragMovedBy + Math.abs(dy) + Math.abs(dx);
    this.setState({
      matrix: newMatrix,
      dragStartPosition: [e.clientX, e.clientY],
      dragMovedBy: movedBy
    });
  };

  endDrag = e => {
    this.setState({
      dragActive: false
    });
  };

  clickHandler = (e, data) => {
    if (this.state.dragMovedBy > 2) {
      return;
    }
    this.setState(
      {
        clicked: e.target.attributes.index.value,
        neighbours: e.target.attributes.neighbours.value.split(",").map(Number) //:)
      },
      () => {
        this.props.getDataOfClickedElement({
          clicked: this.state.clicked,
          data: data
        });
      }
    );
  };

  clear = e => {
    if (e.target.tagName == "svg") {
      this.setState({
        clicked: null,
        neighbours: null
      });
    }
  };

  render() {
    console.log("rerender :)");

    const areas = this.props.data.map((d, i) => (
      <Path
        key={d.NTS}
        info={this.props.gameInfo.board[i]}
        index={i}
        d={d.path}
        centroid={d.centroid}
        className={this.showNeighbours(i)}
        clickHandler={e => {
          this.clickHandler(e, {NAZ: d.NAZ, neighbours: d.neighbours});
        }}
      />
    ));

    return (
      <svg
        width="800"
        height="600"
        onClick={this.clear}
        onWheel={this.wheel}
        onMouseDown={this.startDrag}
        onMouseMove={this.drag}
        onMouseUp={this.endDrag}
      >
        <g draggable="true" transform={"matrix(" + this.state.matrix + ")"}>
          {areas}
        </g>
      </svg>
    );
  }
}
