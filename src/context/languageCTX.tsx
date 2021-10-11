import { createContext, useState } from 'react';
import { Languages } from '../../utils/types/commonTypes';

const ChangeLanguageContext = createContext({
  changingLanguage: (v: Languages): void => {},
  activeLanguage: 'fa',
});

export const ChangeLanguageContextProvider = ({ children }) => {
  const [local, setLocal] = useState('fa');

  const handelingChangeLanguage = (lan: Languages) => { 
    setLocal(lan);
  };

  const context = {
    activeLanguage: local,
    changingLanguage: handelingChangeLanguage,
  };

  return (
    <ChangeLanguageContext.Provider value={context}>
      {children}
    </ChangeLanguageContext.Provider>
  );
};

export default ChangeLanguageContext;
