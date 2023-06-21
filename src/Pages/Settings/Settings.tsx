import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getTranslation } from "../../Transtalion";
import { LangContext } from "../../Providers/Language/LangProvider";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import classNames from "classnames";
import useLocaleStorage from "../../Components/Helpers/LocaleStorage/LocaleStorageIndex";
import updateSeachParams from "../../Components/Helpers/UpdateSearchParams/UpdateSearchParamsIndex";
import './Settings.scss';
import RangeInput from "../../Components/RangeInput/RangeInputIndex";

export const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rangeParams, setRangeParams] = useLocaleStorage('rangeParams', {}); 

  const [actionInterval, setActionInterval] = useState(searchParams.get('actionInterval') || 2);
  const [isActionInterval, setIsActionInterval] = useState(false);

  const [customInterval, setCustomInterval] = useState(searchParams.get('customInterval') || 0);
  const [isCustomInterval, setIsCustomInterval] = useState(false);

  const { lang } = useContext(LangContext);
  const { isLight } = useContext(ThemeContext);

  const onActionRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setActionInterval(value)
    setSearchParams(updateSeachParams(searchParams, {actionInterval: value}))
  }

  function onCustomActionRangaChange(event: React.ChangeEvent<HTMLInputElement>, name: string) {
    const { value } = event.target;
    setCustomInterval(value)
    setSearchParams(updateSeachParams(searchParams, {customInterval :value}))
  }


  // const paramsChange = useCallback(() => {
  //   setRangeParams({
  //     actionInterval: actionInterval,
  //   })
  // }, [actionInterval])

  // useEffect(() => {
  //   paramsChange();
  // }, [actionInterval])

  return (
    <section
      // className="settings"
      className={classNames('settings', 'dark--settings', {'light--settings': isLight})}
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