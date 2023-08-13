import React, { useContext, useEffect, useState, useMemo } from "react";

import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { LangContext } from "../../Providers/Language/LangProvider";

import { action, ModeType } from "../../Types/Mode";
import { modes } from "../Helpers/Variables";

import { useLocalStorage } from "usehooks-ts";
import { useSessionStorage } from "usehooks-ts";

import Button from "../Buttons/Button/ButtonIndex";
import ButtonReverse from "../Buttons/ButtonReverse/ButtonReverseIndex";
import ButtonSmall from "../Buttons/ButtonSmall/ButtonSmallIndex";
import GameStart from "./GameStart/GameStartIndex";
import Loader from "../Loader/Loaderindex";
import Modal from "../../Modals/Modal/ModalIndex";
import CustomActionModal from "../../Modals/CustomActionModal/CustomActionModalIndex";
import TranslateTo from "../TranslateTo/TranslateToIndex";

import { Player } from "../../Types/Player";
import { useSearchParams } from "react-router-dom";

import classNames from "classnames";
import './Game.scss';

export const Game = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const actionInterval = searchParams.get('actionInterval') || '2';
  const customInterval = searchParams.get('customInterval') || '0';

  const { isLight } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  const [modeType, setModeType] = useLocalStorage<string | null>('mode', null);
  const [players, setPlayers] = useLocalStorage<Player[]>('players', []);

  const mode: ModeType | any = modes.find((el) => el.type === modeType);

  const [isGame, setIsGame] = useSessionStorage<boolean>('isGame', false);

  const [questions, setQuestion] = useSessionStorage<action[]>('questions', []);
  const [dares, setDares] = useSessionStorage<action[]>('dares', []);

  const [isQuestion, setIsQuestion] = useSessionStorage<boolean>('isQuestion', true);

  const [questionIndex, setQuestionIndex] = useSessionStorage<number>('questionIndex', 0); 
  const [dareIndex, setDareIndex] = useSessionStorage<number>('dareIndex', 0);
  const [playerIndex, setPlayerIndex] = useSessionStorage<number>('playerIndex', 0);

  const [isChoosed, setIsChoosed] = useSessionStorage<boolean>('isActionChoosed', false);
  const [isTruthDisabled, setIsTruthDisabled] = useState<boolean>(false);
  const [isDareDisabled, setIsDaresDisabled] = useState<boolean>(false);

  const [countActions, setCountActions] = useState<number>(0); 
  const [countOf, setCountOf] = useState<number>(0);

  const [isCustomActionModal, setIsCustomActionModal] = useState<boolean>(false);
  const [translatedToLang, setTranslatedToLang] = useState<string>(lang);

  let currentQuestion = questions[questionIndex].action;
  let currentDare = dares[dareIndex].action;
  let currentPlayer = players[playerIndex];
  let translatedAction = useMemo(() => setTranslated(), [translatedToLang]);

  const [isMove, setIsMove] = useState<boolean>(false);

  function setTranslated() {
    let translated: action;
    let currentActionArray: action[];
    let action: string;

    if (isQuestion) {
      currentActionArray = mode.questions;
      action = currentQuestion;
    } else {
      currentActionArray = mode.dare;
      action = currentDare;
    }

    let findedElement = currentActionArray[lang]
      .find((dare: action) => dare.action === action);

    translated = currentActionArray[translatedToLang]
      .find((dare: action) => dare.id === findedElement.id);

    return translated;
  };

  const setParams = (data: action[], index: number, func: Function) => {
    if (index === data.length - 1) {
      setDareIndex(0);
    } else if (countOf && countOf === +customInterval) {
      setIsCustomActionModal(true);
      setCountOf(0);
    } else {
      func((current: number) => current + 1);
      setCountOf((current: number) => current + 1);
    }
  }

  const onQuestion = () => {
    setIsQuestion(true);
    setIsChoosed(true);
    setIsMove(true);
    setIsDaresDisabled(true);
    setIsTruthDisabled(true);

    setParams(mode.questions[lang], questionIndex, setQuestionIndex);
  }

  const onDare = () => {
    setIsQuestion(false);
    setIsChoosed(true);
    setIsMove(true);
    setIsDaresDisabled(true);
    setIsTruthDisabled(true);
    setCountActions(0);

    setParams(mode.dare[lang], dareIndex, setDareIndex);
  }

  useEffect(() => {
    setCountActions((current: number) => current + 1);
  }, [questionIndex])

  const onPlayers = () => {
    setIsMove(!isMove);
    setIsChoosed(false);
    setIsDaresDisabled(false);
    setTranslatedToLang(lang);


    if (+actionInterval && countActions >= +actionInterval) {
      console.log('block');
      setCountActions(0);
      setIsTruthDisabled(true)
    } else {
      setIsTruthDisabled(false);
    }

    if (playerIndex === players.length - 1) {
      setPlayerIndex(0);
    } else {
      setPlayerIndex((current) => current + 1);
    }
  }

  const onGameStart = () => {
    setIsGame(true);
    setIsMove(true);
  }

  function wait (func: Function, param: boolean) {
    setTimeout(() => {
      func(param);
    }, 500)
  }

  const onModalHandleClose = (value: boolean) => {
    setIsCustomActionModal(value);
    onPlayers();
  }

  useEffect(() => {
    wait(setIsMove, false);
  }, [isMove]);   

  return (
    <section className="game">
      <div
        className={classNames('game__box',
          'dark--game',
          {'light--game': isLight},
        )}
        style={{animation: isMove ? 'rotateY .5s linear': ''}}
      >

        {isMove ? (
          <div className="game__loader">
            <Loader/>
          </div>
        ) : (
          <>
            {!isGame ? (
              <div className="game__loader">
                <GameStart title='start'/>
              </div>
            ) : (
              <div className="game__front">
                <h1>{currentPlayer.name}</h1>

                {!isCustomActionModal ? (
                  <>
                    {isChoosed ? (
                      <div
                        className={classNames(
                          'game__action',
                          'dark--game-actions',
                          {'light--game-actions': isLight}
                        )}
                      >
                        {translatedToLang !== lang ? (
                          <span>{translatedAction.action}</span>
                        ) : (
                          <>
                            {isQuestion ? (
                              <p>{currentQuestion}</p>
                            ) : (
                              <p>{currentDare}</p>
                            )}
                          </>
                        )} 

                        <TranslateTo setTranslatedLang={setTranslatedToLang}/>
                      </div>
                    ) : (
                      <GameStart title='truth|dare'/>
                    )}
                  </>
                ) : (
                  <div style={{ marginTop: '100px' }}>
                    <Loader/>
                  </div>
                )}

                {isCustomActionModal && (
                  <Modal setModal={onModalHandleClose}>
                    <CustomActionModal isQuestion={isQuestion} player={currentPlayer}/>
                  </Modal>
                )}

  
                <div className="game__buttons">
                  <Button action={onQuestion} title='truth' isDisabled={isTruthDisabled}/>
                  <ButtonReverse action={onDare} title='dare' isDisabled={isDareDisabled}/>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ButtonSmall 
        action={isGame ? onPlayers : onGameStart}
        title={isGame ? 'next' : 'start'}
      />
    </section>
  );
};
