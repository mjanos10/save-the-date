// @ts-check

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

import './Form.css';

import FormField from './FormField';

import { saveData } from '../services/api';

/**
 * @param {boolean} isPlural
 * @returns string
 */
const getUnsetSelectLabel = (isPlural) => {
  return `-- Kérjük válassz${isPlural ? 'atok' : ''} --`;
};

const getIsComingOptions = (isPlural) => [
  ['', getUnsetSelectLabel(isPlural)],
  ['yes', 'Igen, mindenképp!'],
  ['no', isPlural ? 'Nem fogunk tudni sajnos :(' : 'Nem fogok tudni sajnos :('],
  ['not-sure', isPlural ? 'Még nem tudjuk' : 'Még nem tudom'],
];

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
 *
 * @param {boolean} isPlural
 * @param {import('../../../shared/types').FormYesNoUnsure} isComing
 * @returns
 */
const getMessageLabel = (isPlural, isComing) => {
  if (isComing === 'yes') {
    return 'Bármi egyéb, ami nem fért máshova?';
  }

  let prefix = isComing === 'not-sure' ? 'Nem probléma.' : 'Nagyon sajnáljuk!';

  return `${prefix} Ha szeretnétek üzenni valamit, itt megtehetitek.`;
};

/**
 *
 * @param {import('../../../shared/types').FormData} data
 * @returns {import('../../../shared/types').FormData}
 */
const sanitizeData = (data) => {
  if (data.isComing === 'yes') {
    return data;
  }
  return {
    isComing: data.isComing,
    message: data.message,
    specialDietaryNeedsDesc: '',
    bringingChildren: 'no',
    childrenDesc: '',
    hasSpecialDietaryNeeds: 'no',
    plusOne: 'no',
    requiresAccommodation: 'no',
  };
};

/**
 * @param {Object} props
 * @param {import('../../../shared/types').PageData} props.pageData
 */
export default function Form({ pageData }) {
  const {
    canBringPlusOne,
    peopleCount,
    askChildren,
    multipleChildren,
  } = pageData;

  const isPlural = peopleCount > 1;

  const formRef = useRef(null);

  const { register, handleSubmit, errors, watch, reset } = useForm({
    defaultValues: {
      isComing: pageData.isComing,
      message: pageData.message,
      plusOne: pageData.plusOne,
      requiresAccommodation: pageData.requiresAccommodation,
      hasSpecialDietaryNeeds: pageData.hasSpecialDietaryNeeds,
      specialDietaryNeedsDesc: pageData.specialDietaryNeedsDesc,
      bringingChildren: pageData.bringingChildren,
      childrenDesc: pageData.childrenDesc,
    },
  });

  const { isComing, hasSpecialDietaryNeeds, bringingChildren } = watch();

  console.log('rerender', isComing, hasSpecialDietaryNeeds);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

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
    hasSpecialDietaryNeeds: {
      label: isPlural
        ? 'Van valamelyikőtöknek étel allergiája?'
        : 'Van étel allergiád?',
      yes: 'Van',
      no: 'Nincs',
    },
    specialDietaryNeedsDesc: {
      label: isPlural ? `Mire vagytok allergiásak?` : 'Mire vagy allergiás?',
    },
    message: {
      label: getMessageLabel(isPlural, isComing),
    },
  };

  async function onSubmit(data) {
    console.log(data);
    setIsSubmitting(true);

    try {
      const response = await saveData(pageData.id, sanitizeData(data));
      if (!response.success) {
        setIsSuccess(false);
        setIsSubmitting(false);
        setSubmitError(
          'Hiba történt a beküldés során. Légyszi nézdd át, hogy mindent jól küldtél-e be.'
        );
        return;
      }
      console.log('Submitted', response);
      setIsSuccess(true);
      reset();

      formRef.current.scrollIntoView();
    } catch (error) {
      console.error('Error while submitting', error);
    }

    setIsSubmitting(false);
  }

  let formContentClasses = 'form__content';
  if (isSubmitting) {
    formContentClasses += ' form__content--isSubmitting';
  } else if (isSuccess) {
    formContentClasses += ' form__content--isSuccess';
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form" ref={formRef}>
      {isSuccess ? (
        <div className={formContentClasses}>Köszönjük szépen!</div>
      ) : (
        <div className={formContentClasses}>
          <FormField
            fieldId="is-coming"
            label={labels.isComing.label}
            error={errors.isComing}
          >
            <select
              id="is-coming"
              name="isComing"
              ref={register({ required: true })}
            >
              {getIsComingOptions(isPlural).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>

          {canBringPlusOne && isComing === 'yes' && (
            <FormField
              fieldId="plus-one"
              label={labels.plusOne.label}
              error={errors.plusOne}
            >
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
              error={errors.requiresAccommodation}
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
              error={errors.bringingChildren}
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
              error={errors.childrenDesc}
            >
              <textarea
                id="children-description"
                name="childrenDesc"
                ref={register({ required: true })}
              />
            </FormField>
          )}

          {isComing === 'yes' && (
            <FormField
              fieldId="has-special-dietary-needs"
              label={labels.hasSpecialDietaryNeeds.label}
              error={errors.hasSpecialDietaryNeeds}
            >
              <select
                id="has-special-dietary-needs"
                name="hasSpecialDietaryNeeds"
                ref={register({ required: true })}
              >
                {getYesNoOptions(
                  isPlural,
                  labels.hasSpecialDietaryNeeds.yes,
                  labels.hasSpecialDietaryNeeds.no
                ).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </FormField>
          )}

          {isComing === 'yes' && hasSpecialDietaryNeeds === 'yes' && (
            <FormField
              fieldId="special-dietary-needs-description"
              label={labels.specialDietaryNeedsDesc.label}
              error={errors.specialDietaryNeedsDesc}
            >
              <textarea
                id="special-dietary-needs-description"
                name="specialDietaryNeedsDesc"
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
              <textarea id="message" name="message" ref={register} />
            </FormField>
          )}
          <div className="formField">
            <button className="btn btn--primary" type="submit">
              Küldés
            </button>
          </div>
          {submitError && (
            <div className="form__msg form__msg--error">{submitError}</div>
          )}
          <div className="form__loading" onClick={() => setIsSubmitting(false)}>
            Egy pillanat...
          </div>
        </div>
      )}
    </form>
  );
}
