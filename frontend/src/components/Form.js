import React, { useState } from 'react';
import './Form.css';

import FormField from './FormField';
import Select from './Select';

const plusOneOptions = [
  ['not-sure', 'Még nem tudom'],
  ['yes', 'Igen szeretnék'],
  ['no', 'Nem fogok'],
];

export default function Form({
  canBringPlusOne,
  isPlural,
  askChildren,
  multipleChildren,
}) {
  const [isComing, setIsComing] = useState('');
  const [plusOne, setPlusOne] = useState('no');
  const [hasAllergy, setHasAllergy] = useState('no');
  const [allergyDesc, setAllergyDesc] = useState('');
  const [children, setChildren] = useState(0);
  const [message, setMessage] = useState('');

  function renderIsComing() {
    const label = `${isPlural ? 'Tudtok' : 'Tudsz'} jönni az esküvőre?`;
    return (
      <FormField fieldId="is-coming" label={label}>
        <Select
          id="is-coming"
          value={isComing}
          onChange={(e) => setIsComing(e.target.value)}
          options={[
            ['', '-- Kérlek válassz --'],
            ['yes', 'Igen'],
            ['no', 'Sajnos nem'],
          ]}
        />
      </FormField>
    );
  }

  function renderPlusOne() {
    if (!canBringPlusOne || isComing !== 'yes') {
      return null;
    }
    return (
      <FormField fieldId="plus-one" label="Szeretnél hozni +1 főt?">
        <Select
          id="plus-one"
          value={plusOne}
          onChange={(e) => setPlusOne(e.target.value)}
          options={plusOneOptions}
        />
      </FormField>
    );
  }

  function renderMessage() {
    if (isComing === '') {
      return null;
    }

    return (
      <FormField fieldId="message" label="Ide jöhet bármilyen további infó">
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </FormField>
    );
  }

  function renderHasAllergy() {
    if (isComing !== 'yes') {
      return null;
    }

    return (
      <FormField
        fieldId="has-allergy"
        label={
          isPlural
            ? 'Van valamelyikőtöknek étel allergiája?'
            : 'Van étel allergiád?'
        }
      >
        <Select
          id="has-allergy"
          value={hasAllergy}
          onChange={(e) => setHasAllergy(e.target.value)}
          options={[
            ['no', 'Nincs'],
            ['yes', 'Van'],
          ]}
        />
      </FormField>
    );
  }

  function renderAllergyDesc() {
    if (isComing !== 'yes' || hasAllergy === 'no') {
      return null;
    }

    return (
      <FormField
        fieldId="allergy-description"
        label={isPlural ? `Mire vagytok allergiásak?` : 'Mire vagy allergiás?'}
      >
        <textarea
          id="allergy-description"
          value={allergyDesc}
          onChange={(e) => setAllergyDesc(e.target.value)}
        />
      </FormField>
    );
  }

  function renderChildren() {
    if (isComing !== 'yes' || !askChildren) {
      return null;
    }

    const start = isPlural ? 'Szeretnétek' : 'Szeretnéd';
    let end;
    if (isPlural) {
      end = multipleChildren ? 'gyerekeiteket' : 'gyereketeket';
    } else {
      end = multipleChildren ? 'gyerekeidet' : 'gyerekedet';
    }
    const ageQ = `Ha igen, akkor hány éves${multipleChildren ? 'ek' : ''}?`;
    const label = `${start} hozni a ${end}? ${ageQ}`;

    return (
      <FormField fieldId="children" label={label}>
        <textarea
          id="children"
          value={children}
          onChange={(e) => setChildren(e.target.value)}
        />
      </FormField>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted');
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      {renderIsComing()}
      {renderPlusOne()}
      {renderChildren()}
      {renderHasAllergy()}
      {renderAllergyDesc()}
      {renderMessage()}
      <div className="formField">
        <button className="btn" type="submit">
          Küldés
        </button>
      </div>
    </form>
  );
}
