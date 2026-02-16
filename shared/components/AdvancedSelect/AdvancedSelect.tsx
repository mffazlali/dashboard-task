'use client';

import { Fragment, useState, useMemo } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { AdvancedSelectProps, SelectOption } from './types';

export const AdvancedSelect = ({
  options,
  value,
  onChange,
  multiple = false,
  searchable = true,
  placeholder = 'انتخاب کنید...',
  disabled = false,
  virtualized = false,
  showSelectAll = false,
  className,
}: AdvancedSelectProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Group options by group property
  const groupedOptions = useMemo(() => {
    const groups: { [key: string]: SelectOption[] } = {};
    const ungrouped: SelectOption[] = [];

    options.forEach((option) => {
      if (option.group) {
        if (!groups[option.group]) {
          groups[option.group] = [];
        }
        groups[option.group].push(option);
      } else {
        ungrouped.push(option);
      }
    });

    return { groups, ungrouped };
  }, [options]);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    
    const query = searchQuery.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);

  // Get display text for selected values
  const displayText = useMemo(() => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return placeholder;
    }

    if (Array.isArray(value)) {
      if (value.length === options.length && showSelectAll) {
        return 'همه انتخاب شده';
      }
      return `${value.length} مورد انتخاب شده`;
    }

    const selected = options.find((opt) => opt.value === value);
    return selected?.label || placeholder;
  }, [value, options, placeholder, showSelectAll]);

  // Handle select all
  const handleSelectAll = () => {
    if (!multiple) return;
    
    const allValues = options.map((opt) => opt.value);
    const currentValues = Array.isArray(value) ? value : [];
    
    if (currentValues.length === allValues.length) {
      (onChange as (value: (string | number)[]) => void)([]);
    } else {
      (onChange as (value: (string | number)[]) => void)(allValues);
    }
  };

  // Render option item
  const renderOption = (option: SelectOption, selected: boolean) => (
    <div
      className={clsx(
        'cursor-pointer select-none relative py-2 pl-10 pr-4',
        selected ? 'bg-blue-100 text-blue-900' : 'text-gray-900',
        option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
      )}
    >
      <span className={clsx('block truncate', selected ? 'font-medium' : 'font-normal')}>
        {option.label}
      </span>
      {selected && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
          ✓
        </span>
      )}
    </div>
  );

  return (
    <Listbox 
      // @ts-expect-error - Headless UI types don't support discriminated unions properly
      value={value} 
      // @ts-expect-error - Headless UI types don't support discriminated unions properly
      onChange={onChange} 
      multiple={multiple} 
      disabled={disabled}
    >
      <div className={clsx('relative', className)}>
        <ListboxButton
          className={clsx(
            'relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-right shadow-md',
            'focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2',
            'focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2',
            'focus-visible:ring-offset-blue-300 sm:text-sm',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span className="block truncate">{displayText}</span>
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </ListboxButton>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {/* Search Input */}
            {searchable && (
              <div className="sticky top-0 z-10 bg-white p-2 border-b">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="جستجو..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Select All Button */}
            {multiple && showSelectAll && (
              <div className="sticky top-0 z-10 bg-gray-50 p-2 border-b">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="w-full text-right px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  {Array.isArray(value) && value.length === options.length
                    ? 'حذف انتخاب همه'
                    : 'انتخاب همه'}
                </button>
              </div>
            )}

            {/* Options List */}
            {virtualized && filteredOptions.length > 50 ? (
              <div className="max-h-60 overflow-auto">
                {filteredOptions.map((option) => {
                  const isSelected = Array.isArray(value)
                    ? value.includes(option.value)
                    : value === option.value;

                  return (
                    <ListboxOption
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {() => renderOption(option, isSelected)}
                    </ListboxOption>
                  );
                })}
              </div>
            ) : (
              <>
                {/* Grouped Options */}
                {Object.keys(groupedOptions.groups).length > 0 &&
                  Object.entries(groupedOptions.groups).map(([groupName, groupOptions]) => (
                    <div key={groupName}>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                        {groupName}
                      </div>
                      {groupOptions
                        .filter((opt) =>
                          !searchQuery ||
                          opt.label.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((option) => {
                          const isSelected = Array.isArray(value)
                            ? value.includes(option.value)
                            : value === option.value;

                          return (
                            <ListboxOption
                              key={option.value}
                              value={option.value}
                              disabled={option.disabled}
                            >
                              {() => renderOption(option, isSelected)}
                            </ListboxOption>
                          );
                        })}
                    </div>
                  ))}

                {/* Ungrouped Options */}
                {groupedOptions.ungrouped
                  .filter((opt) =>
                    !searchQuery ||
                    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((option) => {
                    const isSelected = Array.isArray(value)
                      ? value.includes(option.value)
                      : value === option.value;

                    return (
                      <ListboxOption
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {() => renderOption(option, isSelected)}
                      </ListboxOption>
                    );
                  })}

                {/* No Results */}
                {filteredOptions.length === 0 && (
                  <div className="px-4 py-2 text-sm text-gray-500 text-center">
                    نتیجه‌ای یافت نشد
                  </div>
                )}
              </>
            )}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
};
