import React, { useState } from 'react'
import AppButton from "/components/Base/AppButton";
const Input = props => {
  const {
    size,
    name,
    type,
    onChange,
    onKeyDown,
    inputClass, // classes for input
    wrapperClass,
    label,
    checked, //for single checkbox
    required,
    maxLength,
    value,
    defaultValue,
    disabled,
    items,
    placeholder,
    error, // error message
    multiple = false, //for select
    limit,
    limitGuide=false,
    horizontalInput = false,
    rows, //for textarea
    cols,
    prefix,
    onBlur,
    onFocus,
    onClick,
    max,
    //counter,
    counter,
    // For Multi-checkbox
    list,
    showSelectAll,
    // checkbox
    shade,
    id,
    classNames,
    showButton, //for button
    buttonIcon,
    buttonLabel,
    buttonAction,
    buttonStyle,
  } = props
  const checkboxInput = () => {
    if (type === 'checkbox') {
      return (
        <div className={`flex items-center ${inputClass ? inputClass : ''}`}>
          <input
            className={`mr-2 cb-${name} ${shade ? 'shaded' : ''}`}
            onBlur={onBlur} type="checkbox"
            name={name}
            id={`${name}-id`}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            required={required} />
          <label className={`lbl-${name}`} htmlFor={`${name}-id`}>{label}</label>
        </div>
      )
    } else if (type === 'multi-checkbox') {
      return (
        <>
          {label && <label className={`lbl-${name} text-gray-700 mr-2`}>{label}{required && <span className="text-red-600 pl-1">*</span>}</label>}
          {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          {showSelectAll && 
            <div className={`flex items-center ${inputClass}`}>
              <input 
                className={`mr-2 cb-${name}-all focus:outline-none`}
                onBlur={onBlur} 
                type="checkbox"
                name={ name + '-all' }
                id={`${name}-all`}
                checked={!list.filter(item=> item.value === false).length}
                onChange={e => onSelectAll(e)}
                required={required}
              />
              <label className={`lbl-${name}-all`} htmlFor={`${name}-all`}>Select All</label>
            </div>
          }
          {list.map((item, index) => {
            return (
              <div key={index} className={`flex items-center ${inputClass}`}>
                <input 
                  className={`mr-2 cb-${name}-${index}`}
                  onBlur={onBlur} 
                  type="checkbox"
                  name={ name + '-' + index }
                  id={`${name}-${index}-id`}
                  checked={item.value}
                  disabled={item.disabled}
                  onChange={e => onCheckboxChange(e, index)}
                  required={item.required}
                />
                <label className={`lbl-${name}-${index}`} htmlFor={`${name}-${index}-id`}>{item.label}{item.required && <span className="text-red-600 pl-1">*</span>}</label>
            </div>
            )
          })}
        </>
      )
    }

  }

  const onSelectAll = (e) => {
    let checked = e.target.checked
    let tempList = [...list] 
    tempList.forEach(item => {
      item.value = checked
    })
    //returns new list with updated values
    onChange(tempList)
  }

  const onCheckboxChange = (e, index) => {
    let tempList = [...list] 
    let selectedItem = tempList.find((item, i) => i === index)
    selectedItem.value = e.target.checked
    //returns new list with updated values
    onChange(tempList)
  }

  const selectInput = () => {
    return (
      <>
        {label && <label className={`lbl-${name} mr-2 text-contenta-greyish-brown ${horizontalInput ? 'mt-2' : ''}`}>{label}{required && <span className="text-red-600 pl-1">*</span>}</label>}
        <div className={`select-wrapper relative bg-transparent border cursor-pointer flex justify-between items-center cursor-pointer relative text-contenta-greyish-brown  ${inputClass ? inputClass : ''}`} >
          <select 
            value={value} 
            onChange={onChange} 
            multiple={multiple} 
            disabled={disabled} 
            onBlur={onBlur} 
            className={`slct-${name} ${classNames} w-full bg-transparent cursor-pointer py-2 px-2 z-10 ${disabled?'text-gray-400 cursor-not-allowed' : ''}`}>
            {placeholder ? <option disabled value="">{placeholder}</option> : ''}
            {items && items.map((option, index) => {
              return <option key={index} value={option.value} disabled={option.disabled}>{option.label}</option>
            })}
          </select>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </>
    )
  }

  const radioInput = () => {
    return (
      <div className={`flex ${inputClass ? inputClass : ''}`}>
        <input
          className={`mr-2 mt-1 cursor-pointer rbtn-${name}`}
          onBlur={onBlur}
          type="radio"
          name={name}
          id={id}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          required={required}
        />
        <label className={`lbl-${name}`} htmlFor={`${name}-id`}>{label}</label>
      </div>
    )
  }

  const [showPassword, setShowPassword] = useState('password')

  return (
    <div className={`relative text-sm ${wrapperClass ? wrapperClass : ''}` }>
      
      <div className={horizontalInput ? 'flex justify-between flex-col md:flex-row' : ''}>
        {!['select', 'checkbox', 'multi-checkbox', 'radio',].includes(type) ? 
          <>
            <div className={`flex ${label ? 'justify-between mr-4' : 'justify-end mr-1'} `}>
              {label && <label className={`lbl-${name} w-full text-gray-700 mr-2 ${horizontalInput ? 'mt-1' : ''}`}>{label}{required && <span className="text-red-600 pl-1">*</span>}</label>}
              {
                counter && limit 
                ? <div className="flex justify-end text-xs">
                    {counter}/{limit}
                  </div>
                : <></>
              }
            </div>
            
            
            <div className="w-full">
              <div className={`w-full input border text-sm flex items-center transition-all ${inputClass ? inputClass : ''} ${disabled && 'bg-gray-100 text-gray-500 cursor-not-allowed'} `}>
                {prefix && <span className="pr-2">{prefix}</span>}
                {type === 'search' ? <svg className="fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg> : ''}
                {type !== 'textarea' ?
                  <div className="flex flex-row">
                    <input
                      id={id}
                      size={size}
                      className={`
                        ipt-${name} ${error ? 'border-1 border-contenta-pinky-red' : ''} 
                        ${classNames} focus:outline-none appearance-none w-full bg-transparent ${disabled && 'cursor-not-allowed'}
                        ${type === 'number' ? 'text-center' : ''}
                      `}
                      maxLength={limit}
                      name={name}
                      disabled={disabled}
                      value={value}
                      defaultValue={defaultValue}
                      type={type === 'password' ? showPassword : type}
                      placeholder={placeholder}
                      onChange={onChange}
                      onClick={onClick}
                      onBlur={onBlur} 
                      onFocus={onFocus} 
                      required={required}
                      min={type === 'number' ? 0 : null}
                      max={max}
                      onKeyDown={onKeyDown}
                    />
                    {showButton 
                      ? <AppButton
                          label={buttonLabel}
                          onPress={buttonAction}
                          customTheme={buttonStyle}
                          icon={buttonIcon}
                        /> 
                      : ''
                    }
                  </div>
                  : 
                  <textarea 
                    value={value} 
                    onChange={onChange} 
                    name={name} 
                    maxLength={limit} 
                    rows={rows}
                    cols={cols} 
                    disabled={disabled} 
                    required={required} 
                    className={`${classNames} txta-${name} focus:outline-none w-full resize-none`}
                  />
                }
                {limit && limitGuide && <span className="text-gray-400 text-xs pr-1">{value.length}/{limit}</span>}
                {type === 'password' && <span className="cursor-pointer text-gray-500 hover:text-gray-600" onClick={() => showPassword === 'password' ? setShowPassword('text') : setShowPassword('password')}>
                  {showPassword === 'text' ? 
                  <svg xmlns="http://www.w3.org/2000/svg" className="fill-current" width="18" height="18" viewBox="0 0 24 24"><path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z"/></svg>
                    : 
                  <svg xmlns="http://www.w3.org/2000/svg" className="fill-current" width="18" height="18" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 7.449-11.985 7.449c-7.18 0-12.015-7.449-12.015-7.449s4.446-6.551 12.015-6.551c7.694 0 11.985 6.551 11.985 6.551zm-7 .449c0-2.761-2.238-5-5-5-2.761 0-5 2.239-5 5 0 2.762 2.239 5 5 5 2.762 0 5-2.238 5-5z"/></svg>
                }
                </span>}
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
            </div>
          </>
          :
          ['multi-checkbox', 'checkbox'].includes(type) ? checkboxInput() :
          type === 'select' ? selectInput() :
          type === 'radio' ? radioInput() : ''      
        }
      </div>
    </div>
  )

}

export default Input