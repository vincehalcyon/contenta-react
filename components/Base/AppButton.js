import React from 'react';
import * as AntdIcons from "react-icons/ai";
const AppButton = ({
  icon,
  iconSize,
  disabled,
  customTheme,
  customDisabledTheme,
  badge,
  onPress,
  labelClass,
  label,
  name,
  type,
}) => {
  const Icon = AntdIcons[icon] 

  return (
    <button
      name={name ? name : ''}
      className={
        disabled ? `${customDisabledTheme} text-gray-500 bg-gray-300 hover:bg-gray-300 py-1 cursor-not-allowed` : null +
        customTheme ? `${customTheme} transition duration-300 ease-in-out focus:outline-none` :'transition duration-300 ease-in-out py-1 focus:outline-none'+
        badge && icon ? 'flex items-center justify-between' : ''+
        icon ? 'flex items-center' : null 
      }
      disabled={disabled}
      type={type ? type : 'button'}
      onClick={onPress}
    >
      <div className={[icon ? 'flex ' + labelClass : 'text-center' + labelClass]}>
        <div>
          {icon ? <Icon size={iconSize ? iconSize : 20} /> : ''}
        </div>
        {
          label 
          ? <div className={'px-2'}>{ label }</div>
          : <></>
        }
        
      </div>
    </button>
  )
}

export default AppButton
