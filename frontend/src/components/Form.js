import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Form.css';

import FormField from './FormField';

/**
 * @param {boolean} isPlural
 * @returns string
 */
const getUnsetSelectLabel = (isPlural) => {
  return `-- Kérjük válassz${isPlural ? 'atok' : ''} --`;
};

const getPlusOneOptions = (isPlural) => [
  ['', getUnsetSelectLabel(isPlural)],
  ['not-sure', isPlural ? 'Még nem tudjuk' : 'Még nem tudom'],
  ['yes', isPlural ? 'Igen, szeretnénk' : 'Igen, szeretnék'],
  ['no', isPlural ? 'Nem fogunk' : 'Nem fogok'],
];

const getYesNoOptions = (isPlural, yes = 'Igen', no = 'Nem') => [
  ['', getUnsetSelectLabel(isPlural)],
  ['yes', yes],
  ['no', no],
];

const getBringingChildrenLabel = (isPlural, multipleChildren) => {
  const start = isPlural ? 'Szeretnétek' : 'Szeretnéd';
  let end;
  if (isPlural) {
    end = multipleChildren ? 'gyerekeiteket' : 'gyereketeket';
  } else {
    end = multipleChildren ? 'gyerekeidet' : 'gyerekedet';
  }
  return `${start} hozni a ${end}?`;
};

const getChildrenDescLabel = (isPlural, multipleChildren) => {
  if (isPlural && multipleChildren) {
    return 'Hány évesek gyerekeitek vannak?';
  }
  if (isPlural && !multipleChildren) {
    return 'Hány éves gyereketek van?';
  }
  if (multipleChildren) {
    return 'Hány éves gyerekeid vannak?';
  }
  return 'Hány éves gyereked van?';
};

/**
 * @param {Object} props
 * @param {import('../types').PageData} props.pageData
 */
export default function Form({ pageData }) {
  const {
    canBringPlusOne,
    peopleCount,
    askChildren,
    multipleChildren,
  } = pageData;

  const isPlural = peopleCount > 1;

  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      isComing: pageData.isComing,
      message: pageData.message,
      plusOne: pageData.plusOne,
      requiresAccommodation: pageData.requiresAccommodation,
      hasAllergy: pageData.hasAllergy,
      allergyDesc: pageData.allergyDesc,
      bringingChildren: pageData.bringingChildren,
      childrenDesc: pageData.childrenDesc,
    },
  });

  const { isComing, hasAllergy, bringingChildren } = watch();

  console.log('rerender', isComing, hasAllergy);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const labels = {
    isComing: {
      label: `${isPlural ? 'Tudtok' : 'Tudsz'} jönni az esküvőre?`,
      yes: `Igen, ${isPlural ? 'tudunk' : 'tudok'} jönni!`,
      no: `Sajnos nem ${isPlural ? 'tudunk' : 'tudok'} jönni :(`,
    },
    plusOne: {
      label: `${isPlural ? `Szeretnétek` : 'Szeretnél'} hozni +1 főt?`,
    },
    requiresAccommodation: {
      label: isPlural ? 'Igényeltek szállást?' : 'Igényelsz szállást?',
      yes: 'Igen',
      no: 'Nem',
    },
    bringingChildren: {
      label: getBringingChildrenLabel(isPlural, multipleChildren),
      yes: 'Igen',
      no: 'Nem',
    },
    childrenDesc: {
      label: getChildrenDescLabel(isPlural, multipleChildren),
    },
    hasAllergy: {
      label: isPlural
        ? 'Van valamelyikőtöknek étel allergiája?'
        : 'Van étel allergiád?',
      yes: 'Van',
      no: 'Nincs',
    },
    allergyDesc: {
      label: isPlural ? `Mire vagytok allergiásak?` : 'Mire vagy allergiás?',
    },
    message: {
      label: 'Bármilyen egyéb megjegyzés',
    },
  };

  async function onSubmit(e) {
    console.log(e);
    setIsSubmitting(true);

    try {
      console.log('Submitted');
    } catch (error) {
      console.error('Error while submitting', error);
    }

    setIsSubmitting(false);
  }

  let formContentClasses = 'form__content';
  if (isSubmitting) {
    formContentClasses += ' form__content--isSubmitting';
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className={formContentClasses}>
        <FormField fieldId="is-coming" label={labels.isComing.label}>
          <select
            id="is-coming"
            name="isComing"
            ref={register({ required: true })}
          >
            {getYesNoOptions(
              isPlural,
              labels.isComing.yes,
              labels.isComing.no
            ).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </FormField>

        {canBringPlusOne && isComing === 'yes' && (
          <FormField fieldId="plus-one" label={labels.plusOne.label}>
            <select
              id="plus-one"
              name="plusOne"
              ref={register({ required: true })}
            >
              {getPlusOneOptions(isPlural).map(([key, label]) => (
                <option key={label} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>
        )}

        {isComing === 'yes' && (
          <FormField
            fieldId="requires-accommodation"
            label={labels.requiresAccommodation.label}
          >
            <select
              id="requires-accommodation"
              name="requiresAccommodation"
              ref={register({ required: true })}
            >
              {getYesNoOptions(
                isPlural,
                labels.requiresAccommodation.yes,
                labels.requiresAccommodation.no
              ).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>
        )}

        {askChildren && isComing === 'yes' && (
          <FormField
            fieldId="bringing-children"
            label={labels.bringingChildren.label}
          >
            <select
              id="bringing-children"
              name="bringingChildren"
              ref={register({ required: true })}
            >
              {getYesNoOptions(
                isPlural,
                labels.bringingChildren.yes,
                labels.bringingChildren.no
              ).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>
        )}

        {askChildren && isComing === 'yes' && bringingChildren === 'yes' && (
          <FormField
            fieldId="children-description"
            label={labels.childrenDesc.label}
          >
            <textarea
              id="children-description"
              name="childrenDesc"
              ref={register({ required: true })}
            />
          </FormField>
        )}

        {isComing === 'yes' && (
          <FormField fieldId="has-allergy" label={labels.hasAllergy.label}>
            <select
              id="has-allergy"
              name="hasAllergy"
              ref={register({ required: true })}
            >
              {getYesNoOptions(
                isPlural,
                labels.hasAllergy.yes,
                labels.hasAllergy.no
              ).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>
        )}

        {isComing === 'yes' && hasAllergy === 'yes' && (
          <FormField
            fieldId="allergy-description"
            label={labels.allergyDesc.label}
          >
            <textarea
              id="allergy-description"
              name="allergyDesc"
              ref={register({ required: true })}
            />
          </FormField>
        )}

        {isComing !== '' && (
          <FormField
            fieldId="message"
            label={labels.message.label}
            error={errors.message}
          >
            <textarea
              id="message"
              name="message"
              ref={register({ required: true })}
            />
          </FormField>
        )}
        <div className="formField">
          <button className="btn btn--primary" type="submit">
            Küldés
          </button>
        </div>
        <div className="form__loading" onClick={() => setIsSubmitting(false)}>
          Egy pillanat...
        </div>
      </div>
    </form>
  );
}
