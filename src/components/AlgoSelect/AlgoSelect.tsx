import './AlgoSelect.scss';
import { useSelect, UseSelectStateChange } from 'downshift';
import cx from 'classnames';
import { SigningAlgorithm, algorithms } from '../../lib/algorithms';
import Chevron from '../../assets/arrow-down-sign.svg';
import Checkmark from '../../assets/checkmark.svg';

export interface AlgoSelectProps {
    onChange?: (changes: UseSelectStateChange<SigningAlgorithm>) => void;
    selectedItem?: SigningAlgorithm | null;
}

export function AlgoSelect({ 
    onChange,
    selectedItem
}: AlgoSelectProps) {
  
    function itemToString(item: SigningAlgorithm | null) {
      return item ? item.name : ''
    }
  
    function Select() {
      const {
        isOpen,
        // selectedItem,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
      } = useSelect({
        items: algorithms,
        itemToString,
        onSelectedItemChange: onChange,
        selectedItem,
      })
  
      return (
        <div className="select__dropdown__container">
          <div className="select__dropdown">
            <div
              className={cx("select__dropdown__control", isOpen && 'open')}
              {...getToggleButtonProps()}
            >
              <span>{selectedItem ? selectedItem.name : 'Algorithm'}</span>
              <img alt='chevron' src={Chevron} />
            </div>
          </div>
          <ul
            className={`select__dropdown__list absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
              !isOpen && 'hidden'
            }`}
            {...getMenuProps()}
          >
            {isOpen &&
              algorithms.map((item, index) => {
                const isSelected = selectedItem?.name === item.name
                return (
                  <li
                    className={cx(
                      // highlightedIndex === index && 'selected',
                      isSelected && 'selected',
                      'py-2 px-3 shadow-sm flex flex-col',
                    )}
                    key={item.name}
                    {...getItemProps({item, index})}
                  >
                    <span>{item.name}</span>
                    {isSelected && <img alt='checkmark' src={Checkmark} />}
                  </li>
                )
              })}
          </ul>
        </div>
      )
    }
  
    return <Select />
  }