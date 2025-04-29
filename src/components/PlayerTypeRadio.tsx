import { FC, useState } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import LoadPlayerForm from './LoadPlayerForm/LoadPlayerForm';
import NewPlayerForm from './NewPlayerForm';
import { PlayerRadioProps } from '../utils/types';

const PlayerTypeRadio: FC<PlayerRadioProps> = ({
  players,
  selectedPlayer,
  setPlayers
}) => {
  const [selectedOption, setSelectedOption] = useState('newPlayer');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          style={{
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'center'
          }}
          defaultValue="newPlayer"
          onChange={event => handleOptionChange(event)}
        >
          <FormControlLabel
            value="newPlayer"
            control={<Radio />}
            label="New Player"
          />
          <FormControlLabel
            value="loadPlayer"
            control={<Radio />}
            label="Load Player"
          />
        </RadioGroup>
      </FormControl>
      {selectedOption === 'newPlayer' ? (
        <NewPlayerForm
          selectedPlayer={selectedPlayer}
          setPlayers={setPlayers}
        />
      ) : (
        <LoadPlayerForm
          selectedPlayer={selectedPlayer}
          players={players}
          setPlayers={setPlayers}
        />
      )}
    </>
  );
};

export default PlayerTypeRadio;
