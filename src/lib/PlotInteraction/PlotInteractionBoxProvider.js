import React, { Component } from "react";
import PlotInteractionBox, {
  INTERACTION_MODEL_PANNING
} from "./PlotInteractionBox";

class PlotInteractionBoxProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveringPosition: null,
      clickPosition: null,
      doubleClickPosition: null,
      selectingPositions: null,
      selectedPositions: null,
      panningPositions: null,
      pannedPositions: null
    };
    this.handlePanning = this.handlePanning.bind(this);
    this.handlePanned = this.handlePanned.bind(this);
  }

  render() {
    let { render, width, height } = this.props;
    return (
      <PlotInteractionBox
        width={width}
        height={height}
        transitionGraph={INTERACTION_MODEL_PANNING}
        hoveringHandler={this.handleHovering}
        hoverEndHandler={this.handleHoverEnd}
        clickHandler={this.handleClick}
        doubleClickHandler={this.handleDoubleClick}
        selectingHandler={this.handleSelecting}
        selectedHandler={this.handleSelected}
        panningHandler={this.handlePanning}
        pannedHandler={this.handlePanned}
      >
        {render(this.state)}
      </PlotInteractionBox>
    );
  }

  handleHovering = hoveringPosition => {
    this.setState({ ...this.state, hoveringPosition });
    if (this.props.handleHoverPosChange) {
      this.props.handleHoverPosChange(hoveringPosition);
    }
  };

  handleHoverEnd = () => {
    this.setState({ ...this.state, hoveringPosition: null });
    if (this.props.handleHoverPosChange) {
      this.props.handleHoverPosChange(null);
    }
  };

  handleClick = clickPosition => {
    this.setState({
      ...this.state,
      clickPosition
    });
    if (this.props.handleClick) {
      this.props.handleClick(clickPosition);
    }
  };

  handleDoubleClick = doubleClickPosition => {
    this.setState({ ...this.state, doubleClickPosition });
  };

  handleSelecting = selectingPositions => {
    this.setState({ ...this.state, selectingPositions });
  };

  handleSelected = selectedPositions => {
    this.setState({
      ...this.state,
      selectedPositions,
      selectingPositions: null
    });
  };

  handlePanning(panningPositions) {
    this.setState({ ...this.state, panningPositions });
    if (this.props.handlePan) {
      this.props.handlePan(panningPositions);
    }
  }

  handlePanned(pannedPositions) {
    this.setState({ ...this.state, pannedPositions, panningPositions: null });
    if (this.props.handlePanned) {
      this.props.handlePanned(pannedPositions);
    }
  }
}

export default PlotInteractionBoxProvider;
