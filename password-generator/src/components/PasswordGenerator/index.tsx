import React, { useState, useRef } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { data, UpperCase, LowerCase, Numbers, SpecialCharacters } from '../../data/data';
import passwordGif from '../../assets/gif/password.gif';
import { ReactComponent as Copy } from '../../assets/icons/copy.svg';
import { ReactComponent as Refresh } from '../../assets/icons/refresh.svg';
import Checkbox from '../Checkbox';
import './index.css';

const PasswordGenerator = () => {
    const [passwordLength, setPasswordLength] = useState<number>(8);
    const [password, setPassword] = useState<string>('');
    const [character, setCharacter] = useState<string[]>([]);
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const [passwordStrengthText, setPasswordStrengthText] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);

    const onChangePasswordLength = (value: number | number[]) => {
        setPasswordLength(value as number)
    }

    const generatePassword = (length: number) => {
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * character.length);
            result += character[randomIndex];
        }

        getPasswordStrengthString()
        setPassword(result)
    }

    const copyToClipboard = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand('copy');
            inputRef.current.blur();
        }
    };

    const handleCheckboxChange = (id: string, checked: boolean, index: number) => {
        // handle checkbox change logic here
        if (checked) {
            setCharacter(prevCharacter => [...prevCharacter, ...data[index]]);
            setPasswordStrength(prevStrength => prevStrength + 1);
        } else if (!checked) {
            setCharacter(prevCharacter => prevCharacter.filter(value => !data[index].includes(value)));
            setPasswordStrength(prevStrength => prevStrength - 1);
        }
    };

    const getPasswordStrengthString = () => {
        let strengthString = '';
        switch (passwordStrength) {
            case 1:
                strengthString = 'Weak';
                break;
            case 2:
                strengthString = 'Good';
                break;
            case 3:
                strengthString = 'Strong';
                break;
            case 4:
                strengthString = 'Insane';
                break;
            default:
                strengthString = '';
                break;
        }
        setPasswordStrengthText(strengthString)
    };


    const testingLog = () => {
        console.log(character)
        console.log(passwordStrength)
        console.log(passwordStrengthText)
    }

  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Create strong and secure passwords to keep your account safe online.
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
            <input ref={inputRef} type="text" placeholder="your password" value={password} />
            <div onClick={() => generatePassword(passwordLength)}>
                <Refresh />
            </div>
        </div>
        <button className="copy-btn" onClick={copyToClipboard}>
          <Copy /> Copy
        </button>
          <button onClick={testingLog}>
              testing
          </button>
      </div>
      <span className="fw-500">{passwordStrengthText}</span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
          <Checkbox
              id="1"
              label="Uppercase"
              checked={false}
              name="upper"
              onChange={handleCheckboxChange}
              index={0}
          />
          <Checkbox
              id="2"
              label="Lowercase"
              checked={false}
              name="lower"
              onChange={handleCheckboxChange}
              index={1}
          />
          <Checkbox
              id="3"
              label="Numbers"
              checked={false}
              name="numbers"
              onChange={handleCheckboxChange}
              index={2}
          />
          <Checkbox
              id="4"
              label="Special Characters"
              checked={false}
              name="specialChars"
              onChange={handleCheckboxChange}
              index={3}
          />
      </div>
    </div>
  )
}

export default PasswordGenerator
