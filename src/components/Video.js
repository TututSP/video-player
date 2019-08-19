import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';
import {Container, Row, Col, Button, Progress, Badge } from 'reactstrap';

const sources = {
  bunny: 'https://s3-eu-west-1.amazonaws.com/onrewind-test-bucket/big_buck_bunny.mp4'
};

export default class Video extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: sources.bunny,
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.setMuted = this.setMuted.bind(this);
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  setMuted(muted) {
    return () => {
      this.player.muted = muted;
    };
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state,
      duration: state.duration,
      currentTime: state.currentTime,
      seekingTime: state.seekingTime,
      paused: state.paused,
      muted: state.muted
    });
  }

  play() {
    this.player.play();
    
  }

  pause() {
    this.player.pause();
  }

  changeVolume(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.volume = player.volume + steps;
    };
  }

  progressTime(time) {
    // Hours, minutes and seconds
    let hrs = Math.floor(time / 3600);
    let mins = Math.floor((time % 3600) / 60);
    let secs = Math.floor(time % 60);

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  render() {

  	const isPaused = this.state.paused;
  	const currentTime = this.state.currentTime;
  	const duration = this.progressTime(this.state.duration);
    const isMuted = this.state.muted;

  	let button, mutedButton;

  	if(isPaused){
  		button = <Button onClick={this.play} color="info" className="btn-action">Play</Button>
  	}else{
  		button = <Button onClick={this.pause} color="info" className="btn-action">Pause</Button>
  	}

    if(isMuted){
      mutedButton = <Button onClick={this.setMuted(false)} color="info">Volume on</Button>
    }else{
      mutedButton = <Button onClick={this.setMuted(true)} color="info">Volume off</Button>
    }

    return (
      <div>
        
        <Container>
        <Row>
        <Player
          ref={player => {
            this.player = player;
          }}
        >
          <source src={this.state.source} />
          <ControlBar disableCompletely />
        </ Player>
        </Row>
        	<Row>
        		<Col sm="3">{button}</Col>
        		<Col sm="6"><Progress value={currentTime} max={this.state.duration} color="info"/></Col>
        		<Col sm="3"><Badge color="info">{this.progressTime(this.state.currentTime)} / {duration}</Badge></Col>
        	</Row>
          <Row>
            <Col sm="12" className="volume-actions">
              <Button onClick={this.changeVolume(0.1)} color="info">
                Volume +
              </Button>
              <Button onClick={this.changeVolume(-0.1)} color="info">
                Volume -
              </Button>
              {mutedButton}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}