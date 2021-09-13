import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "react-router-dom"

const SongInfo = (props) => {
  const [initialState, setInitialState] = useState([]);
  const [error, setError] = useState(null);
  const params = useParams()

  const songName = () => {
    if(props.redirect){
      return params.songTitle
    } else
    return props.songTitle
  }

  useEffect(() => {
    fetch('/api/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        songName: songName(),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch data.');
        }
        return res.json();
      })
      .then((jsonResponse) => setInitialState(jsonResponse.songs))
      .catch((err) => {
        setError(err.message);
      });
  }, [props.songTitle]);


  if(props.redirect) {
  return (
    <div>
      {error && <div>{error}</div>}
      {initialState.length > 0 &&
        initialState.map((e) => (
          <div className='song-container' key={uuidv4()}>
              <a href={'/' + e.id} key="audio-features">
                {e.name} by {e.artist}
              </a>
          </div>
        ))}
    </div>
  );
  }
  else {
    return (
    <div>     
    {error && <div>{error}</div>}
    {initialState.length > 0 &&
      initialState.map((e) => (
        <li key={uuidv4()}>
          <a href={'/' + props.songAId + '/' + e.id} key="audio-features">
            {e.name} by {e.artist}
          </a>
        </li>
      ))}</div>
    )
  }
};

SongInfo.propTypes = {
  props: PropTypes.func,
  songTitle: PropTypes.string,
  redirect: PropTypes.bool,
  songAId: PropTypes.string,
};

export default SongInfo;
