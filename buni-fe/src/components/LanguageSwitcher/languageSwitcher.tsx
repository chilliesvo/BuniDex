import React from 'react';
import { useTranslation } from 'react-i18next';
import { Popover, Select } from 'antd';

const { Option } = Select;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language;

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const content = () => {
    return (
      <div className="flex flex-col gap-2">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => changeLanguage('vi')}
        >
          <img src="/images/flag/vn.png" alt="Vietnames" height={15} />{' '}
          <span className={`${currentLang === 'vi' && 'font-bold'}`}>
            Vietnamese
          </span>
        </div>

        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => changeLanguage('en')}
        >
          <img src="/images/flag/en.png" alt="english" height={15} />
          <span className={`${currentLang === 'en' && 'font-bold'}`}>
            English
          </span>
        </div>
      </div>
    );
  };

  return (
    <Popover placement="bottom" content={content} trigger="click">
      {currentLang === 'vi' ? (
        <img
          src="/images/flag/vn.png"
          alt="Vietnames"
          height={15}
          className="cursor-pointer"
        />
      ) : (
        <img
          src="/images/flag/en.png"
          alt="English"
          height={15}
          className="cursor-pointer"
        />
      )}
    </Popover>
  );
};

export default LanguageSwitcher;
