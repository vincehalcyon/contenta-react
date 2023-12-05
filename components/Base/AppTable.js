import React, { useState } from 'react'
import { useRouter } from 'next/router'
import AppInput from '/components/Base/AppInput'
import AppPagination from '/components/Base/AppPagination'
import AppLoading from '/components/Base/AppLoading'

const Table = (props) => {
  const router = useRouter()
  const {
    data = [], // data to be used for table
    columns,  // for header and to get the dataIndex to be used to get the data displayed on table
    to, // for clickable row, route will be '${to}/${data.id}'
    selectable, // to enable checkbox per row
    wrapperClass,
    selectedKeys = [], // for checkbox per row, pass array of selected index
    setSelectedKeys, // for checkbox per row, returns array of selected index
    loading = false,
    // Pagination Props
    pagination, 
    paginationType, 
    onPaginate,
    hideTotal,
    paginationClass,
    pageClass,
    activePageClass,
    emptyText = "No Data",
    minWidth
  } = props
  
  const getDataCell = (item, col) => {
    let display = []
    if (typeof col.dataIndex === 'object') {
      // for multiple data index
      let data = ''
      col.dataIndex.map((d, index) => {
        data += item[d]
        index !== col.dataIndex.length - 1 ? (data += ' ') : ''
      })
      return data
    } else if (typeof item[col.dataIndex] === 'boolean') {
      // for boolean type of value
      return item[col.dataIndex] === true ? 'Yes' : 'No'
    } else if (typeof item[col.dataIndex] === 'object') {
      // for object type of value
      let displayData = ''
      item[col.dataIndex] ? item[col.dataIndex].map(
        (data, index) =>
          (displayData += `${data.name}${
            item[col.dataIndex] > 1 && item[col.dataIndex].length - 1 !== index
              ? ', '
              : ''
          }`)
      ) : ''
      return displayData
    } else if (col.slot) {
      // for customize display, returns item to the outside world
      return col.slot(item)
    }
    // basic display
    return item[col.dataIndex]
  }

  const onRowClick = (e, id) => {
    // if row is clickable
    if (to) {
      router.push(`${to}/${id}`)
    } else {
      return
    }
  }

  return (
    <>
      <div className={`overflow-x-auto ${wrapperClass} p-4`}>
        {/* min width of the whole table for scrolling */}
        {loading ? (
          <div className="flex justify-center">
            <AppLoading/>
          </div>
        ) : (
          <div hidden={loading} style={{ minWidth: minWidth ? `${minWidth}px` : '1024px'}}>
            <div className='flex items-center border-t-1 border-contenta-gray shadow-lg text-contenta-blue py-1 px-2 rounded-t-xxl'>
              {/* Table Header */}
              <div hidden={!selectable}>
                <AppInput
                  name='checkAllRows'
                  type='checkbox'
                  checked={selectedKeys.length === data.length}
                  onChange={() => {
                    if (data.length === selectedKeys.length) {
                      setSelectedKeys([])
                    } else {
                      setSelectedKeys(Array.from(Array(data.length).keys()))
                    }
                  }}
                />
              </div>
              {columns &&
                columns.map((col, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        minWidth: col.width ? `${col.width}px` : 'unset',
                        maxWidth: col.width ? `${col.width}px` : 'unset',
                      }}
                      className={`flex-1 h-full px-2 text-sm py-4 font-medium ${col.class}`}
                    >
                      {col.name}
                    </div>
                  )
                })}
            </div>
            <div className='flex flex-col px-3 shadow-lg rounded-b-xxl'>
              {/* Table Body */}
              {(data &&
                data.length) ?
                data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex items-center py-1 text-gray-700 ${
                        index !== data.length - 1 ? 'border-b-1 border-default' : ''
                      } ${to ? 'hover:bg-[#e9f5f2] cursor-pointer' : ''}`}
                      onClick={(e) => onRowClick(e, item.id)}
                    >
                      <div hidden={!selectable}>
                        <AppInput
                          name={`row-${index}`}
                          type='checkbox'
                          checked={selectedKeys && selectedKeys.includes(index)}
                          onChange={(e) => {
                            let tempKeys = [...selectedKeys]
                            if (tempKeys.includes(index)) {
                              let arrIndex = tempKeys.findIndex(
                                (item) => item === index
                              )
                              tempKeys.splice(arrIndex, 1)
                            } else {
                              tempKeys.push(index)
                            }
                            setSelectedKeys(tempKeys)
                          }}
                        />
                      </div>
                      {columns &&
                        columns.map((column, i) => {
                          return (
                            <div
                              key={i}
                              // for fixed size of data cell
                              style={{
                                minWidth: column.width
                                  ? `${column.width}px`
                                  : 'unset',
                                maxWidth: column.width
                                  ? `${column.width}px`
                                  : 'unset',
                              }}
                              className={`flex-1 h-full px-2 text-sm py-3 ${column.class}`}
                            >
                              {/* get display */}
                              {getDataCell(item, column)}
                            </div>
                          )
                        })}
                    </div>
                  )
                }) : <p className="text-center py-4 italic text-gray-500">{emptyText}</p>}
            </div>
          </div>
        )}
        {pagination ? 
          <AppPagination
            type={paginationType}
            pagination={pagination}
            onPaginate={onPaginate}
            hideTotal={hideTotal}
            wrapperClass={`${paginationClass} flex justify-center md:px-0 md:pb-0 md:mb-0`}
            buttonClass={pageClass}
            activeClass={activePageClass} />
        : ''}
      </div>
      
    </>
  )
}

export default Table
