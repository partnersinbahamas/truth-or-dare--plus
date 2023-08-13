import React, { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getTranslation } from "../../Transtalion";
import { LangContext } from "../../Providers/Language/LangProvider";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";

import useLocaleStorage from "../../Components/Helpers/LocaleStorage/LocaleStorageIndex";
import updateSeachParams from "../../Components/Helpers/UpdateSearchParams/UpdateSearchParamsIndex";
import RangeInput from "../../Components/RangeInput/RangeInputIndex";

import classNames from "classnames";
import './Settings.scss';

export const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rangeParams, setRangeParams] = useLocaleStorage('rangeParams', {}); 

  const [actionInterval, setActionInterval] = useState<string>(
    searchParams.get('actionInterval') || '2');
  
  const [isActionInterval, setIsActionInterval] = useState<boolean>(false);

  const [customInterval, setCustomInterval] = useState<string>(searchParams.get('customInterval') || '0');

  const [isCustomInterval, setIsCustomInterval] = useState<boolean>(false);

  const { lang } = useContext(LangContext);
  const { isLight } = useContext(ThemeContext);

  const onActionRangeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setActionInterval(value)
    setSearchParams(updateSeachParams(searchParams, {actionInterval: value}))
  }

  function onCustomActionRangaChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setCustomInterval(value)
    setSearchParams(updateSeachParams(searchParams, {customInterval :value}))
  }

  return (
    <section
      className={classNames(
        'settings',
        'dark--settings',
        {'light--settings': isLight}
      )}
    >
      <h1>{getTranslation('settings.title', lang)}</h1>

      <form className="settings__form" onSubmit={(event) => event.preventDefault()}>
        <RangeInput
          paramInterval={actionInterval}
          setIsParamInterval={setIsActionInterval}
          isParamInterval={isActionInterval}
          onRangeChange={onActionRangeChange}
          title={'action'}
        />

        <RangeInput
          paramInterval={customInterval}
          setIsParamInterval={setIsCustomInterval}
          isParamInterval={isCustomInterval}
          onRangeChange={onCustomActionRangaChange}
          title={'custom'}
        />
      </form>
    </section>
  )
}
